import { MutableRefObject } from 'react';
import debounce from 'lodash/debounce';
import {
  TJarvisAction,
  startWebSpeech,
  stopWebSpeech,
  setResponse,
  setSuggestions,
  activeJarvis,
  setError,
  setSuccess,
  setListening,
  jarvisNotifications,
} from '@/contexts/jarvis/actions';
import {
  TActionRouterAction,
  pushRoute,
  backRoute,
} from '@/contexts/actionRouter/actions';
import { TJarvisSuggestion } from '@/contexts/jarvis';
import { ActionType, TemplateType, DataType } from '@/constants/actionRouter';
import { grammars } from '@/constants/jarvis';
import {
  matchHeyJarvis,
  matchStop,
  matchAction,
  matchData,
  matchTimes,
  matchStatus,
  matchTemplate,
  matchYes,
  matchNo,
  matchFocus1,
  matchFocus2,
  matchFocus3,
} from '@/utils/regexp';

import {
  getActionType,
  getFocus,
  getTemplateType,
  getDataTypes,
} from '@/utils/jarvis';
import { Time, Focus, TActionRoute } from '@/contexts/actionRouter';
import systemStatus, { NotifyEventType } from '@/constants/system';

export enum JarvisStatus {
  Idle = 'IDLE', // hide
  Active = 'ACTIVE', // show dialog (from screen right)
  Listening = 'LISTENING', // start listening (start wave animation)
  Recognizing = 'RECOGNIZING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export type TJarvisResponse = {
  confidence: number;
  message: string;
  isFinal: boolean;
};

type TJarvisServiceProps = {
  status: MutableRefObject<JarvisStatus>;
  dispatch: React.Dispatch<TJarvisAction>;
  actionRouterDispatch: React.Dispatch<TActionRouterAction>;
};

// TODO:
// [refactor]: handle if recognition is undefined
// [grammar]: add match grammar

export default class JarvisService {
  public props: TJarvisServiceProps;
  private recognition: SpeechRecognition;
  private recognizing: boolean = false;

  constructor(props: TJarvisServiceProps) {
    this.props = props;

    // @ts-ignore
    const Recognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new Recognition() as SpeechRecognition;
    this.initialize();

    // DEFAULT: enable jarvis service
    // this.enable();
  }

  initialize() {
    if (this.recognition) {
      const speechGrammarList = this.generateGrammarList();

      this.recognition.grammars = speechGrammarList;
      this.recognition.lang = 'en-US';
      this.recognition.continuous = true; // continuous results are returned for each recognition
      this.recognition.interimResults = true;

      this.recognition.onresult = this.onresult;
      this.recognition.onstart = this.onstart;
      this.recognition.onend = this.onend;
      this.recognition.onerror = this.onerror;
    }
  }

  generateGrammarList() {
    const SpeechGrammarList =
      // @ts-ignore
      window.SpeechGrammarList || webkitSpeechGrammarList;
    const speechGrammarList = new SpeechGrammarList();
    Object.values(grammars).forEach(grammar =>
      speechGrammarList.addFromString(grammar, 10),
    );
    return speechGrammarList;
  }

  // tslint:disable
  onresult = debounce(event => {
    if (!this.recognizing) {
      this.recognizing = true;
      const { dispatch, status, actionRouterDispatch } = this.props;
      const target = event.results[event.resultIndex];
      const response = {
        message: target[0].transcript,
        confidence: target[0].confidence,
        isFinal: target.isFinal,
      };

      // run before anything when matches "stop grammar",
      // set jarvis status to "Idle"
      if (matchStop(target[0].transcript)) {
        dispatch(setResponse(response, JarvisStatus.Idle));
        this.recognizing = false;
        return;
      }

      switch (status.current) {
        case JarvisStatus.Idle: {
          if (matchHeyJarvis(target[0].transcript)) {
            dispatch(activeJarvis());
          }
          break;
        }

        case JarvisStatus.Listening: {
          if (target.isFinal) {
            if (systemStatus.type !== '') {
              switch (systemStatus.type) {
                case NotifyEventType.TrafficJamDetail:
                case NotifyEventType.TrafficSuggestion:
                case NotifyEventType.TrafficJam: {
                  if (matchYes(target[0].transcript)) {
                    systemStatus.notifications[0].action();
                  } else if (matchNo(target[0].transcript)) {
                    if (systemStatus.notifications[0].cancel) {
                      systemStatus.notifications[0].cancel();
                    } else {
                      dispatch(jarvisNotifications([]));
                    }
                  } else {
                    dispatch(setError());
                  }
                  break;
                }

                case NotifyEventType.FocusTrafficJam: {
                  if (matchFocus1(target[0].transcript)) {
                    systemStatus.notifications[0].action();
                  } else if (matchFocus2(target[0].transcript)) {
                    systemStatus.notifications[1].action();
                  } else if (matchFocus3(target[0].transcript)) {
                    systemStatus.notifications[2].action();
                  }
                  break;
                }
              }
            } else {
              dispatch(
                setResponse(
                  response,
                  JarvisStatus.Recognizing,
                  'Recognizing...',
                ),
              );

              // back route
              if (target[0].transcript.trim() === 'back') {
                actionRouterDispatch(backRoute());
                dispatch(setListening());
                break;
              }

              const encoded = this.encoded(target[0]);
              if (!encoded.actionType) {
                const isStatistics =
                  encoded.templateType === TemplateType.Statistics;
                if (encoded.templateType) {
                  actionRouterDispatch(pushRoute(encoded as TActionRoute));
                  dispatch(setSuccess());
                } else if (isStatistics && !encoded.dataTypes.length) {
                  dispatch(setError());
                }
              } else if (encoded.suggestions.length) {
                dispatch(setSuggestions(encoded.suggestions));
              } else {
                actionRouterDispatch(pushRoute(encoded as TActionRoute));
                dispatch(setSuccess());
              }
            }
          } else {
            dispatch(setResponse(response));
          }
          break;
        }
      }

      this.recognizing = false;
    }
  }, 100);

  onstart = () => this.props.dispatch(startWebSpeech());

  onend = () => this.props.dispatch(stopWebSpeech());

  onerror = (event: any) => {
    console.error('error', event);
  };

  enable() {
    this.recognition.start();
  }

  disable() {
    this.recognition.stop();
  }

  encoded(src: {
    transcript: string;
    confidence: number;
  }): {
    actionType: ActionType | '';
    templateType: TemplateType | '';
    dataTypes: DataType[];
    times: Time[];
    focus: Focus[];
    suggestions: TJarvisSuggestion[];
    extraProps: { [key: string]: any };
  } {
    const { action, template, data, times, status } = this.parseTranscript(
      src.transcript,
    );
    const actionType = getActionType(action);
    const templateType = getTemplateType(template);
    const dataTypes = getDataTypes(data);
    const focus = getFocus(status);

    const suggestions: TJarvisSuggestion[] = [];
    const extraProps = {};

    return {
      actionType,
      templateType,
      dataTypes,
      times,
      focus,
      suggestions,
      extraProps,
    };
  }

  // parse A + D + T + S
  // show me traffic status this year
  parseTranscript(transcript: string) {
    const action = matchAction(transcript);
    const template = matchTemplate(transcript);
    const data = matchData(transcript);
    const times = matchTimes(transcript);
    const status = matchStatus(transcript);
    return {
      action,
      template,
      data,
      times,
      status,
    };
  }
}
