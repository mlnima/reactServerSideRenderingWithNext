'use client';
import {createGlobalStyle} from "styled-components";
import React, {FC} from "react";
import {useAppSelector} from "@store/hooks";

interface GlobalStylesPropTypes {
    primaryModeColors?: string;
    customStyles?: string;
}

const Styles = createGlobalStyle<GlobalStylesPropTypes>`
  ${({primaryModeColors}) =>
          primaryModeColors ? primaryModeColors?.includes(':root') ? primaryModeColors : `:root {${primaryModeColors}}` : ''}
  ${({customStyles}) => customStyles ? customStyles : ''}
`

const ModeStyles = createGlobalStyle<{dayNightModeData:string}>`
  ${({dayNightModeData}) => dayNightModeData ? dayNightModeData : ''}
`

const GlobalCustomStyles: FC<GlobalStylesPropTypes> = ({customStyles, primaryModeColors}) => {
    const {secondaryModeColors} = useAppSelector(({settings}) => settings?.initialSettings?.layoutSettings);
    const {useSecondaryModeColors} = useAppSelector(({globalState}) => globalState);

    return (
        <>
            <Styles primaryModeColors={primaryModeColors} customStyles={customStyles}/>
            {useSecondaryModeColors && <ModeStyles dayNightModeData={secondaryModeColors}/>}
        </>
    )
}

export default GlobalCustomStyles


