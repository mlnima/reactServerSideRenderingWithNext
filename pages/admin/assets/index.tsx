import React, {FC, useEffect, useMemo, useState} from 'react';
import dynamic from 'next/dynamic'
import {useRouter} from "next/router";
import _getPostsQueryGenerator from "../../../_variables/clientVariables/_getPostsQueryGenerator";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {adminGetMetas, adminGetPosts} from "@store/adminActions/adminPanelPostsActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {adminGetUsers} from "@store/adminActions/adminUserActions";
import _metaPageQueryGenerator from "../../../_variables/clientVariables/_metaPageQueryGenerator";
import {adminGetComments} from "@store/adminActions/adminPanelCommentsActions";
import {adminGetForms} from "@store/adminActions/adminPanelFormsActions";
import {adminGetPages} from "@store/adminActions/adminPanelPagesActions";
import {adminGetOrders} from "@store/adminActions/adminPanelOrdersActions";

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
const assets: FC = () => {
    const {query, pathname, asPath,push} = useRouter()
    const dispatch = useDispatch()


    const assetPageData = useSelector((store: StoreTypes) => {
        return {
            totalCount: store?.adminPanelPosts?.totalCount || store?.adminPanelUsers?.totalCount,
            posts: store?.adminPanelPosts?.posts,
            users: store?.adminPanelUsers?.users,
            comments: store?.adminPanelComments?.comments,
            forms: store?.adminPanelForms?.forms,
            pages: store?.adminPanelPages?.pages,
            metas: store?.adminPanelPosts?.metas,
            orders: store?.adminPanelOrders?.orders
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



    const getData = () =>{
        const assetType = query.assetsType
        if (assetType === 'posts') {
            const gettingPostsQueries = _getPostsQueryGenerator(query, query.metaId, false)
            dispatch(adminGetPosts(gettingPostsQueries))
        } else if (assetType === 'users'){
            dispatch(adminGetUsers({}))
        } else if (assetType === 'metas') {
            const queries = _metaPageQueryGenerator(query, query.metaType, false)
            dispatch(adminGetMetas(queries))
        } else if (assetType === 'comments') {
            dispatch(adminGetComments(dataConfig))
        } else if (assetType === 'forms') {
            dispatch(adminGetForms(dataConfig))
        } else if (assetType === 'pages') {
            dispatch(adminGetPages(dataConfig))
        } else if (assetType === 'orders') {
            dispatch(adminGetOrders(dataConfig))
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


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})


export default assets;


