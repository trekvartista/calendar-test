import { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { privateRoutes, publicRoutes, RouteNames } from "./routes";
import './App.css'
import { useAppSelector } from "./hooks";
import { useDispatch } from "react-redux";
import { setIsAuth, setUser } from "./redux/reducers/auth/authSlice";
import { IUser } from "./models/IUser";


const App: FC = () => {

    const {isAuth} = useAppSelector(state => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {

        if (localStorage.getItem("auth")) {

            dispatch(setUser({ username: localStorage.getItem("username" || "")} as IUser));
            dispatch(setIsAuth(true));
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div>
                {isAuth ? (
                    <Routes>
                        {privateRoutes.map(({ path, Component }) => (
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                            />
                        ))}
                        <Route
                            path="/:otherPath"
                            element={<Navigate to={RouteNames.CALENDAR} />}
                        />
                    </Routes>
                ) : (
                    <Routes>
                        <Route
                            path="*"
                            element={<Navigate to={RouteNames.LOGIN} replace />}
                        />
                        {publicRoutes.map(({ path, Component }) => (
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                            />
                        ))}
                    </Routes>
                )}
            </div>
        </div>
    );
};

export default App;
