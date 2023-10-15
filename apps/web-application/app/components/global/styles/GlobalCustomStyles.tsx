'use client';
import {createGlobalStyle} from "styled-components";
import {FC} from "react";
import defaultColorVariables from "@components/global/styles/defaultColorVariables";

interface GlobalStylesPropTypes {
    customColors?: string;
    customStyles?: string;
}

const Styles = createGlobalStyle<GlobalStylesPropTypes>`
  ${({customColors}) =>
          !!customColors ? customColors?.includes(':root') ? customColors : `:root {${customColors}}` : ''}
  ${({customStyles}) => customStyles ? customStyles : ''}
`
const GlobalCustomStyles: FC<GlobalStylesPropTypes> = ({customStyles, customColors}) => {
    return <Styles customColors={customColors} customStyles={customStyles}/>
}

export default GlobalCustomStyles


