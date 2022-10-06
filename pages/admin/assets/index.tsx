import React, {useEffect, useMemo, useState} from 'react';
import dynamic from 'next/dynamic'
import {useRouter} from "next/router";
import _adminGetPostsQueryGenerator from "@_variables/adminVariables/_adminGetPostsQueryGenerator";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {fetchAdminPanelMetas, fetchAdminPanelPosts} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import {fetchAdminForms} from "@store_toolkit/adminReducers/adminPanelFormsReducer";
import {fetchAdminPanelPages} from "@store_toolkit/adminReducers/adminPanelPagesReducer";
import {fetchAdminPanelUsers} from "@store_toolkit/adminReducers/adminPanelUsersReducer";
import {fetchAdminPanelGetComments} from "@store_toolkit/adminReducers/adminCommentsReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import _adminMetaPageQueryGenerator from "@_variables/adminVariables/_adminMetaPageQueryGenerator";

const TableHeader = dynamic(
    () => import('@components/adminIncludes/assetComponents/TableHeader/TableHeader'),
    {ssr: false}
)
const TableBody = dynamic(
    () => import('@components/adminIncludes/assetComponents/TableBody/TableBody'),
    {ssr: false}
)
const TableControls = dynamic(
    () => import('@components/adminIncludes/assetComponents/TableControls/TableControls'),
    {ssr: false}
)


const AdminAssetPageStyledDiv = styled.div`

`
const assets = () => {
    const {query, pathname, asPath} = useRouter()
    const dispatch = useAdminDispatch()


    const assetPageData = useSelector((
        {
            adminPanelPosts,
            adminPanelUsers,
            adminPanelComments,
            adminPanelForms,
            adminPanelPages,
            adminPanelOrders,
        }: Store) => {
        return {
            totalCount: adminPanelPosts?.totalCount || adminPanelUsers?.totalCount,
            posts: adminPanelPosts?.posts,
            users: adminPanelUsers?.users,
            comments: adminPanelComments?.comments,
            forms: adminPanelForms?.forms,
            pages: adminPanelPages?.pages,
            metas: adminPanelPosts?.metas,
            // identity:store.settings.identity,
            orders: adminPanelOrders?.orders
        }
    })

    const [selectedItems, setSelectedItems] = useState([]);

    const dataConfig = useMemo(() => {
        return {
            size: query.size ? parseInt(query.size as string) : 30,
            page: query.page ? parseInt(query.page as string) : 1,
            postType: query?.postType ?? null,
            fields: ['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt'],
            keyword: query?.keyword ?? '',
            author: query?.author ?? 'all',
            status: query?.status ?? 'all',
            sort: query?.sort ?? 'updatedAt',
            content: query?.content ?? 'all',
            metaType: query?.metaType || null,
            orderType: query?.orderType ?? 'all',
            metaId: query?.metaId || null,
            searchForImageIn: query?.type,
            startWith: '',
        }
    }, [query, pathname, asPath])


    const getData = () => {
        const assetType = query.assetsType
        if (assetType === 'posts') {
            const gettingPostsQueries = _adminGetPostsQueryGenerator(query)
            dispatch(fetchAdminPanelPosts(gettingPostsQueries))
        } else if (assetType === 'users') {
            dispatch(fetchAdminPanelUsers({}))
        } else if (assetType === 'metas') {
            const queries = _adminMetaPageQueryGenerator(query, query?.metaType)
            dispatch(fetchAdminPanelMetas(queries))
        } else if (assetType === 'comments') {
            dispatch(fetchAdminPanelGetComments(dataConfig))
        } else if (assetType === 'forms') {
            dispatch(fetchAdminForms(dataConfig))
        } else if (assetType === 'pages') {
            dispatch(fetchAdminPanelPages(dataConfig))
        } else if (assetType === 'orders') {
            // dispatch(adminGetOrders(dataConfig))
        }
    }

    useEffect(() => {
        getData()
    }, [dataConfig]);

    return (
        <AdminAssetPageStyledDiv className='admin-asset-page'>

            <TableControls assetPageData={assetPageData}
                           selectedItems={selectedItems}
                           setSelectedItems={setSelectedItems}
            />

            <TableHeader selectedItems={selectedItems}
                         setSelectedItems={setSelectedItems}
                         assetPageData={assetPageData}
            />
            <TableBody assetPageData={assetPageData}
                       selectedItems={selectedItems}
                       setSelectedItems={setSelectedItems}
            />
        </AdminAssetPageStyledDiv>
    );
};

export default assets;


