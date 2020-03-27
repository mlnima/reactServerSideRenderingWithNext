import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from "../../../components/layouts/AppLayout";
import { getSetting } from '../../../_variables/ajaxVariables'
import { AppContext } from '../../../context/AppContext'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import withRouter from 'next/dist/client/with-router';
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement';
import RenderMetaDataPages from '../../../components/includes/RenderMetaDataPages/RenderMetaDataPages'
import SiteSettingSetter from '../../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import PaginationComponent from '../../../components/includes/PaginationComponent/PaginationComponent'

// import './categories.scss'import './categories.scss'

const categories = props => {

    useEffect(() => {
        console.log(props)
    }, [ props ]);

    const renderCategories = props.categoriesSource.metas.map(meta => {
        return (
            <CategoryElement key={ meta._id } imageUrl={ meta.imageUrl } noImageUrl={ meta.noImageUrl } name={ meta.name } count={ meta.count }/>
        )
    })

    return (
        <>
            <AppLayout>
                <SiteSettingSetter  { ...props }/>
                <div className='categories'>
                    { renderCategories }
                </div>
                <PaginationComponent
                    isActive={ true }
                    currentPage={props.getCategoriesData.pageNo }
                    totalCount={ props.categoriesSource.totalCount }
                    size={ props.getCategoriesData.size }
                    maxPage={ Math.ceil(parseInt(props.categoriesSource.totalCount) / parseInt(props.getCategoriesData.size))- 1 }
                    queryData={props.query || props.router.query}
                    pathnameData={props.pathname ||props.router.pathname }
                />
            </AppLayout>
        </>
    );
};

categories.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let categoriesSource;
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');
    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}

    const getCategoriesData = {
        type: 'category',
        searchForImageIn:'categories',
        pageNo: parseInt(query.page) || 1,
        size: parseInt(query.size) || parseInt(identity.tagsCountPerPage) ||30,
        sort: query.sort || 'latest',

    }
    const categoriesData = await getMeta(getCategoriesData)
    categoriesSource = categoriesData.data ? categoriesData.data : []
    return { identity, navigation, query, categoriesSource,getCategoriesData,pathname }
}
export default withRouter(categories);
