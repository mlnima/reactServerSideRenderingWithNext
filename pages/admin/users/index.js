import React,{useEffect,useState,useContext} from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import {getUsersList} from "../../../_variables/ajaxAuthVariables";

const users = props => {
    const [usersList, setUsersList] = useState([]);
    useEffect(()=>{
        getUsersList().then(res=>{
            setUsersList(res.data.users)
        })
    },[]);



    const renderUsers = usersList.map(user=>{
        console.log(user )
        return(
            <p>{user.username}</p>
        )
    })
    return (
        <AdminLayout>
        <div>
            {renderUsers}
        </div>
        </AdminLayout>
    );
};
export default users;