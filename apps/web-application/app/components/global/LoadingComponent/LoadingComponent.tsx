'use client';
import React, {useEffect, FC} from 'react';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {ActiveLoading} from "ui";
import {loading, setLoading} from "@store/reducers/globalStateReducer";
import {usePathname, useSearchParams} from "next/navigation";

const LoadingComponent: FC = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(({globalState}) => globalState?.loading);
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                dispatch(loading(false))
            }, 3000)
        }
    }, []);

    useEffect(() => {
        if (isLoading) {
            dispatch(setLoading(false))
        }
    }, [searchParams, pathname]);

    if (!isLoading) return null



    return <ActiveLoading onClickEvent={() => dispatch(loading(false))}
                          color={'var(--primary-active-color,#f90)'}/>

    // return null

};

export default LoadingComponent;


