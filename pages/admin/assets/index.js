import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import TableControls from '../../../components/adminIncludes/assetComponents/TableControls/TableControls'
import {getAbsolutePath} from '../../../_variables/_variables'
import {getPosts, getMeta, getComments} from '../../../_variables/ajaxPostsVariables'
import {getPagesData} from "../../../_variables/ajaxVariables";
import TableHeader from '../../../components/adminIncludes/assetComponents/TableHeader/TableHeader'
import TableBody from '../../../components/adminIncludes/assetComponents/TableBody/TableBody'
import {getUsersListAsAdmin} from '../../../_variables/ajaxAuthVariables'
import {getFormData} from '../../../_variables/ajaxVariables'
import {useRouter} from "next/router";
//import withRouter from 'next/dist/client/with-router'
import pluralize from 'pluralize'

const assets = props => {
    const [state, setState] = useState({})
    const router = useRouter()
    const [selectedItems, setSelectedItems] = useState([]);
    const [finalPageData, setFinalPageData] = useState({});

    useEffect( () => {
        dataSetter()
    }, [props]);


    const dataSetter = async ()=>{
        let ajaxRequestData;
        let getFirstDataOption = {
            size: router.query.size ? parseInt(router.query.size) : 30,
            pageNo: router.query.page ? parseInt(router.query.page) : 1,
            postType: router.query.type ? router.query.type : 'all',
            fields: ['title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail'],
            keyword: router.query.keyword ? router.query.keyword : '',
            author: router.query.author ? router.query.author : 'all',
            status: router.query.status ? router.query.status : 'all',
            sort: router.query.sort ?router.query.sort: 'latest',
            content: router.query.content? router.query.content : 'all',
            type: router.query.metaType ? router.query.metaType : '',
            page: router.query.page? parseInt(router.query.page) : 1,
            searchForImageIn: router.query.type,
            startWith: '',
        }
        switch (router.query.assetsType) {
            case 'posts':
                ajaxRequestData =  await getPosts(getFirstDataOption, window.location.origin, false)
                break
            case 'users':
                ajaxRequestData =  await getUsersListAsAdmin(getFirstDataOption, localStorage.wt)
                break
            case 'forms':
                ajaxRequestData =  await getFormData(getFirstDataOption, localStorage.wt)
                break
            case 'pages':
                ajaxRequestData =  await getPagesData(getFirstDataOption, localStorage.wt)
                break
            case 'comments':
                ajaxRequestData =  await getComments(getFirstDataOption, window.location.origin, false)
                break
            case 'metas':
                if (router.query.metaType)
                    ajaxRequestData =  await getMeta(getFirstDataOption, window.location.origin, false)
                break
            default:
                break
        }
        if(ajaxRequestData){
            setFinalPageData({
                ...finalPageData,
                ... ajaxRequestData.data
            })
            setState({
                ...state,
                ...getFirstDataOption
            })
        }
    }







    return (
        <AdminLayout>
            <div className='admin-asset-page'>
                <TableControls finalPageData={finalPageData} selectedItems={selectedItems}
                               setSelectedItems={setSelectedItems}/>
                <TableHeader finalPageData={finalPageData} selectedItems={selectedItems}
                             setSelectedItems={setSelectedItems}/>
                <TableBody finalPageData={finalPageData} selectedItems={selectedItems}
                           setSelectedItems={setSelectedItems}/>
            </div>
        </AdminLayout>
    );
};


export default assets;

