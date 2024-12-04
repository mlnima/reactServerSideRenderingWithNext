'use client';
import {FC, useEffect} from "react";
import {useAppDispatch} from "@store/hooks";
import {setInitialSettings} from "@store/reducers/settingsReducer";
import {setUseSecondaryModeColors} from "@store/reducers/globalStateReducer";

interface IProps {
    initialSettings: object
}

const StoreDataInitializer: FC<IProps> = ({initialSettings}) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setInitialSettings(initialSettings))
        if (typeof window !== 'undefined') {
            const lightMode = localStorage.getItem('lightMode')
            if (lightMode === 'true') {
                dispatch(setUseSecondaryModeColors(true))
            }
        }
    }, []);

    return null
};
export default StoreDataInitializer
