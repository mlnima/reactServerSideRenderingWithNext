"use client";
import React, {FC, ReactNode, useEffect} from "react";
import {useAppSelector} from "@store/hooks";

interface IProps {
    children:ReactNode
}

const ThemeProvider: FC<IProps> = ({ children }) => {
    const theme = useAppSelector(({globalState})=>globalState?.theme||'dark')

    useEffect(() => {
        if (theme){
            if (!document.body.classList.contains(theme)){
                document.body.classList.add(theme)
            }
            if (document.body.classList.contains('dark') && theme === 'light'){
                document.body.classList.replace('dark', 'light')
            }else if (document.body.classList.contains('light') && theme === 'dark'){
                document.body.classList.replace('light', 'dark')
            }
        }
    }, [theme]);

    return (
        <div>
            { children }
        </div>
    )
};
export default ThemeProvider
