import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import Draggable from 'react-draggable';
import useTranslation from 'next-translate/useTranslation'
import {useAppDispatch} from "@store_toolkit/hooks";
import {closeAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-text-color,#fff);
  background-color: rgba(0,0,0,.6);
  z-index: 1010;

  .alert-message {
    min-width: 300px;
    max-width: 600px;
    background-color: var(--secondary-background-color, #181818);
    padding: 0;
    border-radius: 5px;

    .alert-message-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px 5px 0 0;
      padding: 5px 0;

      .close-alert {
        color: var(--primary-text-color,#fff);
        background-color: transparent;
        border: none;
        height: 25px;
        width: 40px;
        display: flex;
        justify-content: center;
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
        
      }
    }

    .alert {
      text-align: center;
      padding: 10px;
    }
  }
`

interface PropTypes{
    alert:any
}
const AlertBox:FC<PropTypes> = ({alert,}) => {
    const {t} = useTranslation('common customTranslation');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (alert?.active) {
            const component = true
            setTimeout(() => {
                if (component) {
                    dispatch(closeAlert(null))
                }
            }, 3000)
        }
    }, [alert]);

    if (alert?.active){
        return (
            <StyledDiv className='alert-box' onClick={() =>  dispatch(closeAlert(null))}>
                <Draggable handle=".handle">
                    <div className='alert-message'>
                        <div className='alert-message-header handle'>
                            <p className='alert-type'>
                                <FontAwesomeIcon icon={
                                    alert.type === 'success' ? faCircleCheck :
                                        alert.type === 'error'? faTriangleExclamation :
                                            faCircleExclamation
                                } style={
                                    {
                                        width:25,
                                        height:25,
                                        color:  alert.type === 'success' ? 'green' :
                                            alert.type === 'error'? 'red' :
                                                'yellow'
                                    }
                                }/>

                            </p>
                            <button className='close-alert' onClick={() =>  dispatch(closeAlert(null))}>
                                <span className={'icon faTimes'}/>
                                <FontAwesomeIcon icon={faXmark} style={{width:25,height:25}}/>
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
    }else return null

};

export default AlertBox;

