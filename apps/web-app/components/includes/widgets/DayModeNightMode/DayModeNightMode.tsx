import React, {FC, useEffect, useMemo, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {UniqueDataTypes} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";

interface DayModeNightModePropTypes {
    uniqueData: UniqueDataTypes
}

const DayModeNightModeStyledDiv = styled.div`
  position: relative;

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;

  }

  .select-section {
    position: absolute;
  }

`

const ModeStyles = createGlobalStyle`
  ${({dayNightModeData}: any) => dayNightModeData ? dayNightModeData : ''}
`

const DayModeNightMode: FC<DayModeNightModePropTypes> = ({uniqueData}) => {

    const [isDefaultTheme, setIsDefaultTheme] = useState(true)
    const defaultColors = useSelector(({settings}: Store) => settings?.initialSettings?.layoutSettings?.customColors || '')
    const currentColors = useMemo(() => isDefaultTheme ? defaultColors  : uniqueData?.dayNightModeData ,[isDefaultTheme])

    const onSelectHandler = () => {
        const currentValue = !isDefaultTheme
        setIsDefaultTheme(currentValue)
        localStorage.setItem('theme', currentValue.toString())
    }

    useEffect(() => {
         setTimeout(()=>{
             if (localStorage.theme) {
                 setIsDefaultTheme(localStorage.theme === 'true')
             }
         },50)
    }, []);

    return (
        <DayModeNightModeStyledDiv>
            <button className={'btn btn-primary'} aria-label={'theme mode'} onClick={onSelectHandler}>
                <FontAwesomeIcon className={'moon-sun'}
                                 color={'var(--main-text-color)'}
                                 icon={isDefaultTheme  ? faMoon : faSun} style={{width:25,height:25}}/>
            </button>
            <ModeStyles dayNightModeData={currentColors}/>
        </DayModeNightModeStyledDiv>
    )
};
export default DayModeNightMode
