import Actions from './actions';
import { TJarvisReducer } from './index';
import { JarvisStatus } from '@/services/JarvisService';

const reducer: TJarvisReducer = (state, action) => {
  // CAUTION:
  // status are ref object, we update by set `status.current`

  switch (action.type) {
    case Actions.InitJarvisService: {
      return { ...state, ...action.payload };
    }
    case Actions.StartWebSpeech:
    case Actions.StopWebSpeech: {
      state.status.current = action.payload.status;
      return { ...state, enabled: action.payload.enabled };
    }
    case Actions.SetResponse: {
      let title = state.title;
      if (action.payload.status) {
        state.status.current = action.payload.status;
      }
      if (action.payload.title) {
        title = action.payload.title;
      }
      return { ...state, response: action.payload.response, title };
    }
    case Actions.SetStatus: {
      let title = state.title;
      state.status.current = action.payload.status!;
      if (action.payload.title) {
        title = action.payload.title;
      }
      return { ...state, title };
    }
    case Actions.SetSuggestion: {
      if (action.payload.status) {
        state.status.current = action.payload.status!;
      }
      return {
        ...state,
        suggestions: action.payload.suggestions,
        response: {
          message: 'Um... are you mean? 😉',
          confidence: 1,
          isFinal: true,
        },
      };
    }
    case Actions.ResetIdle: {
      state.status.current = JarvisStatus.Idle;
      return {
        ...state,
        title: action.payload.title ? action.payload.title : '',
        suggestions: [],
        response: {
          message: '',
          confidence: 1,
          isFinal: true,
        },
      };
    }

    case Actions.ActiveJarvis: {
      state.status.current = JarvisStatus.Active;
      return {
        ...state,
        title: 'What can I help you ?',
        suggestions: [],
        response: {
          message: '',
          confidence: 1,
          isFinal: true,
        },
      };
    }

    case Actions.JarvisNotifications: {
      if (state.status.current === JarvisStatus.Idle) {
        state.status.current = JarvisStatus.Active;
      }

      return {
        ...state,
        title: `New notification (${action.payload.suggestions.length})`,
        suggestions: action.payload.suggestions,
        response: action.payload.response
          ? action.payload.response
          : state.response,
      };
    }

    default:
      throw new Error();
  }
};

export default reducer;
