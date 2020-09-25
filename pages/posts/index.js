import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import {
    getSetting,
    getWidgetsWithData,
    getMultipleWidgetWithData,
    getMultipleSetting
} from '../../_variables/ajaxVariables'
import {getMeta, getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter';
import withRouter from 'next/dist/client/with-router'
import Posts from '../../components/includes/Posts/Posts'
import Link from 'next/link'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import {Sidebar} from '../../components/includes/Sidebar/Sidebar'
import Footer from '../../components/widgetsArea/Footer/Footer'
import {getAbsolutePath} from '../../_variables/_variables'
import AdminLayout from '../../components/layouts/AdminLayout'
import dataDecoder from '../../server/tools/dataDecoder'
import MetaContentForPostsPage from "../../components/includes/MetaContentForPostsPage/MetaContentForPostsPage";

const posts = props => {
    const [state, setState] = useState({
        style: {}
    })


    useEffect(() => {
        if (props.identity.data.postPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [props]);


    return (
        <>
            <AppLayout>
                <SiteSettingSetter  {...props}/>
                <div
                    className={props.identity.data.postsPageSidebar ? 'content withSidebar' : 'content withOutSidebar'}>
                    <div className="main">
                        <MetaContentForPostsPage {...props}/>
                        <PaginationComponent
                            isActive={true}
                            currentPage={props.getPostsData.pageNo}
                            totalCount={props.postsSource.totalCount}
                            size={props.getPostsData.size}
                            maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
                            queryData={props.query || props.router.query}
                            pathnameData={props.pathname || props.router.pathname}
                        />
                        <div className='posts'>
                            <Posts posts={props.postsSource.posts || []}/>

                        </div>
                        <PaginationComponent
                            isActive={true}
                            currentPage={props.getPostsData.pageNo}
                            totalCount={props.postsSource.totalCount}
                            size={props.getPostsData.size}
                            maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
                            query={props.query ? props.query : {}}
                            routerQuery={props.router ? props.router.query : {}}
                            pathnameData={props.pathname || props.router.pathname}
                        />
                    </div>
                    <Sidebar isActive={props.identity.data.postsPageSidebar} widgets={props.widgets}
                             position='postsPageSidebar'/>
                </div>
                <Footer widgets={props.widgets} position='footer'/>
            </AppLayout>
        </>
    );
};

posts.getInitialProps = async ({pathname, query, req, res, err}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let postsSource;
    let widgets;
    let settings;
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'postsPage')
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    //|| settings.identity.data.postsCountPerPage
    const getPostsData = {
        size: parseInt(query.size) || parseInt(settings.identity.data.postsCountPerPage) || 30,
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
    const widgetsData = await getMultipleWidgetWithData({widgets: ['postsPageSidebar', 'home', 'footer', 'header','topBar','navigation']}, domainName, true, 'postsPage')
    const postsData = await getPosts(getPostsData, domainName, true)

    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    postsSource = postsData.data ? postsData.data : []

    return {...settings, query, postsSource, getPostsData, pathname, widgets,contentData:contentDataInfo}
}

export default withRouter(posts);
