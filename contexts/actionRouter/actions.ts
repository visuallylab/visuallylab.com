import { TActionRoute } from './index';

enum Actions {
  PushRoute = 'PUSH_ROUTE',
  BackRoute = 'BACK_ROUTE',
}

export type TActionRouterAction =
  | IAction<Actions.PushRoute, { route: TActionRoute }>
  | IAction<Actions.BackRoute>;

export const pushRoute = (route: TActionRoute): TActionRouterAction => ({
  type: Actions.PushRoute,
  payload: {
    route,
  },
});

export const backRoute = (): TActionRouterAction => ({
  type: Actions.BackRoute,
  payload: {},
});

export default Actions;
