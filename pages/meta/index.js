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
                size={props?.dataForGettingMeta?.size}
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


export const getServerSideProps = async ({req, query}) => {
    const firstLoadData = await getFirstLoadData(req)
    const dataForGettingMeta = {
        metaType: query.metaType,
        page: parseInt(query?.page) || 1,
        size: parseInt(query?.size) || 30,
        sort: query?.sort || null,
        startWith: query?.startWith || 'any',
        keyword: query?.keyword || null,
        lang: query?.lang || 'default',
        status: 'published'
    }
    const widgetsData = await getMultipleWidgetWithData({widgets: ['metaPageLeftSidebar', 'metaPageRightSidebar']}, firstLoadData.domainName, true, 'metaPage')
    const metaData = await getMeta(dataForGettingMeta, firstLoadData.domainName, true, query.metaType)
    const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {props: {...firstLoadData.settings, query, isMobile: Boolean(firstLoadData.isMobile), widgets, metaSource, dataForGettingMeta, referer: firstLoadData.referer}}
}


export default meta;
