import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation/Navigation";
import Main from "./Main/Main";
import Menu from "./Navigation/Menu";

const Style = styled.div`
  grid-area: main-content;
`

const RootLayout = () => {
    return (
        <Style>
            <Navigation/>
            <Main/>
        </Style>
    )
};

export default RootLayout