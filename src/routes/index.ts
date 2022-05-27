import React from "react";
import Calendar from "../pages/Calendar";
import Login from "../pages/Login";

export interface IRoute {
    path: string;
    Component: React.ComponentType;
}

export enum RouteNames {
    LOGIN = '/login',
    CALENDAR = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, Component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.CALENDAR, Component: Calendar}
]