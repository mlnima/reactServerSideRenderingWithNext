import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPen, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {convertVariableNameToName} from "../../../../../_variables/_variables";
// import SortUpSvg from "../../../../../static/images/fontawesome/sort-up-solid.svg";
// import SortDownSvg from "../../../../../static/images/fontawesome/sort-down-solid.svg";
import Link from "next/link";


const WidgetHeaderControl = props => {

    const keyStatus = props.setKey ? {key:props.widgetId} :{}

    return (
        <div className='widget-open-control' {...keyStatus}>
            <div className='widget-open-close-button' onClick={props.onOpenHandler}>
                <FontAwesomeIcon icon={faBars} className='widget-header-handler-admin' style={{
                    transform: props.widgetSettings.open ? ' rotate(90deg)' : ' rotate(0deg)',
                }}/>
            </div>
            <div className='widget-name-index'>
                <p>{props.widgetData.name || convertVariableNameToName(props.widgetData.type)} index: {props.widgetData.widgetIndex || '0'}</p>
            </div>
            <div className='widget-open-control-group-buttons'>
                <button className='changeWidgetIndexBtn' onClick={() => props.changeWidgetIndex(false)}>
                    <FontAwesomeIcon icon={faSortUp} className='widget-header-handler-admin' />
                </button>
                <button className='changeWidgetIndexBtn' onClick={() => props.changeWidgetIndex(true)}>
                    <FontAwesomeIcon icon={faSortDown} className='widget-header-handler-admin' />
                </button>
            </div>
        </div>
    );
};
export default WidgetHeaderControl;
