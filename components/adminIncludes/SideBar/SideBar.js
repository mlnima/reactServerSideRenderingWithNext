import React,{useEffect,useState,useContext} from 'react';
import './SideBar.scss'
import { AppContext } from "../../../context/AppContext";
const SideBar = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
if (contextData.settings.adminPanelSideBar){
    return (
        <div className='SideBar'>
            i am side bar
        </div>
    );
}else return null
};
export default SideBar;