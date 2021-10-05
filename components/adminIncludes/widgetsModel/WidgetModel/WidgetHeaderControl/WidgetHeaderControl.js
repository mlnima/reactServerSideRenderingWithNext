import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faLock, faLockOpen, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {convertVariableNameToName} from "../../../../../_variables/_variables";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: grid;
  grid-template-columns:  1fr 5fr 2fr  ;
  align-items: center;
  background-color: var(--admin-darkcolor70);
  color: var(--admin-text-color);
  width: 100%;
  height:50px ;
  font-size: 12px;

  .widget-open-close-button{
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      transition: 1s;
      transform: scale(1.2);
    }
    svg{
      width: 25px;
      height:  25px;
      margin: 0 5px;
      color:var(--admin-text-color);
      place-items: center;
      &:hover{
        //background-color: var(--admin-darkcolor80);
      }
    }
  }
  .widget-name-index{
    p{

      color:var(--admin-text-color)
    }
  }

  .widget-open-control-group-buttons{
    display: grid;
    grid-template-columns:  1fr 1fr ;
    button,a{
      color: var(--admin-text-color);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      outline: none;
      padding: 8px 10px;
      &:hover{
        background-color: var(--admin-darkcolor80);
      }
      svg{
        width: 25px;
        height:  25px;
        margin: 0 5px;
        &:hover{
          transition: .5s;
          transform: scale(1.2);
        }
      }
    }

  }
`

const WidgetHeaderControl = props => {

    const keyStatus = props.setKey ? {key:props.widgetId} :{}

    return (
        <StyledDiv className='widget-open-control' {...keyStatus}>
            {/*<div className='widget-open-close-button' onClick={props.onOpenHandler}>*/}
            {/*    <FontAwesomeIcon icon={faBars} className='widget-header-handler-admin' style={{*/}
            {/*        transform: props.widgetSettings.open ? ' rotate(90deg)' : ' rotate(0deg)',*/}
            {/*    }}/>*/}
            {/*</div>*/}
            <div className='widget-open-close-button' onClick={props.onLockHandler} >
                <FontAwesomeIcon icon={props.widgetData.stayOpen ? faLockOpen : faLock} className='widget-header-handler-admin' />
            </div>
            <div className='widget-name-index'>
                <p>{props.widgetData.name || convertVariableNameToName(props.widgetData.type)} index: {props.widgetData.widgetIndex || '0'}</p>
            </div>
            <div className='widget-open-control-group-buttons'>
                <button className='changeWidgetIndexBtn' onClick={() => props.changeWidgetIndex(false)}>
                    <FontAwesomeIcon icon={faSortUp} className='widget-header-handler-admin' />
                </button>
                <button className='changeWidgetIndexBtn' onClick={() => props.changeWidgetIndex(true)}>
                    <FontAwesomeIcon icon={faSortDown} className='widget-header-handler-admin' />
                </button>
            </div>
        </StyledDiv>
    );
};
export default WidgetHeaderControl;
