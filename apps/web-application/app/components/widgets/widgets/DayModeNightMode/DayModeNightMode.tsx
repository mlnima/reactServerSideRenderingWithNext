'use client';
import React, {FC} from "react";
import {UniqueDataTypes} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import './DayModeNightMode.scss';
import Switch from "react-switch";
import {faLightbulb} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setUseSecondaryModeColors} from "@store/reducers/globalStateReducer";

interface DayModeNightModePropTypes {
    uniqueData?: UniqueDataTypes
}

const DayModeNightMode: FC<DayModeNightModePropTypes> = () => {

    const dispatch = useAppDispatch()
    const {useSecondaryModeColors} = useAppSelector(({globalState}) => globalState);

    const onSelectHandler = () => {

        if (useSecondaryModeColors) {
            localStorage.setItem('lightMode', 'false')
            // setActive(false)
            dispatch(setUseSecondaryModeColors(false))
        } else {
            localStorage.setItem('lightMode', 'true')
            // setActive(true)
            dispatch(setUseSecondaryModeColors(true))
        }
    }

    return (
        <div className={'theme-switcher-widget'}>
            <Switch onChange={onSelectHandler}
                    className={`switchTheme ${useSecondaryModeColors ? 'switchThemeActive' : ''}`}
                    uncheckedIcon={
                        <FontAwesomeIcon className={'moon-sun'} icon={faLightbulb} color={'#f90'} width={16}
                                         height={16}/>
                    }
                    checkedIcon={
                        <FontAwesomeIcon className={'moon-sun'} icon={faMoon} color={'var(--secondary-text-color)'}
                                         width={16} height={16}/>
                    }
                    checked={useSecondaryModeColors}/>
            {/*{active && <ModeStyles dayNightModeData={secondaryModeColors}/>}*/}
        </div>
    )
};
export default DayModeNightMode
