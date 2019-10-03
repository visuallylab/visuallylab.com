import React, {
  createContext,
  FC,
  useEffect,
  useRef,
  useReducer,
  MutableRefObject,
  useContext,
} from 'react';
import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

import { initJarvisService, TJarvisAction } from './actions';
import reducer from './reducer';
import { ActionRouterContext } from '@/contexts/actionRouter';

export enum SuggestionType {
  Info = 'info',
  Warning = 'warning',
  Alert = 'alert',
}

export type TJarvisSuggestion = {
  type: SuggestionType;
  title: string;
  message: string;
  button?: {
    onClick: () => void;
    onCancel?: () => void;
    text: string;
  };
};

type TJarvisBaseState = {
  jarvis?: JarvisService;
  enabled: boolean;
  title: string;
  response: TJarvisResponse;
  suggestions: TJarvisSuggestion[];
};

export type TJarvisState = TJarvisBaseState & {
  status: MutableRefObject<JarvisStatus>;
};

export type TJarvisPayload = TJarvisBaseState & {
  status: JarvisStatus;
};

export type TJarvisContext = TJarvisPayload & {
  dispatch: React.Dispatch<TJarvisAction>;
};

export type TJarvisReducer = (
  state: TJarvisState,
  action: TJarvisAction,
) => TJarvisState;

const defaultJarvisRes: TJarvisResponse = {
  confidence: 0,
  message: '',
  isFinal: true,
};

type TInitArgs = { status: MutableRefObject<JarvisStatus> };

function init(args: TInitArgs) {
  return {
    jarvis: undefined,
    enabled: false,
    title: '',
    status: args.status,
    response: defaultJarvisRes,
    suggestions: [],
  };
}

export const JarvisContext = createContext<TJarvisContext>({
  jarvis: undefined,
  status: JarvisStatus.Idle,
  enabled: false,
  title: '',
  response: defaultJarvisRes,
  suggestions: [],
  dispatch: () => ({}),
});

export const JarvisProvider: FC = props => {
  const status = useRef<JarvisStatus>(JarvisStatus.Idle);
  const [state, dispatch] = useReducer<TJarvisReducer, TInitArgs>(
    reducer,
    { status },
    init,
  );
  const { dispatch: actionRouterDispatch } = useContext(ActionRouterContext);

  useEffect(() => {
    dispatch(
      initJarvisService(
        new JarvisService({
          status,
          dispatch,
          actionRouterDispatch,
        }),
      ),
    );
  }, []);

  return (
    <JarvisContext.Provider
      value={{
        jarvis: state.jarvis,
        status: status.current,
        enabled: state.enabled,
        title: state.title,
        response: state.response,
        suggestions: state.suggestions,
        dispatch,
      }}
    >
      {props.children}
    </JarvisContext.Provider>
  );
};
