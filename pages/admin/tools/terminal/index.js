import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import { AppContext } from '../../../../context/AppContext'
import { executor } from '../../../../_variables/ajaxVariables'
import { animateScroll } from 'react-scroll'
import './terminal.scss'

const terminal = props => {
    const contextData = useContext(AppContext);
    const logElement = useRef(null)
    const [ state, setState ] = useState({
        command: 'dir',
        log:''
    });

    const onchangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onExecutorHandler = (e,command)=>{
        e.preventDefault()
        contextData.dispatchState({
            ...state,
            loading:true
        })
        executor(command).then(res=>{
            setState({
                ...state,
                log: state.log  + res.data.response
            })
            contextData.dispatchState({
                ...state,
                loading:false
            })
        }).catch(err=>{
            console.log( err)
            contextData.dispatchState({
                ...state,
                loading:false
            })
        })
        setTimeout(()=>{
            animateScroll.scrollToBottom({containerId: 'terminalLog'})
        },500)

    }

    return (
        <AdminLayout>
            <div className='terminal-simulator'>
                <h2> Terminal :</h2>
                <div className='quickAccess'>
                    <h3>Quick Access</h3>
                    <button className='quickAccessBtn' onClick={e=>onExecutorHandler(e,'npm run-script build')}>Build</button>
                </div>
                <textarea ref={logElement} id='terminalLog' value={state.log} onChange={e=>e.scrollTop = e.offsetHeight} />
                <form className="terminalControl" onSubmit={e=>onExecutorHandler(e,state.command)}>
                    <input name='command' type="text" onChange={ e => onchangeHandler(e) }/>
                    <button type='submit'>EXE</button>
                </form>
            </div>
        </AdminLayout>
    );
};
export default terminal;
