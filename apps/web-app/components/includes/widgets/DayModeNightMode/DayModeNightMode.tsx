import React, {FC, useEffect, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {UniqueDataTypes} from "typescript-types";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

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

    const customColors = useSelector(({settings}: Store) => settings?.design?.customColors || '')

    const [state, setState] = useState({
        active: false,
        colors: '',
        mode: uniqueData?.dayNightModeDefault || 'night'
    })

    const onSelectHandler = (mode) => {
        localStorage.setItem('theme', mode)
        setState({
            ...state,
            active: true,
            colors: mode === uniqueData?.dayNightModeDefault ? customColors : uniqueData?.dayNightModeData,
            mode
        })
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme) {
                onSelectHandler(localStorage.theme)
            }
        }
    }, [uniqueData]);

    return (
        <DayModeNightModeStyledDiv>
            <button className={'btn btn-primary'}
                    aria-label={state.mode === 'night' ? 'day mode' : 'night mode'}
                    onClick={() => {
                        state.mode === 'night' ?
                            onSelectHandler('day') :
                            onSelectHandler('night')
                    }}
            >
                <SvgRenderer svgUrl={state.mode === 'night' ? '/asset/images/icons/moon-solid.svg':'/asset/images/icons/sun.svg'}
                             size={25}
                             customClassName={'light'}
                             color={'var(--main-text-color)'}/>
            </button>
            <ModeStyles dayNightModeData={state.colors}
            />
        </DayModeNightModeStyledDiv>
    )
};
export default DayModeNightMode
