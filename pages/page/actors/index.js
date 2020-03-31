import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../../components/layouts/AppLayout'
import { AppContext } from '../../../context/AppContext'
import TagElement from '../../../components/includes/TagElement/TagElement'
import { getSetting, getWidgetsWithData } from '../../../_variables/ajaxVariables'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement'
import ActorElement from '../../../components/includes/ActorElement/ActorElement'
import SiteSettingSetter from '../../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'
import withRouter from 'next/dist/client/with-router'
import SideBar from '../../../components/includes/Sidebar/Sidebar'
const actors = props => {
    const [state,setState]=useState({
        style:{}
    })
    const renderActors = props.actorsSource.metas.map(meta => {
        return (
            <ActorElement key={ meta._id } imageUrl={ meta.imageUrl } noImageUrl={ meta.noImageUrl } name={ meta.name } count={ meta.count }/>
        )
    })

    useEffect(() => {
        console.log( props)
        if (props.identity.actorsPageSidebar){
            setState({
                style: {
                    gridArea:'content'
                }
            })
        }

    }, [props]);
    return (
        <>
            <AppLayout>
                <SiteSettingSetter  { ...props }/>
                <div style={state.style} className={ props.identity.actorsPageSidebar ? 'content withSidebar':'content withOutSidebar'  } >
                    <div>
                        <div className='actors'>
                            { renderActors }
                        </div>
                        <PaginationComponent
                            isActive={ true }
                            currentPage={props.getActorsData.pageNo }
                            totalCount={ props.actorsSource.totalCount }
                            size={ props.getActorsData.size }
                            maxPage={ Math.ceil(parseInt(props.actorsSource.totalCount) / parseInt(props.getActorsData.size))- 1 }
                            queryData={props.query || props.router.query}
                            pathnameData={props.pathname ||props.router.pathname }
                        />
                    </div>
                    <SideBar isActive={props.identity.actorsPageSidebar} widgets={props.widgets} position='actorsPageSidebar'/>
                </div>

            </AppLayout>
        </>
    );
};

actors.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let actorsSource ;
    let widgets;
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');
    const widgetsData = await getWidgetsWithData('actorsPageSidebar')
    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    const getActorsData = {
        type: 'actor',
        searchForImageIn:'actors',
        pageNo: parseInt(query.page) || 1,
        size: parseInt(query.size) || parseInt(identity.tagsCountPerPage) ||30,
        sort: query.sort || 'latest',
    }

    const categoriesData = await getMeta(getActorsData)
    actorsSource = categoriesData.data ? categoriesData.data : []

    return { identity, navigation, query, actorsSource,getActorsData,pathname,widgets }
}
export default withRouter(actors);
