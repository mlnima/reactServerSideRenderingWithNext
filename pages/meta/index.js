import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import {getAbsolutePath} from '../../_variables/_variables'
import {getMultipleSetting, getMultipleWidgetWithData} from '../../_variables/ajaxVariables'
import dataDecoder from '../../server/tools/dataDecoder'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import pluralize from 'pluralize'
import {getMeta} from '../../_variables/ajaxPostsVariables'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import withRouter from 'next/dist/client/with-router'
import MetaElement from '../../components/includes/MetaElement/MetaElement'
import {Sidebar} from '../../components/includes/Sidebar/Sidebar'
import Footer from '../../components/widgetsArea/Footer/Footer'
import {useRouter} from "next/router";

const meta = props => {
    const router = useRouter()
    const [state, setState] = useState({
        style: {}
    });

    useEffect(() => {
        if (props.identity.metaPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, []);



    const renderMetas = (props.metaSource.metas ?? []).map(meta => {

        return (
            <MetaElement key={props.metaSource.metas.indexOf(meta)} {...meta} />
        )
    })

    return (
        <AppLayout>
            <SiteSettingSetter  {...props} />
            <div style={state.style}
                 className={props.identity.data.metaPageSidebar ? 'content withSidebar' : 'content withOutSidebar'}>
                <div>
                    <PaginationComponent
                        isActive={true}
                        currentPage={props?.dataForGettingMeta?.page}
                        totalCount={props?.metaSource?.totalCount}
                        size={props?.dataForGettingMeta?.size}
                        maxPage={Math.ceil(parseInt(props?.metaSource?.totalCount) / parseInt(props?.dataForGettingMeta?.size))}
                        queryData={router.query}
                        pathnameData={router.pathname}
                    />
                    <div className={props.query.type + ' metas'}>
                        {renderMetas}
                    </div>
                    <PaginationComponent
                        isActive={true}
                        currentPage={props?.dataForGettingMeta?.page}
                        totalCount={props?.metaSource?.totalCount}
                        size={props?.dataForGettingMeta?.size}
                        maxPage={Math.ceil(parseInt(props?.metaSource?.totalCount) / parseInt(props?.dataForGettingMeta?.size))}
                        queryData={router.query}
                        pathnameData={router.pathname}
                    />
                </div>

                <Sidebar key='metaPageSidebar' isActive={props.identity.data.metaPageSidebar} widgets={props.widgets}
                         position='metaPageSidebar'/>
            </div>
            <Footer widgets={props.widgets} position='footer'/>
        </AppLayout>
    );
};


export const getServerSideProps = async ({req, query, res}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let errorCode = 200

    const dataForGettingMeta = {
        type: query.contentType?.includes('tags') ? 'tags' :
            query.contentType?.includes('categories') ? 'categories' :
                query.contentType?.includes('actors') ? 'actors' : '',

        searchForImageIn: query.contentType,
        page: parseInt(query.page) || 1,
        size: parseInt(query.size) || 30,
        sort: query.sort || 'latest',
        startWith: query.startWith || 'any',
        keyword: query.keyword || '',
        lang: query.lang || 'default'
    }

    let settings;
    let widgets;
    let metaSource;

    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'tagsPage')
    const widgetsData = await getMultipleWidgetWithData({widgets: ['metaPageSidebar', 'home', 'footer', 'header', 'topBar', 'navigation']}, domainName, true, 'tagsPage')
    const metaData = await getMeta(dataForGettingMeta, domainName, true)

    settings = settingsData.data.settings ? settingsData.data.settings : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}


    return {props: {...settings, query, widgets, metaSource, dataForGettingMeta}}
}


export default withRouter(meta);
