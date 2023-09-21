import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { AppStylus, AppLayout, Content } from "./IndexStyle";
import { NavBar } from "../NavBar/Index";

export const App = () => {
    const [theme, setTheme] = useState('dark');
    const contentRef = useRef(null);//size screen adjusting
    
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const contentElement = contentRef.current;

        const adjustContentHeight = () => {
            if (contentElement) {
                const contentHeight = contentElement.scrollHeight;
                const windowHeight = window.innerHeight;
                contentElement.style.minHeight = contentHeight > windowHeight ? `${contentHeight}px` : "auto";
            }
        };

        window.addEventListener("resize", adjustContentHeight);
        adjustContentHeight(); // Initial adjustment

        return () => {
            window.removeEventListener("resize", adjustContentHeight);
        };
    }, []);

    return (
        <>
            <AppStylus>
                <AppLayout className={`App ${theme}`}>
                    <NavBar modeScreen={toggleTheme} received={theme} />
                    <Content ref={contentRef}>
                        <Outlet />
                    </Content>
                </AppLayout>
            </AppStylus>
        </>
    );
};
