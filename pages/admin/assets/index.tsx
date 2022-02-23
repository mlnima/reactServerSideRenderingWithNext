// need to switch in to redux

import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic'
// import {getComments} from '../../../_variables/ajaxPostsVariables'
import {getPagesData, getOrders} from "../../../_variables/ajaxVariables";
import {getFormsData} from '../../../_variables/ajaxVariables'
import {useRouter} from "next/router";
import _getPostsQueryGenerator from "../../../_variables/clientVariables/_getPostsQueryGenerator";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {adminGetMetas, adminGetPosts} from "@store/adminActions/adminPanelPostsActions";
import {settingsPropTypes, StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {adminGetUsers} from "@store/adminActions/adminUserActions";
import {adminPanelUsersReducer} from "@store/adminReducers/adminPanelUsersReducer";
import _metaPageQueryGenerator from "../../../_variables/clientVariables/_metaPageQueryGenerator";

const TableHeader = dynamic(
    () => import('../../../components/adminIncludes/assetComponents/TableHeader/TableHeader'),
    {ssr: false}
)
const TableBody = dynamic(
    () => import('../../../components/adminIncludes/assetComponents/TableBody/TableBody'),
    {ssr: false}
)
const TableControls = dynamic(
    () => import('../../../components/adminIncludes/assetComponents/TableControls/TableControls'),
    {ssr: false}
)



const AdminAssetPageStyledDiv = styled.div`

`
const assets = (props: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const posts = useSelector((store: StoreTypes) => store?.adminPanelPosts?.posts)
    const totalCount = useSelector((store: StoreTypes) => {
        return store?.adminPanelPosts?.totalCount || store?.adminPanelUsers?.totalCount
    })
    const users = useSelector((store: StoreTypes) => store?.adminPanelUsers?.users)
    const forms = useSelector((store: StoreTypes) => store?.adminPanelGlobalState?.forms)
    const pages = useSelector((store: StoreTypes) => store?.adminPanelGlobalState?.pages)
    const metas = useSelector((store: StoreTypes) => store?.adminPanelPosts?.metas)
    const orders = useSelector((store: StoreTypes) => store?.adminPanelGlobalState?.orders)

    const [selectedItems, setSelectedItems] = useState([]);
    const [finalPageData, setFinalPageData] = useState({});
    const [dataConfig, setDataConfig] = useState(()=>{
        return {
            size: router.query.size ? parseInt(router.query.size as string) : 30,
            page: router.query.page ? parseInt(router.query.page as string) : 1,
            postType: router?.query?.postType ?? null,
            fields: ['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt'],
            keyword: router?.query?.keyword ?? '',
            author: router?.query?.author ?? 'all',
            status: router?.query?.status ?? 'all',
            sort: router?.query?.sort ?? 'updatedAt',
            content: router?.query?.content ?? 'all',
            metaType: router?.query?.metaType || null,
            orderType: router?.query?.orderType ?? 'all',
            metaId: router?.query?.metaId || null,
            searchForImageIn: router?.query?.type,
            startWith: '',
        }
    })

    useEffect(() => {
        setFinalPageData({
            ...finalPageData,
            posts,
            totalCount,
            users,
            forms,
            pages,
            metas,
            orders,
        })
    }, [posts,users,forms,pages,metas,orders,totalCount]);

    // useEffect(() => {
    //     console.log(metas)
    // }, [metas]);

    useEffect(() => {
        setDataConfig({
            size: router.query.size ? parseInt(router.query.size as string) : 30,
            page: router.query.page ? parseInt(router.query.page as string) : 1,
            postType: router?.query?.postType ?? null,
            fields: ['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt'],
            keyword: router?.query?.keyword ?? '',
            author: router?.query?.author ?? 'all',
            status: router?.query?.status ?? 'all',
            sort: router?.query?.sort ?? 'updatedAt',
            content: router?.query?.content ?? 'all',
            metaType: router?.query?.metaType || null,
            orderType: router?.query?.orderType ?? 'all',
            metaId: router?.query?.metaId || null,
            searchForImageIn: router?.query?.type,
            startWith: '',
        })
    }, [router.pathname]);


    useEffect(() => {
        const assetType = router.query.assetsType
        if (assetType === 'posts') {
            const gettingPostsQueries = _getPostsQueryGenerator(router?.query, router?.query.metaId, false)
            dispatch(adminGetPosts(gettingPostsQueries))
        } else if (assetType === 'users') {
            dispatch(adminGetUsers({}))
        }else if (assetType === 'metas') {
            const queries = _metaPageQueryGenerator(router?.query,router?.query.metaType,false)
            dispatch(adminGetMetas(queries))
        }


        getAndSetAssetData().finally()
    }, [props]);

    const getAndSetAssetData = async () => {
        const assetType = router.query.assetsType
        const ajaxRequestData =
                assetType === 'forms' ? await getFormsData(dataConfig) :
                    assetType === 'pages' ? await getPagesData(dataConfig) :
                        // assetType === 'comments' ? await getComments(dataConfig, false) :
                                assetType === 'orders' ? await getOrders(dataConfig, process.env.NEXT_PUBLIC_PRODUCTION_URL) : null

        if (ajaxRequestData) {
            if (router.query.assetsType === 'orders') {
                let ordersDataArr = []
                // @ts-ignore
                if (!ajaxRequestData.data.error) {
                    setFinalPageData({
                        ...finalPageData,
                        // @ts-ignore
                        ...ajaxRequestData.data.orders.map(orderData => {

                            return {
                                status: orderData?.status ?? 'empty',
                                type: orderData?.type ?? 'empty',
                                create_time: orderData?.payPalData?.create_time ?? 'empty',
                                transactionId: orderData?.payPalData?.id ?? 'empty',
                                paymentStatus: orderData?.payPalData?.status ?? 'empty',
                                payer: orderData?.payPalData?.payer ?? 'empty',
                                payerEmail: orderData?.payPalData?.payer?.email_address ?? 'empty',
                                payerId: orderData?.payPalData?.payer?.payer_id ?? 'empty',
                                payerName: orderData?.payPalData?.payer?.name?.given_name + ' ' + orderData?.payPalData?.payer?.name?.surname ?? 'empty',
                                amount: orderData?.payPalData?.purchase_units?.amount?.value + ' ' + orderData?.payPalData?.purchase_units?.amount?.currency_code ?? 'empty',
                                shippingName: orderData?.payPalData?.purchase_units?.shipping?.name?.full_name ?? 'empty',
                                shippingAddress: JSON.stringify(orderData?.payPalData?.purchase_units?.shipping?.address) ?? 'empty',
                            }
                        })
                    })

                }
            } else {
                setFinalPageData({
                    ...finalPageData,
                    // @ts-ignore
                    ...ajaxRequestData.data
                })
            }
        }
    }


    return (
        <AdminAssetPageStyledDiv className='admin-asset-page'>

            <TableControls finalPageData={finalPageData}
                           dataConfig={dataConfig}
                           setDataConfig={setDataConfig}
                           selectedItems={selectedItems}
                           setSelectedItems={setSelectedItems}/>

            <TableHeader finalPageData={finalPageData} selectedItems={selectedItems}
                         setSelectedItems={setSelectedItems}/>
            <TableBody finalPageData={finalPageData} selectedItems={selectedItems}
                       setSelectedItems={setSelectedItems}/>
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

