import React,{useEffect,useState,useContext} from 'react';
import Link from "next/link";
import AdminLayout from "../../../components/layouts/AdminLayout";

const settings = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <AdminLayout>
        <div id='settings'>
            <Link href='/admin/settings/general'><a className='settings-page-item'>General Setting</a></Link>
            <Link href='/admin/settings/navigation'><a className='settings-page-item'>Navigation Setting</a></Link>
            <Link href='/admin/settings/widgets'><a className='settings-page-item'>Widgets</a></Link>
        </div>
        </AdminLayout>
    );
};
export default settings;