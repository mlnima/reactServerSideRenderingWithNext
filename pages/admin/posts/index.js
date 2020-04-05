import React, { useEffect } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import Filters from "../../../components/adminIncludes/PostsComponents/Filters/Filters";
import PostsDataTable from "../../../components/adminIncludes/PostsComponents/PostsDataTable/PostsDataTable";
import { getAbsolutePath } from '../../../_variables/_variables'
import { getPosts } from '../../../_variables/ajaxPostsVariables'

const adminPosts = props => {

    // useEffect(() => {
    //     console.log( props)
    // }, [props]);

    return (
        <>
            <AdminLayout>
                <div className='Posts'>
                    <Filters {...props}/>
                    <PostsDataTable {...props}/>
                </div>
            </AdminLayout>
        </>
    );
};

adminPosts.getInitialProps = async ({ pathname, query, req, res, err }) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let postsSource;
    const getPostsData = {
        size: parseInt(query.size)  || 30,
        pageNo: parseInt(query.page) || 1,
        postType: query.type || 'all',
        fields: [ 'author', 'title', 'mainThumbnail', 'status', 'actors', 'tags', 'categories' ],
        keyword: query.keyword || '',
        author: query.author || 'all',
        actor: query.actor || 'all',
        status: query.status || 'all',
        tag: query.tag || 'all',
        category: query.category || 'all',
        sort: query.sort || 'latest',
    }
    const postsData = await getPosts(getPostsData, true, domainName)
    postsSource = postsData.data ? postsData.data : []

    return { query, postsSource, getPostsData, pathname }
}

export default adminPosts;