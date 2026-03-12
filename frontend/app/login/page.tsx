"use client";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
        console.log("Kiritildi:", email, password);
        console.log("Env dan keldi:", adminEmail, adminPassword);

        if (!adminEmail || !adminPassword) {
            setError("Tizim xatosi: Muhit o'zgaruvchilari topilmadi!");
            return;
        }

        if (email === adminEmail && password === adminPassword) {
            const fakeToken = "authenticated_admin_session";
            Cookies.set("token", fakeToken, { expires: 1 });
            localStorage.setItem("token", fakeToken);

            router.push("/admin");
            router.refresh();
        } else {
            setError("Login yoki parol xato! Faqat admin kira oladi.");
        }
    };

    return (
        <LoginWrapper>
            <form className="login-card" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Parol"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Kirish</button>
            </form>
        </LoginWrapper>
    );
}

const LoginWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0f0f0f;

    .login-card {
        background: #1a1a1a;
        padding: 40px;
        border-radius: 15px;
        width: 350px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        text-align: center;
        border: 1px solid #333;
    }

    h2 {
        color: #fff;
        margin-bottom: 30px;
        letter-spacing: 2px;
    }

    .input-group {
        margin-bottom: 20px;
        input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #333;
            background: #0f0f0f;
            color: #fff;
            outline: none;
            &:focus {
                border-color: #ff0058;
            }
        }
    }

    button {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        border: none;
        background: linear-gradient(315deg, #03a9f4, #ff0058);
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
    }

    .error {
        color: #ff0058;
        font-size: 0.9em;
        margin-bottom: 15px;
    }
`;
