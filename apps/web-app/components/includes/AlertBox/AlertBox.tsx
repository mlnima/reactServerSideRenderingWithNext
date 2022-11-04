import React, {useEffect} from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';
import {closeAlert} from "../../../store_toolkit/clientReducers/globalStateReducer";
import Draggable from 'react-draggable';
import useTranslation from 'next-translate/useTranslation'
import {useAppDispatch} from "../../../store_toolkit/hooks";
import {Store} from "typescript-types";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--popup-text-color, #fff);
  background-color: var(--popup-outer-background-color, rgba(0, 0, 0, .6));
  z-index: 1010;

  .alert-message {
    min-width: 300px;
    max-width: 600px;
    background-color: var(--popup-background-color, #191919);
    padding: 0;
    border-radius: 5px;

    .alert-message-header {
      background-color: var(--popup-header-color, #202020);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px 5px 0 0;
      padding: 5px 0;

      .close-alert {
        color: var(--navigation-text-color, #ccc);;
        background-color: transparent;
        border: none;
        //margin: 0;
        //padding: 0 10px;
        height: 25px;
        width: 40px;
        display: flex;
        justify-content: center;

        //.faTimes {
        //  width: 25px;
        //  height: 25px;
        //  margin: 0 2px;
        //  background-color: var(--post-element-info-text-color, #ccc);
        //  mask: url('/apps/mainNextApp/public/asset/images/icons/times-solid.svg') no-repeat center;
        //  -webkit-mask: url('/apps/mainNextApp/public/asset/images/icons/times-solid.svg') no-repeat center;
        //}
      }

      .alert-type {
        padding: 0 10px;
        margin: 0;
        height: 25px;
        width: 25px;
        display: flex;
        justify-content: center;

        .icon {
          width: 25px;
          height: 25px;
        }

        //.faCheckCircle {
        //  width: 25px;
        //  height: 25px;
        //  margin: 0 2px;
        //  background-color: green;
        //  mask: url('/apps/mainNextApp/public/asset/images/icons/circle-check-solid.svg') no-repeat center;
        //  -webkit-mask: url('/apps/mainNextApp/public/asset/images/icons/circle-check-solid.svg') no-repeat center;
        //}
        //
        //.faExclamationCircle {
        //  width: 25px;
        //  height: 25px;
        //  margin: 0 2px;
        //  background-color: blue;
        //  mask: url('/apps/mainNextApp/public/asset/images/icons/circle-exclamation-solid.svg') no-repeat center;
        //  -webkit-mask: url('/apps/mainNextApp/public/asset/images/icons/circle-exclamation-solid.svg') no-repeat center;
        //}
        //
        //.faExclamationTriangle {
        //  width: 25px;
        //  height: 25px;
        //  margin: 0 2px;
        //  background-color: red;
        //  mask: url('/apps/mainNextApp/public/asset/images/icons/triangle-exclamation-solid.svg') no-repeat center;
        //  -webkit-mask: url('/apps/mainNextApp/public/asset/images/icons/triangle-exclamation-solid.svg') no-repeat center;
        //}
      }
    }

    .alert {
      text-align: center;
      padding: 10px;
    }
  }
`

const AlertBox = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const alert = useSelector(({globalState}: Store) => globalState?.alert);

    useEffect(() => {
        if (alert.active) {
            const component = true
            setTimeout(() => {
                if (component) {
                    dispatch(closeAlert(null))
                }
            }, 3000)
        }
    }, [alert]);

    return (
        <StyledDiv className='alert-box' onClick={() => dispatch(closeAlert(null))}>
            <Draggable handle=".handle">
                <div className='alert-message'>
                    <div className='alert-message-header handle'>
                        <p className='alert-type'>
                            <SvgRenderer size={25}
                                         svgUrl={alert.type === 'success' ? '/asset/images/icons/circle-check-solid.svg' :
                                             alert.type === 'error' ? '/asset/images/icons/triangle-exclamation-solid.svg' :
                                                 '/asset/images/icons/circle-exclamation-solid.svg'}
                                         customClassName={'download-logo'}
                                         color={'var(--navigation-text-color,#ccc)'}/>
                        </p>
                        <button className='close-alert' onClick={() => dispatch(closeAlert(null))}>
                            <span className={'icon faTimes'}/>
                            <SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}
                                         size={25}
                                         customClassName={'download-logo'}
                                         color={alert.type === 'success' ? 'green' : alert.type === 'error' ? 'red' : '#ccc'}/>
                        </button>
                    </div>
                    <p className='alert'>
                        {t(`common:${alert.message}`,
                            {},
                            {
                                fallback:
                                    t(`customTranslation:${alert.message}`,
                                        {},
                                        {fallback: alert.message}
                                    )
                            }
                        )}
                    </p>
                    {/*//@ts-ignore*/}
                    {!!alert.err?.stack && <p>{alert.err?.stack}</p>}
                </div>
            </Draggable>
        </StyledDiv>
    );
};

export default AlertBox;

// {alert.type === 'success' ?
//     <span className={'icon faCheckCircle'}/> :
//     alert.type === 'error' ?
//         <span className={'icon faExclamationTriangle'}/> :
//         <span className={'icon faExclamationCircle'}/>
// }