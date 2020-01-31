import React,{useEffect,useState,useContext} from 'react';
import './SideBar.scss'
import { AppContext } from "../../../context/AppContext";
import Link from "next/link";
const SideBar = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
if (contextData.settings.adminPanelSideBar){
    return (
        <div className='SideBar'>
            <Link href='/admin/posts'><a className='SideBarItem'>Posts</a></Link>
            <Link href='/admin/media'><a className='SideBarItem'>Media</a></Link>
            <Link href='/admin/psges'><a className='SideBarItem'>Pages</a></Link>
            <Link href='/admin/comments'><a className='SideBarItem'>Comments</a></Link>
            <Link href='/admin/feedback'><a className='SideBarItem'>Feedback</a></Link>
            <Link href='/admin/design'><a className='SideBarItem'>Design</a></Link>
            <Link href='/admin/plugins'><a className='SideBarItem'>Plugins</a></Link>
            <Link href='/admin/users'><a className='SideBarItem'>Users</a></Link>
            <Link href='/admin/setting'><a className='SideBarItem'>Settings</a></Link>
        </div>
    );
}else return null
};
export default SideBar;