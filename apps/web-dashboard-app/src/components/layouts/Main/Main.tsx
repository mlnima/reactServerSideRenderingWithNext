import React, {FC} from "react";
import styled from "styled-components";
import RootRouter from "../../routers/RootRouter";

const Style = styled.div`
  grid-area: main;
  height: 100%;
  min-width: 100vw;
  min-height: 70vh;
`

interface MainPropTypes {

}

const Main: FC<MainPropTypes> = (props) => {
    return (
        <Style>
           <RootRouter/>
        </Style>
    )
};

export default Main