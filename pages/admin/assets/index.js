import React, {useEffect,useLayoutEffect, useState} from 'react';
import dynamic from 'next/dynamic'
import AdminLayout from '../../../components/layouts/AdminLayout'
import {getPosts, getMeta, getComments} from '../../../_variables/ajaxPostsVariables'
import {getPagesData, getOrders} from "../../../_variables/ajaxVariables";
import {getUsersListAsAdmin} from '../../../_variables/ajaxAuthVariables'
import {getFormsData} from '../../../_variables/ajaxVariables'
import {useRouter} from "next/router";

const TableHeader = dynamic(
    () => import('../../../components/adminIncludes/assetComponents/TableHeader/TableHeader'),
    { ssr: false }
)
const TableBody = dynamic(
    () => import('../../../components/adminIncludes/assetComponents/TableBody/TableBody'),
    { ssr: false }
)
const TableControls = dynamic(
    () => import('../../../components/adminIncludes/assetComponents/TableControls/TableControls'),
    { ssr: false }
)



const assets = props => {
    const [state, setState] = useState({})
    const router = useRouter()
    const [selectedItems, setSelectedItems] = useState([]);
    const [finalPageData, setFinalPageData] = useState({});

    useEffect(() => {
       // console.log(parseInt(router.query.size))
        getAndSetAssetData()
    }, [props,router.query.size]);

    // useEffect(() => {
    //     console.log(finalPageData)
    // }, [finalPageData]);

    const getAndSetAssetData = async () => {
        let ajaxRequestData;
        let getFirstDataOption = {
            size: router.query.size ? parseInt(router.query.size)    : 30,
            page: router.query.page ? parseInt(router.query.page) : 1,
            postType: router?.query?.type ?? null,
            fields: ['title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail'],
            keyword: router?.query?.keyword ?? '',
            author: router?.query?.author ?? 'all',
            status: router?.query?.status ?? 'all',
            sort: router?.query?.sort ?? 'lastModify',
            content: router?.query?.content ?? 'all',
            metaType: router?.query?.metaType ||  '',
            orderType: router?.query?.orderType ?? 'all',
            //page: router?.query?.page ? parseInt(router.query.page) : 1,
            searchForImageIn: router?.query?.type,
            startWith: '',
        }
        switch (router.query.assetsType) {
            case 'posts':
                ajaxRequestData = await getPosts(getFirstDataOption, window.location.origin, false)
                break
            case 'users':
                ajaxRequestData = await getUsersListAsAdmin(getFirstDataOption, localStorage.wt)
                break
            case 'forms':
                ajaxRequestData = await getFormsData(getFirstDataOption, localStorage.wt)
                break
            case 'pages':
                ajaxRequestData = await getPagesData(getFirstDataOption, localStorage.wt)
                break
            case 'comments':
                ajaxRequestData = await getComments(getFirstDataOption, window.location.origin, false)
                break
            case 'metas':
                if (router.query.metaType)
                    ajaxRequestData = await getMeta(getFirstDataOption, window.location.origin, false)
                break
            case 'orders':
                ajaxRequestData = await getOrders(getFirstDataOption, window.location.origin)
                break
            default:
                break
        }
        if (ajaxRequestData) {
            if (router.query.assetsType === 'orders'){
                let ordersDataArr = []
                if (!ajaxRequestData.data.error){
                    setFinalPageData({
                        ...finalPageData,
                        ...ajaxRequestData.data.orders.map(orderData=>{

                            return{
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
                                shippingName: orderData?.payPalData?.purchase_units?.shipping?.name?.full_name  ?? 'empty',

                                // shippingAddress:
                                //     orderData?.payPalData?.purchase_units?.shipping?.address?.address_line_1 + ' ' +
                                //     orderData?.payPalData?.purchase_units?.shipping?.address?.admin_area_2 + ' ' +
                                //     orderData?.payPalData?.purchase_units?.shipping?.address?.admin_area_1 + ' ' +
                                //     orderData?.payPalData?.purchase_units?.shipping?.address?.postal_code + ' ' +
                                //     orderData?.payPalData?.purchase_units?.shipping?.address?.country_code
                                //     ?? 'empty',
                                shippingAddress:JSON.stringify(orderData?.payPalData?.purchase_units?.shipping?.address) ?? 'empty',
                            }
                        })
                    })

                }


            }else {
                setFinalPageData({
                    ...finalPageData,
                    ...ajaxRequestData.data
                })
            }
            setState({
                ...state,
                ...getFirstDataOption
            })
        }
    }


    return (
            <div className='admin-asset-page'>
                <TableControls finalPageData={finalPageData} selectedItems={selectedItems}
                               setSelectedItems={setSelectedItems}/>
                <TableHeader finalPageData={finalPageData} selectedItems={selectedItems}
                             setSelectedItems={setSelectedItems}/>
                <TableBody finalPageData={finalPageData} selectedItems={selectedItems}
                           setSelectedItems={setSelectedItems}/>
            </div>
    );
};


export default assets;

