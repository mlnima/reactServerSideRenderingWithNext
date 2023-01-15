import React, {useEffect, FC, memo, useState} from 'react';
import {useRouter} from "next/router";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import ActiveLoading from "ui/src/ActiveLoading";

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
        return <ActiveLoading onClickEvent={() => dispatch(loading(false))} color={'var(--main-active-color,#f90)'}/>
    } else return null

};

export default memo(Loading);



// if (isLoadingByRouteChange || isLoading) {
//     return (
//         <StyledDiv className='Loading' onClick={() => dispatch(loading(false))}
//                    onTouchStartCapture={() => dispatch(loading(false))}>
//             <ReactLoading type={'spin'} color={'var(--main-active-color,#f90)'} height={100} width={100}/>
//
//         </StyledDiv>
//     )
// } else return null
