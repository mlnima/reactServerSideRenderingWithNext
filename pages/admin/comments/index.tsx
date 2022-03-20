import React from 'react';
import AdminRenderComments from '../../../components/adminIncludes/commentsPageComponents/AdminRenderComments/AdminRenderComments'
import AdminCommentsControl from '../../../components/adminIncludes/commentsPageComponents/AdminCommentsControl/AdminCommentsControl'
import PaginationComponent from '@components/includes/PaginationComponent/PaginationComponent'
import {useRouter} from "next/router";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const comments = (props:any) => {
    const {query,pathname} = useRouter()
    return (

            <div>
                <AdminCommentsControl
                    queryData={ query }
                    pathnameData={ pathname }
                />
                <PaginationComponent
                    isActive={ true }
                    currentPage={ props.getCommentsData.pageNo }
                    totalCount={ props.totalComments }
                    size={ props.getCommentsData.size }
                    maxPage={ Math.ceil(parseInt(props.totalComments) / parseInt(props.getCommentsData.size)) }
                />
                <AdminRenderComments { ...props }/>
            </div>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})


export default comments;
