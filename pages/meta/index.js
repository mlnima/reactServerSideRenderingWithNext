import React, {useContext} from 'react';
import {getFirstLoadData, getMultipleWidgetWithData} from '../../_variables/ajaxVariables'
import {getMeta} from '../../_variables/ajaxPostsVariables'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import MetaElement from '../../components/includes/MetaElement/MetaElement'
import {useRouter} from "next/router";
import {AppContext} from "../../context/AppContext";

const meta = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const renderMetas = (props.metaSource.metas ?? []).map(meta => {
        return (
            <MetaElement key={props.metaSource.metas.indexOf(meta)} {...meta} />
        )
    })


    const isWithSidebar = props?.identity?.data?.metaPageSidebar || contextData?.siteIdentity?.metaPageSidebar

    return (

            <div style={{gridArea: isWithSidebar ? 'main' : ''}} className={isWithSidebar ? 'content main ' : 'content main '}>
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

    );
};


export const getServerSideProps = async ({req, query, res}) => {
    const firstLoadData = await getFirstLoadData(req)
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
    const widgetsData = await getMultipleWidgetWithData({widgets: ['metaPageSidebar']}, firstLoadData.domainName, true, 'tagsPage')
    const metaData = await getMeta(dataForGettingMeta, firstLoadData.domainName, true)
    const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {props: {...firstLoadData.settings, query, isMobile: Boolean(firstLoadData.isMobile), widgets, metaSource, dataForGettingMeta,referer:firstLoadData.referer}}
}


export default meta;
