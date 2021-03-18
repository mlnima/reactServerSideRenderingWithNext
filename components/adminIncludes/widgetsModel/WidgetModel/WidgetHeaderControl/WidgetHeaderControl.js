import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPen, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {convertVariableNameToName} from "../../../../../_variables/_variables";
// import SortUpSvg from "../../../../../static/images/fontawesome/sort-up-solid.svg";
// import SortDownSvg from "../../../../../static/images/fontawesome/sort-down-solid.svg";
import Link from "next/link";
import './WidgetHeaderControl.scss'

const WidgetHeaderControl = props => {

    const keyStatus = props.setKey ? {key:props.widgetId} :{}

    return (
        <div className='widget-open-control' {...keyStatus}>
            <p onClick={props.onOpenHandler} className='widget-open-control-group'><FontAwesomeIcon icon={faBars} className='widget-header-handler-admin' style={{
                transform: props.widgetSettings.open ? ' rotate(90deg)' : ' rotate(0deg)',
            }}/> {props.widgetData.name || convertVariableNameToName(props.widgetData.type)} index: {props.widgetData.widgetIndex || '0'}</p>
            <div className='widget-open-control-group'>
                <button className='changeWidgetIndexBtn' onClick={() => props.changeWidgetIndex(false)}>
                    <FontAwesomeIcon icon={faSortUp} className='widget-header-handler-admin' />
                </button>
                <button className='changeWidgetIndexBtn' onClick={() => props.changeWidgetIndex(true)}>
                    <FontAwesomeIcon icon={faSortDown} className='widget-header-handler-admin' />
                </button>
                <Link href={{pathname: '/admin/design/widgets/widget', query: {id: props.widgetId}}}>
                    <a className='widget-open-control-page'>
                        <FontAwesomeIcon icon={faPen} className='widget-header-handler-admin' />
                    </a>
                </Link>
            </div>
        </div>
    );
};
export default WidgetHeaderControl;
