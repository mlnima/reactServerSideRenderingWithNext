import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../../components/layouts/AppLayout'
import { AppContext } from '../../../context/AppContext'
import TagElement from '../../../components/includes/TagElement/TagElement'
import { getMultipleSetting, getSetting, getWidgetsWithData,getMultipleWidgetWithData } from '../../../_variables/ajaxVariables'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement'
import ActorElement from '../../../components/includes/ActorElement/ActorElement'
import SiteSettingSetter from '../../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'
import withRouter from 'next/dist/client/with-router'
// import {SideBar} from '../../../components/includes/Sidebar/Sidebar'
import {Sidebar} from '../../../components/includes/Sidebar/Sidebar'
import Footer from '../../../components/includes/Footer/Footer'
import { getAbsolutePath } from '../../../_variables/_variables'
import dataDecoder from '../../../server/tools/dataDecoder'

const actors = props => {
    const [ state, setState ] = useState({
        style: {}
    })
    const renderActors = props.actorsSource.metas.map(meta => {
        return (
            <ActorElement key={ props.actorsSource.metas.indexOf(meta) } imageUrl={ meta.imageUrl } noImageUrl={ meta.noImageUrl } name={ meta.name } count={ meta.count }/>
        )
    })

    useEffect(() => {
        if (props.identity.actorsPageSidebar) {
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
                <div style={ state.style } className={ props.identity.data.actorsPageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div>
                        <div className='actors'>
                            { renderActors }
                        </div>
                        <PaginationComponent
                            isActive={ true }
                            currentPage={ props.getActorsData.pageNo }
                            totalCount={ props.actorsSource.totalCount }
                            size={ props.getActorsData.size }
                            maxPage={ Math.ceil(parseInt(props.actorsSource.totalCount) / parseInt(props.getActorsData.size)) - 1 }
                            queryData={ props.query || props.router.query }
                            pathnameData={ props.pathname || props.router.pathname }
                        />
                    </div>
                    <Sidebar key='actorsPageSidebar' isActive={ props.identity.data.actorsPageSidebar } widgets={ props.widgets } position='actorsPageSidebar'/>
                </div>
                <Footer widgets={ props.widgets } position='footer'/>
            </AppLayout>
        </>
    );
};

actors.getInitialProps = async ({ pathname, query, req, res, err }) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    const getActorsData = {
        type: 'actor',
        searchForImageIn: 'actors',
        pageNo: parseInt(query.page) || 1,
        size: parseInt(query.size)  || 30,
        sort: query.sort || 'latest',
    }

    let actorsSource;
    let widgets;
    let settings;

    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'actorsPageSidebar', 'home', 'footer','header' ] }, true,domainName,'actorsPage')
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true,domainName,'actorsPage')


    const actorsData = await getMeta(getActorsData,true,domainName)

    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    actorsSource = actorsData.data ? actorsData.data : []
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []

    return { ...settings, query, actorsSource, getActorsData, pathname, widgets }
}
export default withRouter(actors);
