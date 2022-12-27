import React from 'react';
import {createGlobalStyle} from "styled-components";
import {FC} from "react";
import buttons from 'ui/src/buttonsStyle';
import inputs from 'ui/src/inputsStyles';
import selects from 'ui/src/selectsStyle';
import defaultColors from 'ui/src/defaultColors';

const Styles = createGlobalStyle`
  
  ${buttons}
  ${defaultColors}
  ${inputs}
  ${selects}
  
  body {
    background-color: var(--main-background-color,#000);
    color: var(--main-text-color,#fff);
    margin: 0 !important;
    font-family: Arial,Helvetica,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 12px;
  }
  *{
    a {
      text-decoration: none;
      color: var(--main-text-color,#fff);
    }
    color: var(--main-text-color,#fff);
  }
`

interface PropTypes {

}

const GlobalStyles: FC<PropTypes> = () => {
    return (
        <Styles/>
    )
};

export default GlobalStyles



