'use client';
import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { DashboardStore } from "@repo/typescript-types";
import { useAppDispatch } from "@storeDashboard/hooks";
import { terminalCommandExecutor } from "@storeDashboard/reducers/terminalReducer";
import './TerminalPage.scss';


const TerminalPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const logElement = useRef(null);
    const processIdElement = useRef(null);

    const terminalData = useSelector(({ terminal }: DashboardStore) => ({
        logs: terminal?.logs,
        commandsHistory: terminal?.commandsHistory,
    }));

    const [state, setState] = useState({
        command: 'dir',
        log: ''
    });

    const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const onExecutorHandler = (e: React.FormEvent, command: string): void => {
        e.preventDefault();
        dispatch(terminalCommandExecutor(command));
    };

    return (
        <div className='terminalPage'>
            <h2> Terminal :</h2>
            <div className='quickAccess'>
                <h3>Quick Access</h3>
                <button className={'btn btn-primary'} onClick={e => onExecutorHandler(e, 'npm run-script build')}>
                    Build
                </button>
                {/*{process.env.NODE_ENV !== 'development' ?*/}
                {/*    <button className={'btn btn-primary'}*/}
                {/*            onClick={e => onExecutorHandler(e, `chmod +x update.sh && ./update.sh && pm2 restart ${processIdElement?.current.value || 'all'}`)}>*/}
                {/*        Update*/}
                {/*    </button>*/}
                {/*    : null*/}
                {/*}*/}
                {/*<button className={'btn btn-primary'}*/}
                {/*        onClick={e => onExecutorHandler(e, `pm2 restart ${processIdElement?.current ? processIdElement?.current.value : 'all'}`)}>*/}
                {/*    Restart Webserver*/}
                {/*</button>*/}
                <input ref={processIdElement} className={'primaryInput process-id'} type="text" name={'processId'}
                       placeholder={'process ID or Name'}/>
            </div>
            <textarea ref={logElement}
                      id='terminalLog'
                      value={terminalData.logs.join('/n')}
                      onChange={(e) => e.currentTarget.scrollTop = e.currentTarget.offsetHeight} />
            <form className="terminalControl" onSubmit={e => onExecutorHandler(e, state?.command)}>
                <input name='command' type="text" onChange={e => onchangeHandler(e)} />
                <button type='submit'>EXE</button>
            </form>
        </div>
    );
};

export default TerminalPage;