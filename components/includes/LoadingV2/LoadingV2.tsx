import React, {useEffect, FC} from 'react';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import {useRouter} from "next/router";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useAppDispatch} from "@store_toolkit/hooks";

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
    const isLoading = useSelector(({globalState}: StoreTypes) => globalState?.loading)
    const {events, asPath} = useRouter()


    useEffect(() => {

        const handleStart = (url) => (url !== asPath) && dispatch(loading(true));
        const handleComplete = (url) => (url === asPath) && dispatch(loading(false));

        events.on('routeChangeStart', handleStart)
        events.on('routeChangeComplete', handleComplete)
        events.on('routeChangeError', handleComplete)

        return () => {
            events.off('routeChangeStart', handleComplete)
            events.off('routeChangeComplete', handleComplete)
            events.off('routeChangeError', handleComplete)
        }
    })

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                dispatch(loading(false))
            }, 3000)
        }
    }, [isLoading]);

    return (isLoading) && (
        <StyledDiv className='Loading' onClick={() => dispatch(loading(false))}
                   onTouchStartCapture={() => dispatch(loading(false))}>
            <ReactLoading type={'spin'} color={'var(--main-active-color,#f90)'} height={100} width={100}/>
        </StyledDiv>
    );

};

export default LoadingV2;
// <button className='stop-loading fas fa-times' onClick={() => dispatch(setLoading(false))}>
//     <FontAwesomeIcon style={{width: '1rem', height: '1rem'}} icon={faTimes} className='stop-loading-icon'/>
// </button>