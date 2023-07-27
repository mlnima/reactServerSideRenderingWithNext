import React from 'react';
import {createGlobalStyle} from "styled-components";
import {FC} from "react";
import {buttonsStyle,inputsStyles,selectsStyle,defaultColors,scrollBars} from 'ui';

const Styles = createGlobalStyle`
  
  ${buttonsStyle}
  ${defaultColors}
  ${inputsStyles}
  ${selectsStyle}
  ${scrollBars}
  
  body {
    background-color: var(--primary-background-color,#000);
    color: var(--primary-text-color,#fff);
    margin: 0 !important;
    font-family: Arial,Helvetica,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 12px;
  }
  *{
    a {
      text-decoration: none;
      color: var(--primary-text-color,#fff);
    }
    //color: var(--primary-text-color,#fff);
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



