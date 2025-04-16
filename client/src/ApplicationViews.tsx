import { Outlet, Route, Routes } from "react-router-dom"
import { ChooseCharacter } from "./components/chooseCharacter"
import React from "react";
import { Home } from "./components/home";
import { Navbar } from "./components/nav/navbar";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
            path="/"
            element={
                <>
                <Navbar />
                <Outlet />
                </>
            } >
            <Route index element={<ChooseCharacter />} />
            <Route path="home" element={<Home />} />
            </Route>
            
        </Routes>
    )
}