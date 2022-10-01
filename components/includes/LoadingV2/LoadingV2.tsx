import React, {useEffect, FC, memo, useState} from 'react';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import {useRouter} from "next/router";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

let StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .stop-loading {
    position: fixed;
    top: 100px;
    right: 100px;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    z-index: 10;
    width: 50px;
    height: 50px;

    &:hover {
      color: #916d07;
    }

    .stop-loading-icon {
      width: 2rem !important;
      height: 2rem !important;
      color: var(--main-active-color, #f90);
      cursor: pointer;
    }
  }

  span {
    span {
    }
  }
`


const LoadingV2: FC = () => {
    const dispatch = useAppDispatch()
    const [isLoadingByRouteChange, setIsLoadingByRouteChange] = useState(false)
    const isLoading = useSelector(({globalState}: Store) => globalState?.loading)
    const {events} = useRouter()

    useEffect(() => {

        const handleStart = (eventType) =>  {
            // console.log(eventType)
            setIsLoadingByRouteChange(true)
        };

        const handleComplete = (eventType) =>  {
            // console.log(eventType)
            setIsLoadingByRouteChange(false)
        };

        events.on('routeChangeStart',()=> handleStart('routeChangeStart'))
        events.on('routeChangeComplete',()=> handleComplete('routeChangeComplete'))
        // events.on('routeChangeError', ()=>handleComplete('routeChangeError'))
        return () => {
            events.off('routeChangeStart',()=> handleComplete('routeChangeStart'))
            events.off('routeChangeComplete',()=> handleComplete('routeChangeComplete'))
            // events.off('routeChangeError', handleComplete('routeChangeError'))
        }
    }, [])

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                dispatch(loading(false))
                setIsLoadingByRouteChange(false)
            }, 3000)
        }
    }, []);

    if (isLoadingByRouteChange || isLoading) {
        return (
            <StyledDiv className='Loading' onClick={() => dispatch(loading(false))}
                       onTouchStartCapture={() => dispatch(loading(false))}>
                <ReactLoading type={'spin'} color={'var(--main-active-color,#f90)'} height={100} width={100}/>
            </StyledDiv>
        )
    } else return null

};

export default memo(LoadingV2);


// const handleStart = (url) => (url !== asPath) && dispatch(loading(true));
// const handleComplete = (url) => (url === asPath) && dispatch(loading(false));