import React, {useEffect, useMemo, useState} from 'react';
import {adminGetUsers} from "@store/adminActions/adminUserActions";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";


const users = () => {
    const dispatch = useDispatch()
    const {pathname, asPath, query} = useRouter()
    const usersData = useSelector((store: StoreTypes) => {
        return {
            users: store?.adminPanelUsers?.users,
            totalCount: store?.adminPanelUsers?.totalCount
        }
    })

    const dataConfig = useMemo(() => {
        return {
            size: query.size ? parseInt(query.size as string) : 30,
            page: query.page ? parseInt(query.page as string) : 1,
            fields: ['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt'],
            keyword: query?.keyword ?? '',
            status: query?.status ?? 'all',
            sort: query?.sort ?? 'updatedAt',
            startWith: '',
        }
    }, [pathname, asPath, query])

    useEffect(() => {
        dispatch(adminGetUsers(dataConfig))
    }, []);


    return (

        <div>

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