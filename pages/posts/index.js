import React from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import {
    getMultipleWidgetWithData,
    getMultipleSetting
} from '../../_variables/ajaxVariables'
import { getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter';
import withRouter from 'next/dist/client/with-router'
import Posts from '../../components/includes/Posts/Posts'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import {getAbsolutePath} from '../../_variables/_variables'
import './Posts.scss'
//import MetaContentForPostsPage from "../../components/includes/MetaContentForPostsPage/MetaContentForPostsPage";

const posts = props => {


    return (
        <>
            <AppLayout  {...props} sidebar={props.identity?.data?.postsPageSidebar} sidebarPosition='postsPageSidebar'>
                {/*<SiteSettingSetter  {...props}/>*/}
                    <div className="main posts-page">
                        {/*<MetaContentForPostsPage {...props}/>*/}
                        <PaginationComponent
                            isActive={true}
                            currentPage={props.getPostsData.pageNo}
                            totalCount={props.postsSource.totalCount}
                            size={props.getPostsData.size}
                            maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
                            //paginationIndex='pagination1'
                        />
                        <div className='postsContainer'>
                            <Posts posts={props.postsSource.posts || []}/>

                        </div>
                        <PaginationComponent
                            isActive={true}
                            currentPage={props.getPostsData.pageNo}
                            totalCount={props.postsSource.totalCount}
                            size={props.getPostsData.size}
                            maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
                            //paginationIndex='pagination2'
                        />
                    </div>
            </AppLayout>
        </>
    );
};


export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let postsSource;
    let widgets;
    let settings;
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'postsPage')
    settings = settingsData.data.settings ? settingsData.data.settings : []
    //|| settings.identity.data.postsCountPerPage
    const getPostsData = {
        size: parseInt(query.size) || parseInt(settings?.identity?.data?.postsCountPerPage) || 30,
        pageNo: parseInt(query.page) || 1,
        postType: query.type || 'all',
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price', 'translations','videoTrailerUrl'],
        keyword: query.keyword || '',
        author: query.author || 'all',
        status: 'published',
        tag: query.tag || 'all',
        actor: query.actor || 'all',
        content: query.content || 'all',
        sort: query.sort || 'latest',
        lang: query.lang || 'default'
    }

    const contentData = query.content ? await getSingleMeta(query.content,domainName,true) : {}
    const contentDataInfo =   contentData.data ?  contentData.data.meta : {}
    const widgetsData = await getMultipleWidgetWithData({widgets: ['postsPageSidebar', 'footer', 'header','topBar','navigation']}, domainName, true, 'postsPage')
    const postsData = await getPosts(getPostsData, domainName, true)
    let isMobile = (req
        ? req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    postsSource = postsData.data ? postsData.data : []

    return {props:{...settings, query,isMobile: Boolean(isMobile), postsSource, getPostsData, widgets,contentData:contentDataInfo}}
}


export default withRouter(posts);
