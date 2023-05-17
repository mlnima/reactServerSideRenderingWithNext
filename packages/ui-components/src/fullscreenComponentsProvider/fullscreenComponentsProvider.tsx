import React, {FC} from "react";
import Style from "./fullScreenComponentsProvider.styles"

interface PropTypes {
    children: React.ReactNode;
}

const fullScreenComponentsProvider: FC<PropTypes> = ({children}) => {
    return (
        <Style>
            {children}
        </Style>
    )
};
export default fullScreenComponentsProvider;