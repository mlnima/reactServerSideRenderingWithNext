import React, {useEffect, FC, memo, useState} from 'react';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import {useRouter} from "next/router";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
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

interface PropTypes{
    isLoading:boolean
}
const Loading: FC<PropTypes> = ({isLoading}) => {
    const dispatch = useAppDispatch()
    const [isLoadingByRouteChange, setIsLoadingByRouteChange] = useState(false)
    const {events} = useRouter()

    useEffect(() => {

        const handleStart = () =>  {
            setIsLoadingByRouteChange(true)
        };

        const handleComplete = () =>  {
            setIsLoadingByRouteChange(false)
        };

        events.on('routeChangeStart',()=> handleStart())
        events.on('routeChangeComplete',()=> handleComplete())
        return () => {
            events.off('routeChangeStart',()=> handleComplete())
            events.off('routeChangeComplete',()=> handleComplete())
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

export default memo(Loading);
