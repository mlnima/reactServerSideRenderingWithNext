import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faLock, faLockOpen, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import convertVariableNameToName from "../../../../../_variables/util/convertVariableNameToName";
import styled from "styled-components";

let StyledDiv = styled.div`
  display: grid;
  grid-template-columns:  1fr 1fr 5fr 2fr;
  align-items: center;
  background-color: var(--admin-darkcolor70);
  color: var(--admin-text-color);
  width: 100%;
  height: 50px;
  font-size: 12px;

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
      color: var(--admin-text-color);
      place-items: center;

      &:hover {
        //background-color: var(--admin-darkcolor80);
      }
    }
  }

  .btn {
    font-size: 12px;
    margin: 0 10px;
  }

  .widget-name-index {
    p {

      color: var(--admin-text-color)
    }
  }

  .widget-open-control-group-buttons {
    display: grid;
    grid-template-columns:  1fr 1fr;

    button, a {
      color: var(--admin-text-color);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      outline: none;
      padding: 8px 10px;

      &:hover {
        background-color: var(--admin-darkcolor80);
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

        return (
            <StyledDiv className='widget-open-control' {...keyStatus}>
                <div className='widget-open-close-button' onClick={onLockHandler}>
                    <FontAwesomeIcon icon={widgetData.stayOpen ? faLockOpen : faLock}
                                     className='widget-header-handler-admin'/>

                </div>
                <button className={'btn btn-danger'} onClick={onObjectModeHandler}>
                    {widgetSettings.objectEditingMode ? 'FORM MODE' : 'OBJECT MODE'}

                </button>
                <div className='widget-name-index'>
                    <p>{convertVariableNameToName(widgetData.type)} : {widgetData.name} index: {widgetData.widgetIndex || '0'}</p>
                </div>

                <div className='widget-open-control-group-buttons'>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(false)}>
                        <FontAwesomeIcon icon={faSortUp} className='widget-header-handler-admin'/>
                    </button>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(true)}>
                        <FontAwesomeIcon icon={faSortDown} className='widget-header-handler-admin'/>
                    </button>
                </div>
            </StyledDiv>
        );
    };
export default WidgetHeaderControl;
