'use client';
import React, { FC, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { closeAlert } from '@store/reducers/globalStateReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import Csr from '@components/global/Csr';
import './AlertBox.styles.scss';

interface IProps {
    dictionary: {
        [key: string]: string;
    };
}

const AlertBox: ({ dictionary }: { dictionary: any }) => null | React.JSX.Element = ({ dictionary }) => {
    const { alert } = useAppSelector(({ globalState }) => globalState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let clearAlertTimeout: NodeJS.Timeout;
        if (!alert?.actionFunctions) {
            if (alert?.active) {
                const component = true;
                clearAlertTimeout = setTimeout(() => {
                    if (component) {
                        dispatch(closeAlert({}));
                    }
                }, 30000);
            }
        }

        return () => {
            clearTimeout(clearAlertTimeout);
        };
    }, [alert]);

    if (!alert.active) return null;

    return (
        <Csr>
            <div id="alertBox" onClick={() => dispatch(closeAlert({}))}>
                {/*<Draggable handle=".handle">*/}
                <div className="alertMessage">
                    <div className="alertMessageHeader handle">
                        <p className="alertType" onClick={() => dispatch(closeAlert({}))}>
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
                        <button className="closeAlert" onClick={() => dispatch(closeAlert({}))}>
                            <FontAwesomeIcon icon={faXmark} style={{ width: 25, height: 25 }} />
                        </button>
                    </div>
                    <p className="alert">{(!!alert?.message && dictionary?.[alert?.message]) || alert?.message}</p>
                    {/*//@ts-ignore*/}
                    {!!alert.err?.stack && <p>{alert.err?.stack}</p>}

                    <div className={'alertActionButtons'}>
                        {alert?.type === 'deleteAction' || alert?.type === 'confirmAction' ? (
                            <>
                                <button className={'btn btn-info'} onClick={() => dispatch(closeAlert({}))}>
                                    {dictionary?.['No'] || 'No'}
                                </button>
                                <button className={'btn btn-danger'} onClick={() => alert.actionFunctions()}>
                                    {alert?.type === 'deleteAction' ? dictionary?.['Delete'] || 'Delete' : dictionary?.['Yes'] || 'Yes'}
                                </button>
                            </>
                        ) : (
                            <button className={'btn btn-primary'} onClick={() => dispatch(closeAlert({}))}>
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
