import React, {FC} from "react";
import styled from "styled-components";
import MainRouter from "../../routers/MainRouter";

const Style = styled.main`
  grid-area: main;
  height: 100%;
  //min-width: 100vw;
  min-height: 70vh;
  padding: 8px;
  box-sizing: border-box;
`

interface MainPropTypes {

}

const Main: FC<MainPropTypes> = (props) => {
    return (
        <Style>
           <MainRouter/>
        </Style>
    )
};

export default Main