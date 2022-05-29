import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { AuthAction, AuthActionEnum, AuthState } from "./types";

const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state = initialState, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setIsAuth(state = initialState, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setIsLoading(state = initialState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state = initialState, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const loginTC =
    (username: string, password: string) => async (dispatch: any) => {
        try {
            dispatch(setIsLoading(true));

            setTimeout(async () => {
                const response = await axios.get<IUser[]>("./users.json");
                const mockUser = response.data.find(
                    (user) =>
                        user.username === username && user.password === password
                );

                if (mockUser) {
                    localStorage.setItem("auth", "true");
                    localStorage.setItem("username", username);
                    dispatch(setUser(mockUser));
                    dispatch(setIsAuth(true));
                } else {
                    dispatch(setError("Incorrect username or password."));
                }
            }, 1000);

            dispatch(setIsLoading(false));
        } catch (e) {
            dispatch(setError("Some error has occured..."));
        }
    };

export const logoutTC = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");

    dispatch(setUser({} as IUser));
    dispatch(setIsAuth(false));
};

export const { setIsLoading, setError, setIsAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
