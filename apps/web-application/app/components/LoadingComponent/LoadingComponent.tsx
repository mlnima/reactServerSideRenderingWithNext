'use client';
import React, {useEffect, FC} from 'react';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {ActiveLoading} from "ui";
import {loading} from "@store/reducers/globalStateReducer";

const LoadingComponent: FC = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(({globalState}) => globalState?.loading);

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                dispatch(loading(false))
            }, 3000)
        }
    }, []);

    if (!isLoading) return null

    return <ActiveLoading onClickEvent={() => dispatch(loading(false))}
                          color={'var(--primary-active-color,#f90)'}/>

};

export default LoadingComponent;


