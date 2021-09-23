import React from 'react';
import { getComments } from '../../../_variables/ajaxPostsVariables'
import AdminRenderComments from '../../../components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminRenderComments'
import AdminCommentsControl from '../../../components/adminIncludes/commentsPageComponents/AdminCommentsControl/AdminCommentsControl'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'
import {useRouter} from "next/router";

const comments = props => {
    const router = useRouter()
    return (

            <div>
                <AdminCommentsControl
                    queryData={ router.query }
                    pathnameData={ router.pathname }
                />
                <PaginationComponent
                    isActive={ true }
                    currentPage={ props.getCommentsData.pageNo }
                    totalCount={ props.totalComments }
                    size={ props.getCommentsData.size }
                    maxPage={ Math.ceil(parseInt(props.totalComments) / parseInt(props.getCommentsData.size)) }
                    queryData={ props.query || props.router.query }
                    pathnameData={ router.pathname }
                />
                <AdminRenderComments { ...props }/>
            </div>

    );
};

export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let comments;
    const getCommentsData = {
        size: parseInt(query.size) || 30,
        pageNo: parseInt(query.page) || 1,
        keyword: query.keyword || '',
        sort: query.sort || 'latest',
        status: query.status || 'all',
    }
    const commentsData = await getComments(getCommentsData,false)
    comments = commentsData.data
    return{props: { query, comments: comments.comments, totalComments: comments.count, getCommentsData }}
}

export default comments;
