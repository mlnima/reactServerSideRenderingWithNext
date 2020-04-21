import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import { getUsersList, getUsersListAsAdmin } from "../../../_variables/ajaxAuthVariables";

const users = props => {
    const [ usersList, setUsersList ] = useState([]);

    useEffect(() => {
        getUsersListAsAdmin().then(res => {
            setUsersList(res.data.users)
        })
    }, []);

    const renderUsers = usersList.map(user => {
        console.log(user)
        return (
            <p key={ user.username }>{ user.username }</p>
        )
    })

    return (
        <AdminLayout>
            <div>
                { renderUsers }
            </div>
        </AdminLayout>
    );
};
export default users;