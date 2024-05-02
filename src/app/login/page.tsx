"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import logo from "@/assets/images/logo.png"
import { Button, Input, ConfigProvider, Form, FormProps, notification } from "antd"
import Link from 'next/link';
import { TLogin } from '@/types/Login';
import { LOGIN_EMAIL, LOGIN_PASSWORD } from '@/constants/loginCred';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormProps<TLogin>["onFinish"] = async (values) => {
        setLoading(true);

        if (LOGIN_EMAIL !== values.email || LOGIN_PASSWORD !== values.password) {
            notification.error({
                message: "Invalid credentials",
                description: "Please provide valid login credentials to log in.",
            });
            return setLoading(false);
        }

        notification.success({
            message: "Logged In Successfully",
            description: "You are being redirected to home page",
        });

        localStorage.setItem("email", values.email)

        router.push("/projects");
        setLoading(false);
    };

    return (
        <main className="container max-w-screen-2xl h-screen flex flex-col items-center justify-center">
            <Link href={"/"}>
                <Image src={logo} alt="WorkSpace-Logo" loading="lazy" width={70} />
            </Link>
            <h2 className='text-xl font-medium my-8'>Log in to WorkSpace</h2>

            <ConfigProvider theme={{
                components: {
                    Button: {
                        contentFontSizeLG: 14
                    }
                }
            }}>
                <Form
                    size='large'
                    layout="vertical"
                    requiredMark={false}
                    onFinish={handleSubmit}
                    initialValues={{ email: "", password: "" }}
                    style={{ width: 400, display: "flex", flexDirection: "column", gap: "12px", font: "14px" }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please enter an email address for login" }, { type: 'email' }]}
                    >
                        <Input type="email" size="large" placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please enter your password for login" }, { min: 4 }]}
                    >
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>

                    <Button block size="large" type="primary" htmlType="submit" loading={loading}>
                        Login
                    </Button>
                </Form>
            </ConfigProvider>
        </main>
    );
};