import React from 'react';
import {createGlobalStyle} from "styled-components";

interface GlobalStylesPropTypes {
    customColors:string,
    customStyles:string,
    sideBarWidth:number,
}

//body {
const GlobalStyles = createGlobalStyle`
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
  
  ${({customStyles}:GlobalStylesPropTypes ) => customStyles ? customStyles : '' }
`


import {FC} from "react";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

interface ComponentPropTypes {
}

const AdminPanelGlobalStyles: FC<ComponentPropTypes> = (props) => {
    const {customColors,customStyles,sideBarWidth} = useSelector(({adminPanelSettings}:Store)=>{
        return{
            customColors: adminPanelSettings?.design?.customColors,
            customStyles: adminPanelSettings?.design?.customStyles,
            sideBarWidth: adminPanelSettings?.design?.sideBarWidth,
        }
    })
    return (<GlobalStyles customColors={customColors || ''} customStyles={customStyles || ''} sideBarWidth={sideBarWidth || 320}/>)
};
export default AdminPanelGlobalStyles



