import React, { useEffect, useState, useContext } from 'react';
import { getUsersList, getUsersListAsAdmin } from "../../../_variables/ajaxAuthVariables";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const users = () => {
    const [ usersList, setUsersList ] = useState([]);

    useEffect(() => {
        getUsersListAsAdmin().then(res => {
            // @ts-ignore
            setUsersList(res.data.users)
        })
    }, []);

    const renderUsers = usersList.map(user => {

        return (
            <p
                // @ts-ignore
                key={ user.username }>{ user.username }
            </p>
        )
    })

    return (

            <div>
                { renderUsers }
            </div>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default users;