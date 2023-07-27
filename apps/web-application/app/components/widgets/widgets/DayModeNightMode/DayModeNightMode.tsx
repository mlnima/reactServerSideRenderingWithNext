'use client';
import React, {FC, useEffect} from "react";
import styled from "styled-components";
import {UniqueDataTypes} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setTheme} from "@store/reducers/globalStateReducer";

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
        <DayModeNightModeStyledDiv>
            <button className={'btn btn-primary'} aria-label={'theme mode'} onClick={onSelectHandler}>
                <FontAwesomeIcon className={'moon-sun'}
                                 color={'var(--primary-text-color,#fff)'}
                                 icon={theme === 'dark'  ? faMoon : faSun} style={{width:25,height:25}}/>
            </button>
            {/*<ModeStyles dayNightModeData={currentColors}/>*/}
        </DayModeNightModeStyledDiv>
    )
};
export default DayModeNightMode
