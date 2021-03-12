import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext'

const AlertBox = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);


    const RenderAlertLogo = ()=>{
       return  contextData.alert.type === 'error' ? 'X':
               contextData.alert.type === 'info' ? '!':
                   null
    }


    const onCloseHandler = ()=>{
        contextData.dispatchAlert({
            ...contextData.alert,
            active: false,
            alertMessage: '',
            type: ''
        })
    }

        return (
            <div className='alert-box'>
                <button className='close-alert' onClick={()=>onCloseHandler()}>X</button>
               <div className='alert-message'>
                   <p>{contextData.alert.type}:</p>
                   <p className='alert'>{contextData.alert.alertMessage}</p>
               </div>
            </div>
        );

};
export default AlertBox;
