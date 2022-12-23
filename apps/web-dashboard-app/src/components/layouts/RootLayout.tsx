import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation/Navigation";
import Main from "./Main/Main";
import Menu from "./Navigation/Menu";

const Style = styled.main`
  grid-area: main-content;
`

const Layout = () => {
    return (
        <Style>
            <Navigation/>
            <Menu/>
            <Main/>
        </Style>
    )
};

export default Layout