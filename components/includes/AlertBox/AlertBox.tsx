import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import {closeAlert, setAlert} from "@store/clientActions/globalStateActions";
import Draggable from 'react-draggable';
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useTranslation} from 'next-i18next';

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

        .faTimes{
          width: 25px;
          height: 25px;
          margin: 0 2px;
          background-color: var(--post-element-info-text-color, #ccc);
          mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
        }
      }

      .alert-type {
        padding: 0 10px;
        margin: 0;
        height: 25px;
        width: 25px;
        display: flex;
        justify-content: center;
        
        .icon{
          width: 25px;
          height: 25px;
        }
        
        .faCheckCircle{
          width: 25px;
          height: 25px;
          margin: 0 2px;
          background-color: green;
          mask: url('/public/asset/images/icons/circle-check-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/circle-check-solid.svg') no-repeat center;
        }        
        .faExclamationCircle{
          width: 25px;
          height: 25px;
          margin: 0 2px;
          background-color: blue;
          mask: url('/public/asset/images/icons/circle-exclamation-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/circle-exclamation-solid.svg') no-repeat center;
        }       
        .faExclamationTriangle{
          width: 25px;
          height: 25px;
          margin: 0 2px;
          background-color: red;
          mask: url('/public/asset/images/icons/triangle-exclamation-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/triangle-exclamation-solid.svg') no-repeat center;
        }
      }
    }

    .alert {
      text-align: center;
      padding: 10px;
    }
  }
`

const AlertBox = () => {
    const {t} = useTranslation(['common', 'customTranslation', 'profile']);
    const dispatch = useDispatch();
    const alert = useSelector((store: StoreTypes) => store?.globalState?.alert);

    useEffect(() => {
        if (alert.active) {
            const component = true
            setTimeout(() => {
                if (component) {
                    dispatch(setAlert({message: null, type: null, active: false}))
                }
            }, 3000)
        }
    }, [alert]);

    return (
        <StyledDiv className='alert-box' onClick={() => dispatch(closeAlert())}>
            {/*//@ts-ignore*/}
            <Draggable handle=".alert-message-header">
                <div className='alert-message'>
                    <div className='alert-message-header'>
                        <p className='alert-type'>
                            {alert.type === 'success' ?
                                <span className={'icon faCheckCircle'}/> :
                                alert.type === 'error' ?
                                    <span className={'icon faExclamationTriangle'}/> :
                                    <span className={'icon faExclamationCircle'}/>
                            }
                        </p>
                        <button className='close-alert' onClick={() => dispatch(closeAlert())}>
                            <span className={'icon faTimes'}/>

                        </button>
                    </div>
                    <p className='alert'>
                        {/*//@ts-ignore*/}
                        {t([t(alert.message, {ns: 'common'}), t(alert.message, {ns: 'profile'})])}
                    </p>
                    <p>{alert.err?.stack}</p>
                </div>
            </Draggable>
        </StyledDiv>

    );

};
export default AlertBox;

// {/*{alert.type === 'success' ?*/}
// {/*    <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green'}}/> :*/}
// {/*    alert.type === 'error' ?*/}
// {/*        <FontAwesomeIcon icon={faExclamationTriangle} style={{color: 'red'}}/> :*/}
// {/*        <FontAwesomeIcon icon={faExclamationCircle} style={{color: 'blue'}}/>*/}
// {/*}*/}
// {/*<FontAwesomeIcon icon={faTimes}/>*/}