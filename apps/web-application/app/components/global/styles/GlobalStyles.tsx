// @ts-nocheck
'use client';
import {createGlobalStyle} from "styled-components";
import gridLayout from './gridLayout';
import {buttonsStyle,inputsStyles,selectsStyle,scrollBars,keyframes} from 'ui';
import {FC} from "react";

interface GlobalStylesPropTypes {
    customColors?: string;
    customStyles?: string;
}

const GlobalStyles = createGlobalStyle<GlobalStylesPropTypes>`
  :root {
    --default-border-color: rgba(138, 145, 158, .2);
    --default-border: solid var(--default-border-color, #ccc) .2px;
  }

  ${({customColors}) => customColors?.includes(':root') ? customColors : `:root {${customColors}}`}
  body {
    background-color: var(--primary-background-color,#000);
    color: var(--primary-text-color,#fff);
    font-family: Arial, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 0.875rem;
    margin: 0;
  }


  .sub-content {
    padding: 0 8px;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    box-sizing: border-box;
    outline: none;
  }

  .action-client-button-link {
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 0 5px 2.5px rgba(255, 255, 255, .2);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-control-input-validator {
    width: 80%;
  }

  @media only screen and (min-width: 768px) {
    .mobile-only {
      //display: none !important;
    }
  }

  ${buttonsStyle}
  ${gridLayout}
  ${inputsStyles}
  ${selectsStyle}
  ${keyframes}
  ${scrollBars}
  ${({customStyles}) => customStyles ? customStyles : ''}
`

const GlobalStyleComponent:FC<GlobalStylesPropTypes> = ({customStyles,customColors})=>{
    return <GlobalStyles customColors={ customColors} customStyles={ customStyles}/>
}

export default GlobalStyleComponent

// export default GlobalStyles;

