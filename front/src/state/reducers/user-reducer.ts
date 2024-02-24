import { Config } from "../../config";

export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
};

const initialState: UserType = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
};

type SetUserActionType = {
    type: typeof Config.SET_USER,
    user: UserType,
}

type UserActionType = SetUserActionType;

export const userReducer = (state: UserType = initialState, action: UserActionType) => {
  switch (action.type) {
    case Config.SET_USER: {
      return action.user;
    }
    default:
        return state;
  }
};

export const setUserAC = (user: UserType) => {
    console.log("user", user);
    return {
        type: Config.SET_USER,
        user
    }
}