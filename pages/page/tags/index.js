import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../../components/layouts/AppLayout'
import { getSetting, getWidgetsWithData } from '../../../_variables/ajaxVariables'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../context/AppContext'
import TagElement from '../../../components/includes/TagElement/TagElement'
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'
import SiteSettingSetter from '../../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import withRouter from 'next/dist/client/with-router'
import SideBar from '../../../components/includes/Sidebar/Sidebar'

const tags = props => {

    const [state,setState]=useState({
        style:{}
    })
    useEffect(() => {
        console.log( props)
        if (props.identity.tagsPageSidebar){
            setState({
                style: {
                    gridArea:'content'
                }
            })
        }

    }, [props]);

    const renderTags = props.tagsSource.metas.map(meta => {
            return (
                <TagElement key={meta._id} imageUrl={meta.imageUrl} noImageUrl={meta.noImageUrl} name={meta.name} count={meta.count}/>
            )
    })

    return (
        <>
        <AppLayout>
            <SiteSettingSetter  { ...props }/>
            <div style={state.style} className={ props.identity.tagsPageSidebar ? 'content withSidebar':'content withOutSidebar'  } >
                <div>
                    <div className='tags'>
                        {renderTags}
                    </div>
                    <PaginationComponent
                        isActive={ true }
                        currentPage={props.getTagsData.pageNo }
                        totalCount={ props.tagsSource.totalCount }
                        size={ props.getTagsData.size }
                        maxPage={ Math.ceil(parseInt(props.tagsSource.totalCount) / parseInt(props.getTagsData.size))- 1 }
                        queryData={props.query || props.router.query}
                        pathnameData={props.pathname ||props.router.pathname }
                    />
                </div>
                <SideBar isActive={props.identity.tagsPageSidebar} widgets={props.widgets} position='tagsPageSidebar'/>
            </div>
        </AppLayout>
            </>
    );
};



tags.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let tagsSource;
    let widgets;
    const widgetsData = await getWidgetsWithData('tagsPageSidebar')
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');
    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}

    const getTagsData = {
        type: 'tag',
        searchForImageIn:'tags',
        pageNo: parseInt(query.page) || 1,
        size: parseInt(query.size) || parseInt(identity.tagsCountPerPage) ||30,
        sort: query.sort || 'latest',

    }


        const tagsData = await getMeta(getTagsData)
        tagsSource = tagsData.data ? tagsData.data : {tags:[],totalCount:0}
         widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []


    return { identity, navigation, query, tagsSource,getTagsData,pathname,widgets }
}
export default withRouter(tags);
