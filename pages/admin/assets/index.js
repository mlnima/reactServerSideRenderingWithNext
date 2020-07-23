import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import TableControls from '../../../components/adminIncludes/assetComponents/TableControls/TableControls'
import {getAbsolutePath} from '../../../_variables/_variables'
import {getPosts, getMeta, getComments} from '../../../_variables/ajaxPostsVariables'
import TableHeader from '../../../components/adminIncludes/assetComponents/TableHeader/TableHeader'
import TableBody from '../../../components/adminIncludes/assetComponents/TableBody/TableBody'
import {getUsersListAsAdmin} from '../../../_variables/ajaxAuthVariables'
import withRouter from 'next/dist/client/with-router'
import pluralize from 'pluralize'

const assets = props => {
    const [state, setState] = useState({})
    const [selectedItems, setSelectedItems] = useState([]);
    const [finalPageData, setFinalPageData] = useState({});
    // useEffect(() => {
    //     getAndSetData()
    // }, [state, props]);

    useEffect(() => {

        setFinalPageData({
            ...finalPageData,
            ...props.finalFetchedData
        })

        setState({
            ...state,
            ...props.getFirstDataOption
        })
    }, [props]);


    useEffect(() => {
        console.log(finalPageData)
    }, [finalPageData]);


    // useEffect(() => {
    //     if (props.router) {
    //         setState({
    //             ...state,
    //             size: parseInt(props.router.query.size) || 30,
    //             pageNo: parseInt(props.router.query.page) || 1,
    //             postType: props.router.query.type || 'all',
    //             fields: ['title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail'],
    //             keyword: props.router.query.keyword || '',
    //             author: props.router.query.author || 'all',
    //             actor: props.router.query.actor || 'all',
    //             status: props.router.query.status || 'all',
    //             tag: props.router.query.tag || 'all',
    //             category: props.router.query.category || 'all',
    //             sort: props.router.query.sort || 'latest',
    //             type: props.router.query.metaType ? pluralize.singular(props.router.query.metaType) : '',
    //             page: parseInt(props.router.query.page) || 1,
    //             searchForImageIn: props.router.query.type,
    //             startWith: '',
    //         })
    //     }
    // }, [props]);

    // const getAndSetData = async () => {
    //     let finalFetchedData;
    //     let ajaxRequestData;
    //     if (props.router) {
    //         switch (props.router.query.assetsType) {
    //             case 'posts':
    //                 ajaxRequestData = await getPosts(state, window.location.origin, false)
    //                 break
    //             case 'users':
    //                 ajaxRequestData = await getUsersListAsAdmin(state, localStorage.wt)
    //                 break
    //             case 'comments':
    //                 ajaxRequestData = await getComments(state, window.location.origin, false)
    //                 break
    //             case 'metas':
    //                 if (props.router.query.metaType)
    //                     ajaxRequestData = await getMeta(state, window.location.origin, false)
    //
    //                 break
    //             default:
    //                 break
    //         }
    //         finalFetchedData = ajaxRequestData ? ajaxRequestData.data : {}
    //         console.log(finalFetchedData)
    //         setFinalPageData({
    //             ...finalPageData,
    //             ...finalFetchedData
    //         })
    //     }
    // }

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

assets.getInitialProps = async ({pathname, query, req, asPath}) => {
    const domainName = req ? await getAbsolutePath(req) : '';

    let getFirstDataOption = {
        size: parseInt(query.size) || 30,
        pageNo: parseInt(query.page) || 1,
        postType: query.type || 'all',
        fields: ['title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail'],
        keyword: query.keyword || '',
        author: query.author || 'all',
        status: query.status || 'all',
        sort: query.sort || 'latest',
        content: query.content || 'all',
        type: query.metaType ? query.metaType : '',
        page: parseInt(query.page) || 1,
        searchForImageIn: query.type,
        startWith: '',
    }


    try {
        let finalFetchedData;
        let ajaxRequestData;

        switch (query.assetsType) {
            case 'posts':
                ajaxRequestData = await getPosts(getFirstDataOption, domainName, false)
                break
            case 'users':
                ajaxRequestData = await getUsersListAsAdmin(getFirstDataOption, localStorage.wt)
                break
            case 'comments':
                ajaxRequestData = await getComments(getFirstDataOption, domainName, false)
                break
            case 'metas':
                if (query.metaType)
                    ajaxRequestData = await getMeta(getFirstDataOption, domainName, false)
                break
            default:
                break
        }
        finalFetchedData = ajaxRequestData ? ajaxRequestData.data : {}

        return {query, finalFetchedData, getFirstDataOption}
    } catch (e) {
        return {}
    }
}

export default withRouter(assets);

