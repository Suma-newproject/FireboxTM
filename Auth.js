// src/components/Auth.js
import './styles.css';
import React, { useState } from "react";
import { auth } from "../firebase"; // Adjust the path to firebase.js location
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Login successful!");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Signup successful!");
            }
        } catch (error) {
            alert(error.message); // Improved error handling
        }
    };

    return (
        <div>
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleAuth}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create an account" : "Already have an account? Log In"}
            </button>
        </div>
    );
};

export default Auth;
