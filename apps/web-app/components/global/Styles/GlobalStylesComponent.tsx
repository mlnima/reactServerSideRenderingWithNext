import {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux";
import {FC} from "react";
import {Store} from "typescript-types";
import keyframes from './keyframes';
import buttons from './buttons';
import gridLayout from './gridLayout';
import inputs from './inputs';
import selects from './selects';
import scrollBar from './scrollBar';

interface GlobalStylesPropTypes {
    customColors: string,
    customStyles: string,
    sideBarWidth: number,
}

const GlobalStyles = createGlobalStyle`
  :root {
    --default-border-color: rgba(138, 145, 158, .2);
    --default-border: solid var(--default-border-color, #ccc) .2px;
  }

  ${({customColors}: GlobalStylesPropTypes) => customColors?.includes(':root') ? customColors : `:root {${customColors}}`}
  ${keyframes}
  ${buttons}
  ${gridLayout}
  ${inputs}
  ${selects}
  ${scrollBar}
  body {
    background-color: var(--main-background-color, #000);
    color: var(--main-text-color, '#ccc');
    font-family: Arial, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 0.875rem;
    margin: 0;
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
  
  ${({customStyles}: GlobalStylesPropTypes) => customStyles ? customStyles : ''}
`

const GlobalStylesComponent: FC = () => {
    const {customColors, customStyles, sideBarWidth} = useSelector(({settings}: Store) => {
        return {
            customColors: settings?.design?.customColors,
            customStyles: settings?.design?.customStyles,
            sideBarWidth: settings?.design?.sideBarWidth,
        }
    })
    return (
        <GlobalStyles customColors={customColors || ''} customStyles={customStyles || ''}
                      sideBarWidth={sideBarWidth || 320}/>
    )
}

export default GlobalStylesComponent;


//.left-sidebar-layout {
//  display: grid;
//  grid-area: leftSidebar;
//  grid-template-columns: 1fr;
//  grid-template-areas:
//        'topbar'
//        'header'
//        'navigation'
//        'main'
//        'leftSidebar'
//        'footer';
//}