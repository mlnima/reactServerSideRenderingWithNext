'use client';
import React, {FC, useEffect} from "react";
import styled from "styled-components";
import {UniqueDataTypes} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setTheme} from "@store/reducers/globalStateReducer";
import './DayModeNightMode.styles.scss';

interface DayModeNightModePropTypes {
    uniqueData: UniqueDataTypes
}

// const ModeStyles = createGlobalStyle`
//   ${({dayNightModeData}: any) => dayNightModeData ? dayNightModeData : ''}
// `

const DayModeNightMode: FC<DayModeNightModePropTypes> = ({uniqueData}) => {
    const theme = useAppSelector(({globalState})=>globalState.theme)
    const dispatch = useAppDispatch()

    // const [isDefaultTheme, setIsDefaultTheme] = useState(true)
    // const defaultColors = useSelector(({settings}: Store) => settings?.initialSettings?.layoutSettings?.customColors || '')
    // const currentColors = useMemo(() => isDefaultTheme ? defaultColors  : uniqueData?.dayNightModeData ,[isDefaultTheme])

    const onSelectHandler = () => {
        const themeToSet = theme === 'dark' ? 'light' : 'dark'
        dispatch(setTheme(themeToSet))
        localStorage.setItem('activeTheme', themeToSet)
    }

    useEffect(() => {
         setTimeout(()=>{
             if (localStorage.activeTheme) {
                 dispatch(setTheme(localStorage.activeTheme))
             }
         },50)
    }, []);

    return (
        <div className={'theme-switcher-widget'}>
            <button className={'btn btn-transparent'} aria-label={'theme mode'} onClick={onSelectHandler}>
                <FontAwesomeIcon className={'moon-sun'}icon={theme === 'dark'  ? faMoon : faSun} />
            </button>
            {/*<ModeStyles dayNightModeData={currentColors}/>*/}
        </div>
    )
};
export default DayModeNightMode
