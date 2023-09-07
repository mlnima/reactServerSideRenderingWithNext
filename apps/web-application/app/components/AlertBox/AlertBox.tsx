'use client';
import React, {FC, useEffect} from 'react';
import Draggable from 'react-draggable';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {closeAlert} from "@store/reducers/globalStateReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import Csr from "@components/global/Csr";
import './AlertBox.styles.scss'

interface IProps {
    dictionary: {
        [key: string]: string
    }
}

const AlertBox: FC<IProps> = ({dictionary}) => {

    const {alert} = useAppSelector(({globalState}) => globalState)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (alert?.active) {
            const component = true
            setTimeout(() => {
                if (component) {
                    dispatch(closeAlert({}))
                }
            }, 5000)
        }
    }, [alert]);


    if (!alert.active) return null

    return (
        <Csr>
        <div id='alertBox' onClick={() => dispatch(closeAlert({}))}>
            <Draggable handle=".handle">
                <div className='alertMessage'>
                    <div className='alertMessageHeader handle'>
                        <p className='alertType'>
                            <FontAwesomeIcon
                                icon={alert.type === 'success' ? faCircleCheck :
                                    alert.type === 'error' ? faTriangleExclamation :
                                        faCircleExclamation}
                                style={{
                                    width: 25,
                                    height: 25,
                                    color: alert.type === 'success' ? 'green' :
                                        alert.type === 'error' ? 'red' :
                                            'yellow'
                                }}/>

                        </p>
                        <button className='closeAlert' onClick={() => dispatch(closeAlert({}))}>
                            <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
                        </button>
                    </div>
                    <p className='alert'>
                        {!!alert?.message && dictionary?.[alert?.message] || alert?.message}
                    </p>
                    {/*//@ts-ignore*/}
                    {!!alert.err?.stack && <p>{alert.err?.stack}</p>}
                </div>
            </Draggable>
        </div>
        </Csr>
    );

};

export default AlertBox;

