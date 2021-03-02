import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faEraser, faTerminal, faUserShield} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useRouter} from "next/router";
import {adminConsoleOpenCloseHandler} from "../../../_variables/_variables";

const AdminTools = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        open: false,
        console: false
    });

    if (contextData.userData.role === 'administrator') {
        if (state.open) {
            return (
                <div className='admin-tools' onKeyDown={e => e.keyCode === 192 ? adminConsoleOpenCloseHandler(contextData.userData,contextData.state,contextData.dispatchState) : null}>
                    <button className='admin-tools-item' onClick={() => state.open ? setState({...state, open: false}) : setState({...state, open: true})}>
                        <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                    </button>
                    <Link href='/admin'>
                        <a className='admin-tools-item' style={state.colorsStyle}>
                            <FontAwesomeIcon icon={faUserShield} className='admin-tools-item-logo'/>
                        </a>
                    </Link>
                    <p className='admin-tools-item' style={state.colorsStyle} onClick={() => contextData.functions.clearCaches().then(() => router.reload())}>
                        <FontAwesomeIcon icon={faEraser} className='admin-tools-item-logo'/>
                    </p>
                    <p className='admin-tools-item' style={state.colorsStyle} onClick={() => adminConsoleOpenCloseHandler(contextData.userData,contextData.state,contextData.dispatchState)}>
                        <FontAwesomeIcon icon={faTerminal} className='admin-tools-item-logo'/>
                    </p>
                </div>
            );
        } else {
            return (
                <div className='admin-tools'>
                    <button className='admin-tools-item' onClick={() => state.open ? setState({...state, open: false}) : setState({...state, open: true})}>
                        <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                    </button>
                </div>

            )
        }

    } else return null

};
export default AdminTools;
