import Actions from './actions';
import { TActionRouterReducer } from './index';

const reducer: TActionRouterReducer = (state, action) => {
  switch (action.type) {
    case Actions.PushRoute: {
      state.history.push(action.payload.route);
      return { ...state, currentIndex: state.history.length - 1 };
    }
    case Actions.BackRoute: {
      state.history.pop();
      return { ...state, currentIndex: state.history.length - 1 };
    }
    default:
      throw new Error();
  }
};

export default reducer;
