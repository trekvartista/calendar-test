import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import userReducer from "./reducers/UserSlice"
import authReducer from "./reducers/auth/authSlice"

const rootReducer = combineReducers({
    userReducer,
    authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']