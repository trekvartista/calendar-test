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
    const [stateAuth, setStateAuth] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("auth")) {
            console.log('helllooo', localStorage.getItem("username" || ""))
            setUser({ username: localStorage.getItem("username" || "")} as IUser);
            setIsAuth(true);
        }
    }, [])

    useEffect(() => {
        setStateAuth(true)
    }, [isAuth])

    return (
        <div>
            <Navbar />
            <div>
                {stateAuth ? (
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
