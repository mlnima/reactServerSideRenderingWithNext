import React, {useState, useEffect, FC} from 'react';
import styled from "styled-components";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SyncLoader} from "react-spinners";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useRouter} from "next/router";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

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

  .stopLoading {
    position: fixed;
    top: 50px;
    right: 50px;
    font-size: xxx-large;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    z-index: 10;

    &:hover {
      color: #916d07;
    }
  }

  span {
    span {
    }
  }
`


const Loading: FC = () => {
    const dispatch = useDispatch()
    const loading = useSelector(({globalState}: StoreTypes) => globalState?.loading)
    const {pathname} = useRouter()
    const [render, setRender] = useState(false)

    useEffect(() => {
        // let isMounted = true;
        // setTimeout(()=>{
        //     if (isMounted) setRender(true)
        // },500)
        setRender(true)
    }, []);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                dispatch(setLoading(false))
            }, 1000)
        }
    }, [pathname]);

    if (render) {
        return (
            <StyledDiv className='Loading'>
                <button className='stopLoading fas fa-times' onClick={() => dispatch(setLoading(false))}>
                    <FontAwesomeIcon style={{width: '1rem', height: '1rem'}} icon={faTimes} className='stopLoading'/>
                </button>
                <SyncLoader color='var(--main-active-color,blue)' loading={true} size={20}/>
            </StyledDiv>
        );
    } else return null
};

export default Loading;
