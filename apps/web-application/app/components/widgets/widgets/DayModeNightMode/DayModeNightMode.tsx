'use client';
import React, {FC, useEffect, useState} from "react";
import {createGlobalStyle} from "styled-components";
import {UniqueDataTypes} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import './DayModeNightMode.styles.scss';

interface DayModeNightModePropTypes {
    uniqueData: UniqueDataTypes
}

const ModeStyles = createGlobalStyle`
  ${({dayNightModeData}: any) => dayNightModeData ? dayNightModeData : ''}
`

const DayModeNightMode: FC<DayModeNightModePropTypes> = ({uniqueData}) => {

    const [active,setActive] = useState(false)

    const onSelectHandler = () => {
        if (active){
            localStorage.setItem('lightMode', 'false')
            setActive(false)
        }else {
            localStorage.setItem('lightMode', 'true')
            setActive(true)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const lightMode=  localStorage.getItem('lightMode')
            if (lightMode === 'true') {
                setActive(true)
            }
        }
    }, []);

    return (
        <div className={'theme-switcher-widget'}>
            <button className={'btn btn-transparent'} aria-label={'theme mode'} onClick={onSelectHandler}>
                <FontAwesomeIcon className={'moon-sun'} icon={active ? faMoon : faSun} />
            </button>
            {active && <ModeStyles dayNightModeData={uniqueData?.dayNightModeData}/> }
        </div>
    )
};
export default DayModeNightMode
