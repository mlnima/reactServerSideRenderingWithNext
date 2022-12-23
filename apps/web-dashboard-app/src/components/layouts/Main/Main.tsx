import React, {FC} from "react";
import styled from "styled-components";
import MainRouter from "./MainRouter";

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
           {/*<MainRouter/>*/}
        </Style>
    )
};
export default Main