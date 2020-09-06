import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import './Console.scss';
import {adminConsoleOpenCloseHandler} from "../../../../_variables/_variables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {updateSetting} from "../../../../_variables/ajaxVariables";
import {useRouter} from "next/router";
const Console = props => {
    const router = useRouter()
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        command: '',
        results: '',
        lastCommands:[]
    });

    const designChange = (key, value)=>{
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        const newDesignData = {
            ...contextData.siteDesign,
            [key]:value
        }

        updateSetting('design', newDesignData).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })

    }

    const identityChange = (key, value)=>{
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        const newDesignData = {
            ...contextData.siteIdentity,
            [key]:value
        }

        updateSetting('identity', newDesignData).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })

    }







    const onSubmitHandler = e => {
        e.preventDefault()

        switch (state.command) {
            case '':
                break;
            case 'close':
                adminConsoleOpenCloseHandler(contextData.userData, contextData.state, contextData.dispatchState);
                break;
            case 'clear cache':
                contextData.functions.clearCaches().then(() => router.reload());
                break;
            case 'design -h':
                setState({
                    ...state,
                    results: state.results += JSON.stringify(contextData.siteDesign)
                })
                break;
            case 'identity -h':
                setState({
                    ...state,
                    results: state.results += JSON.stringify(contextData.siteIdentity)
                })
                break;
            default:
               const splitCommand = state.command.split(' ')
                if (splitCommand.length>2){
                    switch (splitCommand[0]) {
                        case 'design':
                            designChange(splitCommand[1],splitCommand[2])
                        case 'identity':
                            identityChange(splitCommand[1],splitCommand[2])
                        default:
                            break;
                    }
                }else break

        }
        setState({
            ...state,
            results: state.results + '\n' + state.command,
            lastCommands:[...state.lastCommands,state.command],
            command : '',
        })
    }

    const onChangeHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    if (contextData.state.console) {
        return (
            <div id='console' onKeyDown={e => e.keyCode === 192 ? adminConsoleOpenCloseHandler(contextData.userData, contextData.state, contextData.dispatchState) : null}>
                <div className="console-panel">
                    <div className='console-header'>
                        <p>Console</p>
                        <button onClick={() => adminConsoleOpenCloseHandler(contextData.userData, contextData.state, contextData.dispatchState)}><FontAwesomeIcon icon={faTimes}
                                                                                                                                                                  className='admin-tools-item-logo'/>
                        </button>
                    </div>
                    <textarea value={state.results}/>
                    <form onSubmit={e => onSubmitHandler(e)}>
                        <input onChange={e => onChangeHandler(e)} value={state.command} name='command' type="text" onKeyDown={e=>e.keyCode === 38 ? e.target.value = state.lastCommands[state.lastCommands.length -1]:null}/>
                    </form>
                </div>
            </div>
        );
    } else return null

};
export default Console;
