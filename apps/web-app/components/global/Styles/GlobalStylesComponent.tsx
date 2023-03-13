import {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux";
import {FC} from "react";
import {Store} from "typescript-types";
import gridLayout from './gridLayout';
import buttons from 'ui/src/buttonsStyle';
import inputs from 'ui/src/inputsStyles';
import selects from 'ui/src/selectsStyle';
import scrollBars from 'ui/src/scrollBars';
import animationsKeyframes from 'ui/src/animationsKeyframes';

interface GlobalStylesPropTypes {
    customColors?: string,
    customStyles?: string,
    sidebarWidth?: number,
}

const GlobalStyles = createGlobalStyle`
  :root {
    --default-border-color: rgba(138, 145, 158, .2);
    --default-border: solid var(--default-border-color, #ccc) .2px;
  }

  ${({customColors}: GlobalStylesPropTypes) => customColors?.includes(':root') ? customColors : `:root {${customColors}}`}
  ${animationsKeyframes}
  ${buttons}
  ${gridLayout}
  ${inputs}
  ${selects}
  ${scrollBars}

  body {
    background-color: var(--main-background-color, #000);
    color: var(--main-text-color, '#ccc');
    font-family: Arial, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 0.875rem;
    margin: 0;
  }
  
  .sub-content{
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
  
  ${({customStyles}: GlobalStylesPropTypes) => customStyles ? customStyles : ''}
`

const GlobalStylesComponent: FC = () => {

    const {customColors, customStyles, sidebarWidth} = useSelector(({settings}: Store) => settings?.initialSettings?.layoutSettings ?? {})
    return (
        <GlobalStyles customColors={customColors} customStyles={customStyles} sidebarWidth={sidebarWidth || 320}/>
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