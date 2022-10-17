import {FC, useEffect, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import {UniqueDataTypes} from "@_typeScriptTypes/widgets/Widget";

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

    .light {
      width: 25px;
      height: 25px;
      margin: 0 2px;
      background-color: var(--main-active-color, #f90);
      mask: url('/public/asset/images/icons/lightbulb-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/lightbulb-solid.svg') no-repeat center;
    }
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

    const [state, setstate] = useState({
        active: false,
        open: false,
        mode: uniqueData?.dayNightModeDefault || 'night'
    })

    const onSelectHandler = (mode) => {
        setstate({
            ...state,
            active: true,
            open: false,
            mode
        })
        if (typeof window !== 'undefined' && mode) {
            localStorage.setItem('theme', mode)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme){
                setstate({
                    ...state,
                    mode: localStorage.theme
                })
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
                <span className={'light'}/>
            </button>
            <ModeStyles dayNightModeData={state.mode === uniqueData?.dayNightModeDefault ?
                customColors : uniqueData?.dayNightModeData || ''}
            />
        </DayModeNightModeStyledDiv>
    )
};
export default DayModeNightMode
