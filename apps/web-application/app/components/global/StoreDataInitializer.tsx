'use client';
import {FC, useEffect} from "react";
import {useAppDispatch} from "@store/hooks";
import {setInitialSettings} from "@store/reducers/settingsReducer";

interface IProps {
    initialSettings: {}
}

const StoreDataInitializer: FC<IProps> = ({initialSettings}) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setInitialSettings(initialSettings))
    }, []);


    return null
};
export default StoreDataInitializer
