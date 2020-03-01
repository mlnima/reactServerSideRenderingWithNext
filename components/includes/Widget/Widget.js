import React,{useEffect,useState,useContext} from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";

const Widget = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='Widget'>
             <WidgetHeader {...props}/>
             <props.component  {...props}/>
             <WidgetFooter  {...props}/>
        </div>
    );
};
export default Widget;