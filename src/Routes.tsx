import React from "react";
import { Routes, Route } from "react-router-dom";
 
import { Login } from "./pages/login/login"
import { Register } from "./pages/register/register"
import { Friends } from "./pages/friends/friends"
import { Profile } from "./pages/profile/profile";
import { TokenState } from "./store/store";
 
export const Routing = () => {
    return (
            <Routes>
                <Route
                    path='/register'
                    element={<Register />}
                />
                <Route
                    path='/login'
                    element={<Login />}
                />
                <Route
                    path='/friends'
                    element={<Friends />}
                />
                <Route
                    path='/profile'
                    element={<Profile />}
                />
                <Route
                    path='/user/:id'
                    element={<Profile isMe={false}/>}
                />
            </Routes>
    )
}
