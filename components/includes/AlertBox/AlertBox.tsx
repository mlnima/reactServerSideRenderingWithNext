import React from 'react';

import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import {closeAlert} from "../../../store/actions/globalStateActions";
import Draggable from 'react-draggable';

import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {faCheckCircle, faExclamationCircle, faExclamationTriangle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withTranslation} from "next-i18next";

let StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left:0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--popup-text-color,#fff);
  background-color: var(--popup-outer-background-color,rgba(0,0,0,.6));
  .alert-message{
    width: 300px;
    background-color: var(--popup-background-color,#191919);
    padding: 0;
    border-radius: 5px;
    .alert-message-header{
      background-color: var(--popup-header-color,#202020);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px  5px 0 0;
      padding: 5px 0;
      .close-alert{
        color: var(--navigation-text-color,#ccc);;
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0 10px;
        svg{
          width: 25px;
          height: 25px;
          
        }
      }
      .alert-type{
        padding: 0 10px;
        margin: 0;
     
        svg{
          width: 25px;
          height: 25px;
        }
      }
    }
    .alert{
      text-align: center;
      padding: 10px;
    }
  }
`

// @ts-ignore
const AlertBox = ({t}) => {
    const dispatch = useDispatch()
    const alert = useSelector((state : StoreTypes) => state.globalState.alert)

        return (
            <StyledDiv className='alert-box'>
                <Draggable  handle=".alert-message-header"  >
               <div className='alert-message'>
                   <div className='alert-message-header'>
                       <p className='alert-type'>
                           {alert.type==='Success'? <FontAwesomeIcon icon={faCheckCircle}  style={{color:'green'}}/>:
                               alert.type==='error' ?  <FontAwesomeIcon icon={faExclamationTriangle}  style={{color:'red'}}/> :
                                    <FontAwesomeIcon icon={faExclamationCircle}  style={{color:'red'}}/>
                           }
                       </p>
                       <button className='close-alert' onClick={()=>dispatch(closeAlert())}>
                           <FontAwesomeIcon icon={faTimes} />
                       </button>
                   </div>
                   <p className='alert'>
                       {t([`common:${alert.message}`, t(`profile:${alert.message}`)])}
                   </p>
               </div>
                </Draggable>
            </StyledDiv>

        );

};
export default withTranslation(['common', 'customTranslation', 'profile'])(AlertBox);
