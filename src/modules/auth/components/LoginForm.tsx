"use client";

import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card } from "@/shared/ui/card";
import { loginAction } from "../actions";

export default function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function login() {

        setLoading(true);

        try {

            await loginAction(
                username,
                password
            );

        } catch {

            alert("نام کاربری یا رمز عبور اشتباه است");

            setLoading(false);

        }

    }

    return (

        <Card className="w-[420px] p-8 space-y-6">

            <h1 className="text-center text-3xl font-bold">
                ورود به سامانه
            </h1>

            <Input
                placeholder="نام کاربری"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <Input
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <Button
                className="w-full"
                disabled={loading}
                onClick={login}
            >
                {loading ? "در حال ورود..." : "ورود"}
            </Button>

        </Card>

    );
}