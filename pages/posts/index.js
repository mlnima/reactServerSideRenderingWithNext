import React, {useContext} from 'react';
import { getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables';
import withRouter from 'next/dist/client/with-router';
import Posts from '../../components/includes/Posts/Posts';
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent';
import {useRouter} from "next/router";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import styled from "styled-components";
import {AppContext} from "../../context/AppContext";
import FooterWidgetArea from "../../components/widgetsArea/FooterWidgetArea/FooterWidgetArea";


let StyledMain = styled.main`
  width: 100%;
  .posts-page-info{
    margin: 5px 0;
    h1{
      margin:  0;
      padding: 0 10px;
    }
  }
  .posts-container{
    width: 100%;
  }
  ${props => props.stylesData}
`

const posts = (props,{design}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const contentName = router.asPath.includes('tags') ? 'tag' :
        router.asPath.includes('categories') ? 'category' :
            router.asPath.includes('actors') ? 'actor' : ''
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''}>
            {contentName ? <PostsPageInfo metaName={(router.query?.metaName)} metaType={(router.query?.metaType)}/> : null}
            <PaginationComponent
                isActive={true}
                currentPage={props.getPostsData.page}
                totalCount={props.postsSource.totalCount}
                size={props.getPostsData.size}
                maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
            />
            <div className='posts-container'>
                <Posts
                    posts={props.postsSource.posts || []}
                    postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                />
            </div>
            <PaginationComponent
                isActive={true}
                currentPage={props.getPostsData.page}
                totalCount={props.postsSource.totalCount}
                size={props.getPostsData.size}
                maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
            />
        </StyledMain>
    );
};


export const getServerSideProps = async ({req, query}) => {

    const firstLoadData = await getFirstLoadData(req,['postsPageLeftSidebar', 'postsPageRightSidebar'],'postsPage')
    const getPostsData = {
        size: parseInt(query.size) || parseInt(firstLoadData.settings?.identity?.data?.postsCountPerPage) || 30,
        page: parseInt(query?.page) || 1,
        postType: query.type || null,
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price', 'translations', 'videoTrailerUrl', 'rating'],
        keyword: query.keyword || '',
        author: query.author || 'all',
        status: 'published',
        metaName: query.metaName || 'all',
        metaId: query.metaId || null,
        sort: query.sort || 'lastModify',
        lang: query.lang || null
    }

    const contentData = query.content ? await getSingleMeta(query.content, firstLoadData.domainName, true) : {}
    const contentDataInfo = contentData.data ? contentData.data.meta : {}
    const postsData = await getPosts(getPostsData, firstLoadData.domainName, true, req.originalUrl)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []
    return {props: {widgets, ...firstLoadData.settings, query, isMobile: Boolean(firstLoadData.isMobile), postsSource, getPostsData, contentData: contentDataInfo, referer: firstLoadData.referer}}
}


export default withRouter(posts);
