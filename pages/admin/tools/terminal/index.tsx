import React, {useState, useRef, useEffect} from 'react';
import {animateScroll} from 'react-scroll'
import styled from "styled-components";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {terminalCommandExecutor} from "@store/adminActions/adminTerminalActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

let StyledDiv = styled.div`
  .quickAccess {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .process-id {
      width: 100px;
    }

    button {
      margin-left: 20px;
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

const terminal = () => {
    const dispatch = useDispatch()
    const logElement = useRef(null)
    const processIdElement = useRef(null)
    const terminalData = useSelector(({adminPanelTerminalState}: StoreTypes) => {
        return{
            logs:adminPanelTerminalState?.logs,
            commandsHistory:adminPanelTerminalState?.commandsHistory,
        }
    })

    const [state, setState] = useState({
        command: 'dir',
        log: ''
    });

    const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onExecutorHandler = (e, command) => {
        e.preventDefault()
        dispatch(setLoading(true))
        dispatch(terminalCommandExecutor(command))
        setTimeout(() => {
            animateScroll.scrollToBottom({containerId: 'terminalLog'})
        }, 500)
    }

    return (
        <StyledDiv className='terminal-simulator'>
            <h2> Terminal :</h2>
            <div className='quickAccess'>
                <h3>Quick Access</h3>
                <button className={'btn btn-primary'} onClick={e => onExecutorHandler(e, 'npm run-script build')}>
                    Build
                </button>
                <button className={'btn btn-primary'}
                        onClick={e => onExecutorHandler(e, `chmod +x update.sh && ./update.sh && pm2 restart ${processIdElement?.current.value || 'all'}`)}>
                    Update
                </button>
                <button className={'btn btn-primary'}
                        onClick={e => onExecutorHandler(e, `pm2 restart ${processIdElement?.current.value || 'all'}`)}>
                    Restart Webserver
                </button>
                <input ref={processIdElement} className={'form-control-input process-id'} type="text" name={'processId'}
                       placeholder={'process ID or Name'}/>
            </div>
            <textarea ref={logElement}
                      id='terminalLog'
                      value={terminalData.logs.join('/n')}
                      // @ts-ignore
                      onChange={e => e.scrollTop = e.offsetHeight}/>
            <form className="terminalControl" onSubmit={e => onExecutorHandler(e, state?.command)}>
                <input name='command' type="text" onChange={e => onchangeHandler(e)}/>
                <button type='submit'>EXE</button>
            </form>
        </StyledDiv>

    );
};
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default terminal;
