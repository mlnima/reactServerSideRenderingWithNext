'use client';
import {FC} from "react";
import './BackgroundFilterWholeScreen.scss';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setBackgroundFilter} from "@store/reducers/globalStateReducer";


const BackgroundFilterWholeScreen: FC = () => {
    const dispatch = useAppDispatch()
    const {backgroundFilter} = useAppSelector(({globalState})=>globalState)

    const disMountHandler = ()=>{
        dispatch(setBackgroundFilter(false))
    }

    if (backgroundFilter){
        return (
            <div className={'backgroundFilterWholeScreen'} onClick={disMountHandler} onTouchStart={disMountHandler}/>
        )
    }else return null

};
export default BackgroundFilterWholeScreen
