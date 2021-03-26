// import { userState } from './module/user';
// import { preState } from './module/preferential';
// import { placeInfoState } from './module/placeInfo';
import { layoutState } from './reducers/dragDataReducer';

// export type RootState = ReturnType<typeof rootReducer>

export interface RootState {
  // app: AppState;
  // userReducer: userState;
  // preferentialReducer: preState,
  // placeInfoReducer: placeInfoState
  layoutReducer: layoutState
}

export interface IAction<T> {
  type: string;
  payload: T;
}
