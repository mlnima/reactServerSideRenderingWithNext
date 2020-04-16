import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../../components/layouts/AppLayout'
import { getMultipleSetting, getSetting, getWidgetsWithData,getMultipleWidgetWithData } from '../../../_variables/ajaxVariables'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../context/AppContext'
import TagElement from '../../../components/includes/TagElement/TagElement'
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'
import SiteSettingSetter from '../../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import withRouter from 'next/dist/client/with-router'
import {Sidebar} from '../../../components/includes/Sidebar/Sidebar'
import Footer from '../../../components/includes/Footer/Footer'
import { getAbsolutePath } from '../../../_variables/_variables'
import dataDecoder from '../../../server/tools/dataDecoder'

const tags = props => {

    const [ state, setState ] = useState({
        style: {}
    })

    useEffect(() => {

        if (props.identity.tagsPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }

    }, [ props ]);

    const renderTags = props.tagsSource.metas.map(meta => {
        return (
            <TagElement key={ props.tagsSource.metas.indexOf(meta) } imageUrl={ meta.imageUrl } noImageUrl={ meta.noImageUrl }  name={ meta.name } count={ meta.count }/>
        )
    })

    return (

            <AppLayout>
                <SiteSettingSetter  { ...props }/>
                <div style={ state.style } className={ props.identity.data.tagsPageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div>
                        <div className='tags'>
                            { renderTags }
                        </div>
                        <PaginationComponent
                            isActive={ true }
                            currentPage={ props.getTagsData.pageNo }
                            totalCount={ props.tagsSource.totalCount }
                            size={ props.getTagsData.size }
                            maxPage={ Math.ceil(parseInt(props.tagsSource.totalCount) / parseInt(props.getTagsData.size)) - 1 }
                            queryData={ props.query || props.router.query }
                            pathnameData={ props.pathname || props.router.pathname }
                        />
                    </div>
                    <Sidebar key='tagsPageSidebar' isActive={ props.identity.data.tagsPageSidebar } widgets={ props.widgets } position='tagsPageSidebar'/>
                </div>
                <Footer widgets={ props.widgets } position='footer'/>
            </AppLayout>

    );
};

tags.getInitialProps = async ({ pathname, query, req }) => {
    const domainName = req ? await getAbsolutePath(req) : '';

    const getTagsData = {
        type: 'tag',
        searchForImageIn: 'tags',
        pageNo: parseInt(query.page) || 1,
        size: parseInt(query.size)  || 30,
        sort: query.sort || 'latest',
    }

    let tagsSource;
    let widgets;
    let settings;

    const widgetsData =await getMultipleWidgetWithData({ widgets: [ 'tagsPageSidebar', 'home', 'footer','header' ] }, true,domainName,'tagsPage')
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true,domainName,'tagsPage')
    const tagsData = await getMeta(getTagsData,true,domainName)

    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    tagsSource = tagsData.data ? tagsData.data : { tags: [], totalCount: 0 }
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return { ...settings, tagsSource, getTagsData, query, pathname, widgets }
}
export default withRouter(tags);
