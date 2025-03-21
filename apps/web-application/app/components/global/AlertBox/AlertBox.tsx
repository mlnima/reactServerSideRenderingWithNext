'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { closeAlert } from '@store/reducers/globalStateReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import Csr from '@components/global/Csr';
import './AlertBox.scss';

interface IProps {
    dictionary: {
        [key: string]: string;
    };
}

const AlertBox: ({ dictionary }: IProps) => null | React.JSX.Element = ({ dictionary }) => {
    const { alert } = useAppSelector(({ globalState }) => globalState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let clearAlertTimeout:ReturnType<typeof setTimeout> | null = null;

        if (!alert?.actionFunctions) {
            if (alert?.active) {
                const component = true;
                clearAlertTimeout = setTimeout(() => {
                    if (component) {
                        dispatch(closeAlert(null));
                    }
                }, 30000);
            }
        }

        return () => {
            if (clearAlertTimeout){
                clearTimeout(clearAlertTimeout);
            }
        };
    }, [alert]);

    const onClickHandler = ()=>{
        if (alert?.actionFunctions){

            alert.actionFunctions()
        }
    }

    if (!alert.active) return null;

    return (
        <Csr>
            <div id="alertBox" onClick={() => dispatch(closeAlert(null))}>
                {/*<Draggable handle=".handle">*/}
                <div className="alertMessage">
                    <div className="alertMessageHeader handle">
                        <p className="alertType" onClick={() => dispatch(closeAlert(null))}>
                            <FontAwesomeIcon
                                icon={
                                    alert.type === 'success'
                                        ? faCircleCheck
                                        : alert.type === 'error'
                                          ? faTriangleExclamation
                                          : faCircleExclamation
                                }
                                style={{
                                    width: 25,
                                    height: 25,
                                    color: alert.type === 'success' ? 'green' : alert.type === 'error' ? 'red' : 'yellow',
                                }}
                            />
                        </p>
                        <button className="closeAlert" onClick={() => dispatch(closeAlert(null))}>
                            <FontAwesomeIcon icon={faXmark} style={{ width: 25, height: 25 }} />
                        </button>
                    </div>
                    <p className="alert">{(!!alert?.message && dictionary?.[alert?.message]) || alert?.message}</p>

                    {/*{!!alert.err?.stack && <p>{alert.err?.stack}</p>}*/}

                    <div className={'alertActionButtons'}>
                        {alert?.type === 'deleteAction' || alert?.type === 'confirmAction' ? (
                            <>
                                <button className={'btn btn-info'} onClick={() => dispatch(closeAlert(null))}>
                                    {dictionary?.['No'] || 'No'}
                                </button>
                                <button className={'btn btn-danger'} onClick={onClickHandler}>
                                    {alert?.type === 'deleteAction' ? dictionary?.['Delete'] || 'Delete' : dictionary?.['Yes'] || 'Yes'}
                                </button>
                            </>
                        ) : (
                            <button className={'btn btn-primary'} onClick={() => dispatch(closeAlert(null))}>
                                {dictionary?.['Ok'] || 'Ok'}
                            </button>
                        )}
                    </div>

                    {/*{!!alert?.actionFunctions &&*/}
                    {/*<div className={'alertActionButtons'}>*/}
                    {/*    <button className={'btn btn-info'} onClick={()=> dispatch(closeAlert({}))}>*/}
                    {/*        {dictionary?.['No'] ||'No'}*/}
                    {/*    </button>*/}
                    {/*    <button className={'btn btn-danger'} onClick={()=>alert.actionFunctions()}>*/}
                    {/*        {dictionary?.['Delete'] ||'Delete'}*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    {/*}*/}
                </div>
            </div>
        </Csr>
    );
};

export default AlertBox;
