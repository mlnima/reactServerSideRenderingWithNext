import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import { AppContext } from '../../../../context/AppContext'
import { executor } from '../../../../_variables/ajaxVariables'
import { animateScroll } from 'react-scroll'
import styled from "styled-components";
let StyledDiv = styled.div`
  .quickAccess {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .quickAccessBtn {
      
   
      padding: 10px 20px;
      border-radius: 5px;
      margin: 0 10px;
    }
  }

  .terminalControl {
    display: flex;
    justify-content: space-between;

    width: 95%;

    input {
      background-color: black;
      color: white;
      width: 95%;
    }

    button {
      background-color: black;
      color: yellow;
      border: none;
    }
  }

  #terminalLog {
    width: 95%;
    min-height: 50vh;
    background-color: black;
    color: #916d07;
    margin-top: 40px;
    overflow: scroll;
  }
`

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

            <StyledDiv className='terminal-simulator'>
                <h2> Terminal :</h2>
                <div className='quickAccess'>
                    <h3>Quick Access</h3>
                    <button className='quickAccessBtn' onClick={e=>onExecutorHandler(e,'npm run-script build')}>Build</button>
                    <button className='quickAccessBtn' onClick={e=>onExecutorHandler(e,'chmod +x update.sh')}>Permission To Updater</button>
                    <button className='quickAccessBtn' onClick={e=>onExecutorHandler(e,'./update.sh')}>Update</button>
                    <button className='quickAccessBtn' onClick={e=>onExecutorHandler(e,'pm2 restart all')}>Restart Webserver</button>

                    {/*<button className='quickAccessBtn' onClick={e=>onExecutorHandler(e,'chmod +x update.sh ; ./update.sh ; pm2 restart all')}>Update Build RestartServer</button>*/}
                </div>
                <textarea ref={logElement} id='terminalLog' value={state.log} onChange={e=>e.scrollTop = e.offsetHeight} />
                <form className="terminalControl" onSubmit={e=>onExecutorHandler(e,state.command)}>
                    <input name='command' type="text" onChange={ e => onchangeHandler(e) }/>
                    <button type='submit'>EXE</button>
                </form>
            </StyledDiv>

    );
};
export default terminal;
