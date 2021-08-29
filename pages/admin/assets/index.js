import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic'
import {getPosts, getMultipleMeta, getComments} from '../../../_variables/ajaxPostsVariables'
import {getPagesData, getOrders} from "../../../_variables/ajaxVariables";
import {getUsersListAsAdmin} from '../../../_variables/ajaxAuthVariables'
import {getFormsData} from '../../../_variables/ajaxVariables'
import {useRouter} from "next/router";
import _getPostsQueryGenerator from "../../../_variables/clientVariables/_getPostsQueryGenerator";

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


const assets = props => {
    const [state, setState] = useState({})
    const router = useRouter()
    const [selectedItems, setSelectedItems] = useState([]);
    const [finalPageData, setFinalPageData] = useState({});

    const [dataConfig, setDataConfig] = useState({})


    useEffect(() => {
        setDataConfig({
            size: router.query.size ? parseInt(router.query.size) : 30,
            page: router.query.page ? parseInt(router.query.page) : 1,
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
            //page: router?.query?.page ? parseInt(router.query.page) : 1,
            searchForImageIn: router?.query?.type,
            startWith: '',
        })
    }, [props]);


    useEffect(() => {
        getAndSetAssetData()
    }, [dataConfig]);


    const getAndSetAssetData = async () => {
        const assetType = router.query.assetsType
        const gettingPostsQueries = _getPostsQueryGenerator(router?.query,router?.query.size,router?.query.metaId,false)
        const ajaxRequestData = assetType === 'posts' ? await getPosts(gettingPostsQueries) :
            assetType === 'users' ? await getUsersListAsAdmin(dataConfig, localStorage.wt) :
                assetType === 'forms' ? await getFormsData(dataConfig, localStorage.wt) :
                    assetType === 'pages' ? await getPagesData(dataConfig, localStorage.wt) :
                        assetType === 'comments' ? await getComments(dataConfig, process.env.REACT_APP_PRODUCTION_URL, false) :
                            assetType === 'metas' && router.query.metaType ? await getMultipleMeta(dataConfig, process.env.REACT_APP_PRODUCTION_URL, false) :
                                assetType === 'orders' ? await getOrders(dataConfig, process.env.REACT_APP_PRODUCTION_URL) : null

        if (ajaxRequestData) {
            if (router.query.assetsType === 'orders') {
                let ordersDataArr = []
                if (!ajaxRequestData.data.error) {
                    setFinalPageData({
                        ...finalPageData,
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
                    ...ajaxRequestData.data
                })
            }
            // setState({
            //     ...state,
            //     ...dataConfig
            // })
        }
    }


    return (
        <div className='admin-asset-page'>
            <TableControls finalPageData={finalPageData}
                           dataConfig={dataConfig}
                           setDataConfig={setDataConfig}
                           selectedItems={selectedItems}
                           setSelectedItems={setSelectedItems}/>
            <TableHeader finalPageData={finalPageData} selectedItems={selectedItems}
                         setSelectedItems={setSelectedItems}/>
            <TableBody finalPageData={finalPageData} selectedItems={selectedItems}
                       setSelectedItems={setSelectedItems}/>
        </div>
    );
};


export default assets;

