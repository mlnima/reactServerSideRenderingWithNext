import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import { getComments } from '../../../_variables/ajaxPostsVariables'
import AdminRenderComments from '../../../components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminRenderComments'
import AdminCommentsControl from '../../../components/adminIncludes/commentsPageComponents/AdminCommentsControl/AdminCommentsControl'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'
import AppLayout from '../../../components/layouts/AppLayout'

const comments = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log(props )
    }, [props]);

    return (
        <AdminLayout>
            <div>
                <AdminCommentsControl
                    queryData={ props.query || props.router.query }
                    pathnameData={ props.pathname || props.router.pathname }
                />
                <PaginationComponent
                    isActive={ true }
                    currentPage={ props.getCommentsData.pageNo }
                    totalCount={ props.totalComments }
                    size={ props.getCommentsData.size }
                    maxPage={ Math.ceil(parseInt(props.totalComments) / parseInt(props.getCommentsData.size)) }
                    queryData={ props.query || props.router.query }
                    pathnameData={ props.pathname || props.router.pathname }
                />
                <AdminRenderComments { ...props }/>
            </div>
        </AdminLayout>
    );
};

comments.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let comments;
    const getCommentsData = {
        size: parseInt(query.size) || 30,
        pageNo: parseInt(query.page) || 1,
        keyword: query.keyword || '',
        sort: query.sort || 'latest',
        status: query.status || 'all',
    }
    const commentsData = await getComments(getCommentsData)
    comments = commentsData.data
    return { query, pathname, comments: comments.comments, totalComments: comments.count, getCommentsData }
}
export default comments;
