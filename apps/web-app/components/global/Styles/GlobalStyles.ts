import {createGlobalStyle} from "styled-components";
import gridLayout from './gridLayout';
import buttons from 'ui/src/buttonsStyle';
import inputs from 'ui/src/inputsStyles';
import selects from 'ui/src/selectsStyle';
import scrollBars from 'ui/src/scrollBars';
import keyframes from 'ui/src/keyframes';

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
    background-color: var(--main-background-color, #000);
    color: var(--main-text-color, '#ccc');
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

  ${buttons}
  ${gridLayout}
  ${inputs}
  ${selects}
  ${keyframes}
  ${scrollBars}
  ${({customStyles}) => customStyles ? customStyles : ''}
`

export default GlobalStyles;


