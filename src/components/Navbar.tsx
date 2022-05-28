import { Layout, Menu, Row } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { logoutTC } from "../redux/reducers/auth/authSlice";
import { RouteNames } from "../routes";

const Navbar: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(logoutTC() as any);
    };

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ? (
                    <>
                        <div className="mr-4 font-semibold text-white">{user.username}</div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectable={false}
                            style={{ minWidth: "75px" }}
                        >
                            <Menu.Item key={1} onClick={() => handleSignout()}>
                                Sign out
                            </Menu.Item>
                        </Menu>
                    </>
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
