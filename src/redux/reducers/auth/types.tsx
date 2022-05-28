import { IUser } from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

export enum AuthActionEnum {
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = "SET_ERROR",
}

interface setAuthAction {
    type: AuthActionEnum.SET_AUTH;
    payload: boolean;
}

interface setUserAction {
    type: AuthActionEnum.SET_USER;
    payload: IUser;
}

interface setIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING;
    payload: boolean;
}

interface setErrorAction {
    type: AuthActionEnum.SET_ERROR;
    payload: string;
}

export type AuthAction =
    | setAuthAction
    | setErrorAction
    | setIsLoadingAction
    | setUserAction;
