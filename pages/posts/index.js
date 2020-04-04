import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import { getSetting, getWidgetsWithData, getMultipleWidgetWithData, getMultipleSetting } from '../../_variables/ajaxVariables'
import { getMeta, getPosts } from '../../_variables/ajaxPostsVariables'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter';
import withRouter from 'next/dist/client/with-router'
import Posts from '../../components/includes/Posts/Posts'
import Link from 'next/link'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import {Sidebar} from '../../components/includes/Sidebar/Sidebar'
import Footer from '../../components/includes/Footer/Footer'

const posts = props => {
    const [ state, setState ] = useState({
        style: {}
    })

    useEffect(() => {
        console.log(props)
        if (props.identity.data.postPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [ props ]);

    return (
        <>
            <AppLayout>
                <SiteSettingSetter  { ...props }/>
                <div className={ props.identity.data.postsPageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div className="main">
                        <div className='posts'>
                            <Posts posts={ props.postsSource.posts || [] }/>

                        </div>
                        <PaginationComponent
                            isActive={ true }
                            currentPage={ props.getPostsData.pageNo }
                            totalCount={ props.postsSource.totalCount }
                            size={ props.getPostsData.size }
                            maxPage={ Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size)) }
                            queryData={ props.query || props.router.query }
                            pathnameData={ props.pathname || props.router.pathname }
                        />
                    </div>
                    <Sidebar isActive={ props.identity.data.postsPageSidebar } widgets={ props.widgets } position='postsPageSidebar'/>
                </div>
                <Footer widgets={ props.widgets } position='footer'/>
            </AppLayout>
        </>
    );
};

posts.getInitialProps = async ({ pathname, query, req, res, err }) => {

    let postsSource;
    let widgets;
    let settings;
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true)
    settings = settingsData.data.settings ? settingsData.data.settings : []
    //|| settings.identity.data.postsCountPerPage
    const getPostsData = {
        size: parseInt(query.size) || parseInt(settings.identity.data.postsCountPerPage) || 30,
        pageNo: parseInt(query.page) || 1,
        postType: query.type || 'all',
        fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        keyword: query.keyword || '',
        author: query.author || 'all',
        actor: query.actor || 'all',
        status: 'published',
        tag: query.tag || 'all',
        category: query.category || 'all',
        sort: query.sort || 'latest',
    }

    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'postsPageSidebar', 'home', 'footer' ] }, true)

    const postsData = await getPosts(getPostsData)
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    postsSource = postsData.data ? postsData.data : []

    return { ...settings, query, postsSource, getPostsData, pathname, widgets }
}

export default withRouter(posts);
