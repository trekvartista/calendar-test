import { Layout, Menu, Row } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { RouteNames } from "../routes";

const Navbar: FC = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    const navigate = useNavigate();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ? (
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        style={{ minWidth: "75px" }}
                    >
                        <Menu.Item
                            key={1}
                            onClick={() => navigate(RouteNames.LOGIN)}
                        >
                            Sign out
                        </Menu.Item>
                    </Menu>
                ) : (
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        style={{ minWidth: "75px" }}
                    >
                        <Menu.Item
                            key={1}
                            onClick={() => navigate(RouteNames.CALENDAR)}
                        >
                            Login
                        </Menu.Item>
                    </Menu>
                )}
            </Row>
        </Layout.Header>
    );
};

export default Navbar;
