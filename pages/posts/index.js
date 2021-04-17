import React, {useEffect, useContext} from 'react';
import {getMultipleWidgetWithData, getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables';
import withRouter from 'next/dist/client/with-router';
import Posts from '../../components/includes/Posts/Posts';
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent';
import {useRouter} from "next/router";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import styled from "styled-components";
import {AppContext} from "../../context/AppContext";

let StyledDiv = styled.div`${props => props.stylesData}`

const posts = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    // useEffect(() => {
    //     console.log(props.design?.data?.postsPageStyle)
    // }, [props]);

    const contentName = router.asPath.includes('tags') ? 'tag' :
        router.asPath.includes('categories') ? 'category' :
            router.asPath.includes('actors') ? 'actor' : ''
    return (
        <StyledDiv className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''} >
            {contentName ? <PostsPageInfo contentName={(router.query?.contentName)} contentType={(router.query?.contentType)} /> : null}
            <PaginationComponent
                isActive={true}
                currentPage={props.getPostsData.pageNo}
                totalCount={props.postsSource.totalCount}
                size={props.getPostsData.size}
                maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
            />
            <div className='postsContainer'>
                <Posts posts={props.postsSource.posts || []} postElementSize={props.design?.data?.postElementSize}/>
            </div>
            <PaginationComponent
                isActive={true}
                currentPage={props.getPostsData.pageNo}
                totalCount={props.postsSource.totalCount}
                size={props.getPostsData.size}
                maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
            />
        </StyledDiv>
    );
};


export const getServerSideProps = async ({req, query}) => {

    const firstLoadData = await getFirstLoadData(req)
    const getPostsData = {
        size: query.size || firstLoadData.settings?.identity?.data?.postsCountPerPage || '30',
        pageNo: query.page || 1,
        postType: query.type || 'all',
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price', 'translations', 'videoTrailerUrl', 'rating'],
        keyword: query.keyword || '',
        author: query.author || 'all',
        status: 'published',
        tag: query.tag || 'all',
        actor: query.actor || 'all',
        content: query.content || 'all',
        sort: query.sort || 'lastModify',
        lang: query.lang || 'default'
    }

    const contentData = query.content ? await getSingleMeta(query.content, firstLoadData.domainName, true) : {}
    const contentDataInfo = contentData.data ? contentData.data.meta : {}
    const widgetsData = await getMultipleWidgetWithData({widgets: ['postsPageLeftSidebar','postsPageRightSidebar']}, firstLoadData.domainName, true, 'postsPage')
    const postsData = await getPosts(getPostsData, firstLoadData.domainName, true, req.originalUrl)
    const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
    const postsSource = postsData.data ? postsData.data : []
    return {props: {widgets, ...firstLoadData.settings, query, isMobile: Boolean(firstLoadData.isMobile), postsSource, getPostsData, contentData: contentDataInfo, referer: firstLoadData.referer}}
}


export default withRouter(posts);
