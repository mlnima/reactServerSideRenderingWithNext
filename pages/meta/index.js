import React, {useEffect, useState} from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import {getAbsolutePath} from '../../_variables/_variables'
import {getMultipleSetting, getMultipleWidgetWithData} from '../../_variables/ajaxVariables'
import {getMeta} from '../../_variables/ajaxPostsVariables'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import MetaElement from '../../components/includes/MetaElement/MetaElement'
import {useRouter} from "next/router";
//import './meta.scss'


const meta = props => {
    const router = useRouter()
    const renderMetas = (props.metaSource.metas ?? []).map(meta => {
        return (
            <MetaElement key={props.metaSource.metas.indexOf(meta)} {...meta} />
        )
    })

    return (
        <AppLayout  {...props} sidebar={props.identity?.data?.metaPageSidebar} sidebarPosition='metaPageSidebar'>
            <div style={{gridArea: props.identity.metaPageSidebar ? 'content' : ''}} className={props.identity.data.metaPageSidebar ? 'content main ' : 'content main '}>
                <PaginationComponent
                    isActive={true}
                    currentPage={props?.dataForGettingMeta?.page}
                    totalCount={props?.metaSource?.totalCount}
                    size={props?.dataForGettingMeta?.size} W
                    maxPage={Math.ceil(parseInt(props?.metaSource?.totalCount) / parseInt(props?.dataForGettingMeta?.size))}
                    queryData={router.query}
                    pathnameData={router.pathname}
                />
                <div className={router.query.contentType + ' metas'}>
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
        </AppLayout>
    );
};


//
// export async function getStaticPaths() {
//     return {
//         // Only `/posts/1` and `/posts/2` are generated at build time
//         paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//         // Enable statically generating additional pages
//         // For example: `/posts/3`
//         fallback: true,
//     }
// }
//










export const getServerSideProps = async ({req, query, res}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let errorCode = 200

    const contentTypeSource = query?.contentType || req?.headers?.referer || req?.originalUrl
    const typeData=  contentTypeSource.includes('tags') ? 'tags' :
                     contentTypeSource.includes('categories')? 'categories' :
                     contentTypeSource.includes('actors')? 'actors' : ''


    const dataForGettingMeta = {
        type: typeData,

        searchForImageIn: query.contentType||typeData,
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
    let isMobile = (req
        ? req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

    return {props: {...settings, query, isMobile: Boolean(isMobile), widgets, metaSource, dataForGettingMeta}}
}


export default meta;
