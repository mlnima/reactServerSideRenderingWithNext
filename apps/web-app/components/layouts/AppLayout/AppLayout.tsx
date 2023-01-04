import React, {FC} from 'react';
import AppLayoutInitializer from "./AppLayoutInitializer";

interface AppLayoutPropTypes {
    children: React.ReactNode,
    rest: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children}) => {
    return (
        <AppLayoutInitializer children={children}/>
    );
};

export default AppLayout;

