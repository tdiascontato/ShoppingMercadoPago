import { useState,/* useEffect, useRef*/ } from "react";
import { Outlet } from "react-router-dom";
import { AppStylus, AppLayout, Content } from "./IndexStyle";
import { NavBar } from "../NavBar/Index";

export const App = () => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    return (
        <>
            <AppStylus>
                <AppLayout className={`App ${theme}`}>
                    <NavBar modeScreen={toggleTheme} received={theme} />
                    <Content>
                        <Outlet />
                    </Content>
                </AppLayout>
            </AppStylus>
        </>
    );
};
