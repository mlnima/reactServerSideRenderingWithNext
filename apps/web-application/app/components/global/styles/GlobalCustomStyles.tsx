// @ts-nocheck
'use client';
import {createGlobalStyle} from "styled-components";
import {FC} from "react";

interface GlobalStylesPropTypes {
    customColors?: string;
    customStyles?: string;
}

const Styles = createGlobalStyle<GlobalStylesPropTypes>`
  ${({customColors}) => customColors?.includes(':root') ? customColors : `:root {${customColors}}`}
  ${({customStyles}) => customStyles ? customStyles : ''}
`
const GlobalCustomStyles: FC<GlobalStylesPropTypes> = ({customStyles, customColors}) => {
    return <Styles customColors={customColors} customStyles={customStyles}/>
}

export default GlobalCustomStyles

//body {
//  background-color: var(--primary-background-color,#000);
//  color: var(--primary-text-color,#fff);
//  font-family: Arial, serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  //font-size: 0.875rem;
//  margin: 0;
//}
//:root {
//  --default-border-color: rgba(138, 145, 158, .2);
//  --default-border: solid var(--default-border-color, #ccc) .2px;
//}


// export default GlobalStyles;
// ${buttonsStyle}
//  ${inputsStyles}
// ${selectsStyle}
// ${keyframes}
//  ${scrollBars}
// ${gridLayout}

