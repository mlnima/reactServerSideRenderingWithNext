import React, {FC} from "react";
import styled from "styled-components";

const Style = styled.main`
  grid-area: main-content;
`

interface MainComponentsWrapperPropTypes {

}

const MainComponentsWrapper: FC<MainComponentsWrapperPropTypes> = (props) => {
    return (
        <Style>
            Main
        </Style>
    )
};
export default MainComponentsWrapper