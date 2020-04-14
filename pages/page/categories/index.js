import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from "../../../components/layouts/AppLayout";
import { getMultipleSetting, getSetting, getWidgetsWithData,getMultipleWidgetWithData } from '../../../_variables/ajaxVariables'
import { AppContext } from '../../../context/AppContext'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import withRouter from 'next/dist/client/with-router';
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement';
import RenderMetaDataPages from '../../../components/includes/RenderMetaDataPages/RenderMetaDataPages'
import SiteSettingSetter from '../../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'
import CategoriesSidebar from '../../../components/includes/pages/Categories/CategoriesSidebar/CategoriesSidebar'
import {Sidebar} from '../../../components/includes/Sidebar/Sidebar'
import Footer from '../../../components/includes/Footer/Footer'
import { getAbsolutePath } from '../../../_variables/_variables'
import dataDecoder from '../../../server/tools/dataDecoder'

// import './categories.scss'import './categories.scss'

const categories = props => {

    const [ state, setState ] = useState({
        style: {}
    })
    useEffect(() => {
        if (props.identity.categoriesPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [ props ]);

    const renderCategories = props.categoriesSource.metas.map(meta => {
        return (
            <CategoryElement key={ props.categoriesSource.metas.indexOf(meta) } imageUrl={ meta.imageUrl } noImageUrl={ meta.noImageUrl } name={ meta.name } count={ meta.count }/>
        )
    })

    return (
        <>
            <AppLayout>
                <SiteSettingSetter  { ...props }/>
                <div style={ state.style } className={ props.identity.data.categoriesPageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div>
                        <div className='categories'>
                            { renderCategories }
                        </div>
                        <PaginationComponent
                            isActive={ true }
                            currentPage={ props.getCategoriesData.pageNo }
                            totalCount={ props.categoriesSource.totalCount }
                            size={ props.getCategoriesData.size }
                            maxPage={ Math.ceil(parseInt(props.categoriesSource.totalCount) / parseInt(props.getCategoriesData.size)) - 1 }
                            queryData={ props.query || props.router.query }
                            pathnameData={ props.pathname || props.router.pathname }
                        />
                    </div>
                    <Sidebar key='categoriesPageSidebar' isActive={ props.identity.data.categoriesPageSidebar } widgets={ props.widgets } position='categoriesPageSidebar'/>
                </div>
                <Footer widgets={ props.widgets } position='footer'/>
            </AppLayout>
        </>
    );
};

categories.getInitialProps = async ({ pathname, query, req }) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    const getCategoriesData = {
        type: 'category',
        searchForImageIn: 'categories',
        pageNo: parseInt(query.page) || 1,
        size: parseInt(query.size)  || 30,
        sort: query.sort || 'latest',
    }

    let widgets;
    let categoriesSource;
    let settings;

    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'categoriesPageSidebar', 'home', 'footer','header' ] }, true,domainName,'categoriesPage')
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true,domainName,'categoriesPage')
    const categoriesData = await getMeta(getCategoriesData,true,domainName)

    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    categoriesSource = categoriesData.data ? categoriesData.data : []

    return {  ...settings, query, categoriesSource, getCategoriesData, pathname, widgets }
}
export default withRouter(categories);
