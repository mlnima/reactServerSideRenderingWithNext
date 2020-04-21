import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import TableControls from '../../../components/adminIncludes/assetComponents/TableControls/TableControls'
import { getAbsolutePath } from '../../../_variables/_variables'
import { getPosts } from '../../../_variables/ajaxPostsVariables'
import { getComments } from '../../../_variables/ajaxPostsVariables'
import TableHeader from '../../../components/adminIncludes/assetComponents/TableHeader/TableHeader'
import TableBody from '../../../components/adminIncludes/assetComponents/TableBody/TableBody'
import { getUsersListAsAdmin } from '../../../_variables/ajaxAuthVariables'

const assets = props => {

    const [ selectedItems, setSelectedItems ] = useState([]);

    // const dispatchState = (name,value) => {
    //    setState({
    //        [name]:value
    //    })
    // }

    useEffect(() => {
        console.log(selectedItems)
    }, [ selectedItems ]);

    return (
        <AdminLayout>
            <div className='admin-asset-page'>
                <TableControls { ...props } selectedItems={ selectedItems } setSelectedItems={ setSelectedItems }/>
                <TableHeader { ...props } selectedItems={ selectedItems } setSelectedItems={ setSelectedItems }/>
                <TableBody { ...props } selectedItems={ selectedItems } setSelectedItems={ setSelectedItems }/>
            </div>
        </AdminLayout>
    );
};

assets.getInitialProps = async ({ req, query }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let finalPageData;
    let ajaxRequestData;

    const getAssetsData = {
        size: parseInt(query.size) || 30,
        pageNo: parseInt(query.page) || 1,
        postType: query.type || 'all',
        fields: [ 'title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail' ],
        keyword: query.keyword || '',
        author: query.author || 'all',
        actor: query.actor || 'all',
        status: query.status || 'all',
        tag: query.tag || 'all',
        category: query.category || 'all',
        sort: query.sort || 'latest',
    }

    switch ( query.assetsType ) {
        case 'posts':
            ajaxRequestData = await getPosts(getAssetsData, false, domainName)
            break
        case 'users':
            ajaxRequestData = await getUsersListAsAdmin(getAssetsData, domainName)
            break
        case 'comments':
            ajaxRequestData = await getComments(getAssetsData, false, domainName)
            break
        default:
            break
    }

    // let postsData = query.assetsType === 'posts' ? await getPosts(getAssetsData, false, domainName) : {}

    finalPageData = ajaxRequestData ? ajaxRequestData.data : {}

    return { query, finalPageData }
}
export default assets;
