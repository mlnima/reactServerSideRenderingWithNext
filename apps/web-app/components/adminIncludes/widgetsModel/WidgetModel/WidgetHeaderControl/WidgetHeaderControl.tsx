import {FC} from 'react';
import {convertVariableNameToName} from "custom-util";
import styled from "styled-components";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";

let StyledDiv = styled.div`
  display: grid;
  grid-template-columns:  1fr 1fr 5fr 2fr;
  align-items: center;
  background-color: var(--secondary-background-color,#181818);
  color: var(--main-text-color,#fff);
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
      color: var(--main-text-color,#fff);
      place-items: center;
    }
  }

  .btn {
    font-size: 12px;
    margin: 0 10px;
  }

  .widget-name-index {
    p {

      color: var(--main-text-color,#fff);
    }
  }

  .widget-open-control-group-buttons {
    display: grid;
    grid-template-columns:  1fr 1fr;

    button, a {
      color: var(--main-text-color,#fff);
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

        return (
            <StyledDiv className='widget-open-control' {...keyStatus}>
                <div className='widget-open-close-button' onClick={onLockHandler}>
                    <SvgRenderer svgUrl={widgetData.stayOpen ? '/asset/images/icons/lock-open-solid.svg':
                        '/asset/images/icons/lock-solid.svg'}
                                 size={25}
                                 color={'var(--main-text-color, #fff)'}
                    />

                </div>
                <button className={'btn btn-danger'} onClick={onObjectModeHandler}>
                    {widgetSettings.objectEditingMode ? 'FORM MODE' : 'OBJECT MODE'}

                </button>
                <div className='widget-name-index'>
                    <p>{convertVariableNameToName(widgetData.type)} : {widgetData.name} index: {widgetData.widgetIndex || '0'}</p>
                </div>

                <div className='widget-open-control-group-buttons'>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(false)}>
                        <SvgRenderer svgUrl={'/asset/images/icons/sort-up-solid.svg'}
                                     size={25}
                                     customClassName={'show-password'}
                                     color={'var(--main-text-color, #fff)'}
                        />
                    </button>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(true)}>
                        <SvgRenderer svgUrl={'/asset/images/icons/sort-down-solid.svg'}
                                     size={25}
                                     color={'var(--main-text-color, #fff)'}
                        />
                    </button>
                </div>
            </StyledDiv>
        );
    };
export default WidgetHeaderControl;
