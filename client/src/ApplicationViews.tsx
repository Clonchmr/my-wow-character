import { Outlet, Route, Routes } from "react-router-dom"
import { ChooseCharacter } from "./components/chooseCharacter"
import React from "react";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
            path="/"
            element={
                <Outlet />
            } >
                <Route index element={<ChooseCharacter />} />
            </Route>
        </Routes>
    )
}