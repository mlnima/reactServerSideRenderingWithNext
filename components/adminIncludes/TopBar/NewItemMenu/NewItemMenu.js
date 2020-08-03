import React,{useEffect,useState,useContext} from 'react';
import Link from "next/link";
const NewItemMenu = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    if (props.active){
        return (
            <div className='NewItemMenu'>
                <Link href='/admin/post?new=1'><a className='SideBarItem adminTopBarItem'>New Post</a></Link>
            </div>
        );
    }else return null


};
export default NewItemMenu;