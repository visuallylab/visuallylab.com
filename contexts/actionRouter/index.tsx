import React, { createContext, FC, useReducer } from 'react';

import reducer from './reducer';
import { TActionRouterAction, backRoute } from './actions';
import {
  ActionType,
  TemplateType,
  DataType,
  FocusStatus,
} from '@/constants/actionRouter';

export type Focus = {
  type: FocusStatus | DataType;
  conditions: Array<() => boolean>;
};

export type Time = [number, number];

export type TActionRoute = {
  actionType: ActionType;
  templateType: TemplateType;
  dataTypes: DataType[];
  times: Time[];
  focus: Focus[];
  extraProps: { [key: string]: any };
};

export type TActionRouterState = {
  history: TActionRoute[];
  currentIndex: number;
};

export type TActionRouterContext = TActionRouterState & {
  back: () => void;
  dispatch: React.Dispatch<TActionRouterAction>;
};

export type TActionRouterReducer = (
  state: TActionRouterState,
  action: TActionRouterAction,
) => TActionRouterState;

const initialState = {
  currentIndex: 0,
  history: [
    {
      actionType: ActionType.Show,
      templateType: TemplateType.Home,
      dataTypes: [],
      times: [],
      focus: [],
      extraProps: {},
    },
  ],
  back: () => ({}),
  dispatch: () => ({}),
};

export const ActionRouterContext = createContext<TActionRouterContext>(
  initialState,
);

export const ActionRouterProvider: FC = props => {
  const [state, dispatch] = useReducer<TActionRouterReducer>(
    reducer,
    initialState,
  );

  return (
    <ActionRouterContext.Provider
      value={{
        history: state.history,
        currentIndex: state.currentIndex,
        back: () => dispatch(backRoute()),
        dispatch,
      }}
    >
      {props.children}
    </ActionRouterContext.Provider>
  );
};
