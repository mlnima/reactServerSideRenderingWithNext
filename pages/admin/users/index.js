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

        return (
            <p key={ user.username }>{ user.username }</p>
        )
    })

    return (

            <div>
                { renderUsers }
            </div>

    );
};
export default users;