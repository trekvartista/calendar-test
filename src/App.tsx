import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { privateRoutes, publicRoutes, RouteNames } from "./routes";
import './App.css'
import { useAppSelector } from "./hooks";

// import { useAppDispatch, useAppSelector } from "./hooks";
// import { userSlice } from "./redux/reducers/UserSlice";

const App: FC = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    // const {count} = useAppSelector(state => state.userReducer);
    // const {increment} = userSlice.actions;
    // const dispatch = useAppDispatch()

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
