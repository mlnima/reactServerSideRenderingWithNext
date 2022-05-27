import React, {useEffect, useMemo} from 'react';
import {useRouter} from "next/router";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import {fetchAdminPanelUsers} from "@store_toolkit/adminReducers/adminPanelUsersReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";

const users = () => {
    const dispatch = useAdminDispatch()
    const {pathname, asPath, query} = useRouter()
    // const usersData = useSelector((store: StoreTypes) => {
    //     return {
    //         users: store?.adminPanelUsers?.users,
    //         totalCount: store?.adminPanelUsers?.totalCount
    //     }
    // })

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
        dispatch(fetchAdminPanelUsers(dataConfig))
    }, []);


    return (

        <div>

        </div>

    );
};


users.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default users;