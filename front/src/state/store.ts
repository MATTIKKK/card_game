import { userReducer } from "./reducers/user-reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);

export type RootStateType = ReturnType<typeof rootReducer>;