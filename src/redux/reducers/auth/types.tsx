

export interface AuthState {
    isAuth: boolean;
}

export enum AuthActionEnum {
    SET_AUTH = "SET_AUTH"
}

interface setAuthAction {
    type: AuthActionEnum.SET_AUTH;
    payload: boolean
}

export type AuthAction = setAuthAction // | others...
