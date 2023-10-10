'use client';
import React, {FC} from "react";

interface IProps {
    children: React.ReactNode
}

const UseClientProvider: FC<IProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
};
export default UseClientProvider
