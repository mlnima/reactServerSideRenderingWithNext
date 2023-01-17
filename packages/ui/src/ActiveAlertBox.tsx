import styled from "styled-components";
import React, {FC} from "react";

const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-text-color, #fff);
  background-color: rgba(0,0,0,.6);
  z-index: 1010;

  .alert-message {
    min-width: 300px;
    max-width: 600px;
    background-color: var(--secondary-background-color, #181818);
    padding: 0;
    border-radius: 5px;

    .alert-message-header {
      background-color: var( --main-text-color, #fff);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px 5px 0 0;
      padding: 5px 0;

      .close-alert {
        color: var(--main-text-color, #fff);;
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
    alert:any,
    closeAlert:Function
}

const ActiveAlertBox:FC<PropTypes> = ({alert,closeAlert}) => {
    return(
        <Style className='alert-box' onClick={() =>closeAlert()}>
            <div className='alert-message'>
                <div className='alert-message-header handle'>
                    <p className='alert-type'>
                        {/*<SvgRenderer size={25}*/}
                        {/*             svgUrl={alert.type === 'success' ? '/asset/images/icons/circle-check-solid.svg' :*/}
                        {/*                 alert.type === 'error' ? '/asset/images/icons/triangle-exclamation-solid.svg' :*/}
                        {/*                     '/asset/images/icons/circle-exclamation-solid.svg'}*/}
                        {/*             customClassName={'download-logo'}*/}
                        {/*             color={'var(--main-text-color, #fff)'}/>*/}
                        {alert.type === 'success' ? 'OK' : alert.type === 'error' ? 'X' : '!' }
                    </p>
                    <button className='close-alert' onClick={() => closeAlert()}>
                        <span className={'icon faTimes'}/>
                        {/*<SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}*/}
                        {/*             size={25}*/}
                        {/*             customClassName={'download-logo'}*/}
                        {/*             color={alert.type === 'success' ? 'green' : alert.type === 'error' ? 'red' : '#ccc'}/>*/}
                        X
                    </button>
                </div>
                <p className='alert'>
                    {/*{t(`common:${alert.message}`,*/}
                    {/*    {},*/}
                    {/*    {*/}
                    {/*        fallback:*/}
                    {/*            t(`customTranslation:${alert.message}`,*/}
                    {/*                {},*/}
                    {/*                {fallback: alert.message}*/}
                    {/*            )*/}
                    {/*    }*/}
                    {/*)}*/}
                    {alert.message}
                </p>
                {/*//@ts-ignore*/}
                {!!alert.err?.stack && <p>{alert.err?.stack}</p>}
            </div>
        </Style>
    )
}

export default ActiveAlertBox