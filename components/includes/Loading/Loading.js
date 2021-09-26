import React from 'react';
import styled from "styled-components";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SyncLoader} from "react-spinners";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/actions/globalStateActions";

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
    &:hover{
      color:#916d07 ;
    }
  }
  span{
    span{
    }
  }
`


const Loading = () => {
        const dispatch = useDispatch()
        return (
            <StyledDiv className='Loading'>
                <button className='stopLoading fas fa-times' onClick={() => dispatch(setLoading(false))}>
                    <FontAwesomeIcon style={{width:'1rem',height:'1rem'}} icon={faTimes} className='stopLoading' />
                </button>
                <SyncLoader color='var(--main-active-color,blue)' loading={true} size={20}   />
            </StyledDiv>
        );
};

export default Loading;
