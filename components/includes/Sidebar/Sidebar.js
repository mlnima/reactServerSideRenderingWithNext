import React,{useEffect} from 'react';
import WidgetsRenderer from '../WidgetsRenderer/WidgetsRenderer'
import './Sidebar.scss'

const Sidebar = props => {
console.log(props.position)
    if (props.isActive) {
        return (
            <div className='site-sidebar'  key={props.position} >
                <WidgetsRenderer {...props} />
            </div>
        );
    } else return null;
};


export default Sidebar;