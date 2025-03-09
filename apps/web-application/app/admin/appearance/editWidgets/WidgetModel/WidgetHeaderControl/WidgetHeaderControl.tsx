import React, {FC} from 'react';
import {convertVariableNameToName} from "@repo/utils";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {faLockOpen} from "@fortawesome/free-solid-svg-icons/faLockOpen";
import {faSortUp} from "@fortawesome/free-solid-svg-icons/faSortUp";
import {faSortDown} from "@fortawesome/free-solid-svg-icons/faSortDown";

let StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 10px 1fr 1fr 5fr 2fr;
  align-items: center;
  background-color: var(--secondary-background-color,#181818);
  color: var(--primary-text-color,#fff);
  height: 50px;
  font-size: 12px;
  
  .widget-index{
    text-align: center;
    font-weight: bold;
    font-size: large;
  }

  .widget-open-close-button {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transition: 1s;
      transform: scale(1.2);
    }

    svg {
      width: 25px;
      height: 25px;
      margin: 0 5px;
      color: var(--primary-text-color,#fff);
      place-items: center;
    }
  }

  .btn {
    font-size: 12px;
    margin: 0 10px;
  }

  .widget-name-index {
    p {

      color: var(--primary-text-color,#fff);
    }
  }

  .widget-open-control-group-buttons {
    display: grid;
    grid-template-columns:  1fr 1fr;

    button, a {
      color: var(--primary-text-color,#fff);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      outline: none;
      padding: 8px 10px;

      &:hover {
        background-color: var(--secondary-background-color,#181818);
      }

      svg {
        width: 25px;
        height: 25px;
        margin: 0 5px;

        &:hover {
          transition: .5s;
          transform: scale(1.2);
        }
      }
    }

  }
`

interface WidgetHeaderControlPropType {
    setKey?: boolean,
    widgetSettings: any,
    widgetData: any,
    onLockHandler: any,
    changeWidgetIndex: any,
    onObjectModeHandler: any,
    widgetId: string

}

const WidgetHeaderControl: FC<WidgetHeaderControlPropType> =
    ({
         setKey,
         widgetSettings,
         widgetData,
         onLockHandler,
         changeWidgetIndex,
         onObjectModeHandler,
         widgetId,
     }) => {

        const keyStatus = setKey ? {key: widgetId} : {}
//index: {widgetData.widgetIndex || '0'}
        return (
            <StyledDiv className='widget-open-control' {...keyStatus}>
                <span className={'widget-index'}>
                    {widgetData.widgetIndex}
                </span>
                <div className='widget-open-close-button' onClick={onLockHandler}>
                    <FontAwesomeIcon icon={widgetData.stayOpen ? faLockOpen : faLock} className={'meta-icon'}/>
                </div>
                <button className={'btn btn-danger'} onClick={onObjectModeHandler}>
                    {widgetSettings.objectEditingMode ? 'FORM MODE' : 'OBJECT MODE'}

                </button>
                <div className='widget-name-index'>
                    <p>{convertVariableNameToName(widgetData.type)}  {widgetData.name} </p>
                </div>

                <div className='widget-open-control-group-buttons'>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(false)}>
                        <FontAwesomeIcon icon={faSortUp} className={'meta-icon'}/>
                    </button>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(true)}>
                        <FontAwesomeIcon icon={faSortDown} className={'meta-icon'}/>
                    </button>
                </div>
            </StyledDiv>
        );
    };
export default WidgetHeaderControl;
