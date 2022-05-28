import { Button, Form, Input, Layout, Row } from "antd";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks";
import { authSlice, loginTC } from "../redux/reducers/auth/authSlice";
import { rules } from "../utils/rules";

const Login: FC = () => {

    const dispatch = useDispatch()
    const { isLoading, error } = useAppSelector(state => state.authReducer)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        dispatch(loginTC(username, password) as any)
        // console.log(isLoading)
    }

    const submitFailed = () => {

    }

    return (
        <Layout>
            <Row justify="center" align="middle" className="py-48 bg-slate-400 h-[calc(100vh_-_64px)]">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={() => submit()}
                    onFinishFailed={() => submitFailed()}
                    autoComplete="off"
                    className="border-2 px-4 pt-10"
                >
                    {
                        error &&
                        <span className="text-red-700"> {error} </span>
                    }
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            rules.required("Please input your username!")
                        ]}
                    >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            rules.required("Please input your password!")
                        ]}
                    >
                        <Input.Password  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </Layout>
    );
};

export default Login;
