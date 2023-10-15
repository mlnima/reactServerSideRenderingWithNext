'use client';
import React, {FC, useEffect, useState} from "react";
import {createGlobalStyle} from "styled-components";
import {UniqueDataTypes} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import './DayModeNightMode.styles.scss';
import Switch from "react-switch";
import {faLightbulb} from "@fortawesome/free-solid-svg-icons";

interface DayModeNightModePropTypes {
    uniqueData: UniqueDataTypes
}

const ModeStyles = createGlobalStyle<{dayNightModeData:string}>`
  ${({dayNightModeData}) => dayNightModeData ? dayNightModeData : ''}
`

const DayModeNightMode: FC<DayModeNightModePropTypes> = ({uniqueData}) => {

    const [active, setActive] = useState(false)

    const onSelectHandler = () => {
        if (active) {
            localStorage.setItem('lightMode', 'false')
            setActive(false)
        } else {
            localStorage.setItem('lightMode', 'true')
            setActive(true)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const lightMode = localStorage.getItem('lightMode')
            if (lightMode === 'true') {
                setActive(true)
            }
        }
    }, []);

    return (
        <div className={'theme-switcher-widget'}>
            <Switch onChange={onSelectHandler}
                    className={`switchTheme ${active ? 'switchThemeActive' : ''}`}
                    uncheckedIcon={
                        <FontAwesomeIcon className={'moon-sun'} icon={faLightbulb} color={'#f90'} width={16}
                                         height={16}/>
                    }
                    checkedIcon={
                        <FontAwesomeIcon className={'moon-sun'} icon={faMoon} color={'var(--secondary-text-color)'}
                                         width={16} height={16}/>
                    }
                    checked={active}/>
            {active && <ModeStyles dayNightModeData={
                uniqueData?.dayNightModeData ||
                uniqueData?.themeColorsSwitcherColors
            }/>}
        </div>
    )
};
export default DayModeNightMode
