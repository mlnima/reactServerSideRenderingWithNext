import {useContext, useEffect} from 'react';
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {getMeta} from '../../_variables/ajaxPostsVariables'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import MetaElement from '../../components/includes/MetaElement/MetaElement'
import {useRouter} from "next/router";
import {AppContext} from "../../context/AppContext";
// import Posts from "../../components/includes/Posts/Posts";
// postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
const meta = ({metaSource, identity, dataForGettingMeta,design}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const renderMetas = (metaSource.metas ?? []).map(meta => {
        return (
            <MetaElement
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                key={metaSource.metas.indexOf(meta)}
                {...meta}
            />
        )
    })

    const isWithSidebar = identity?.data?.metaPageSidebar || contextData?.siteIdentity?.metaPageSidebar
//style={{gridArea: isWithSidebar ? 'main' : ''}}
    return (
        <div className={isWithSidebar ? 'content main ' : 'content main '}>
            <style jsx>{`
                .content{
                  grid-area:main;
                }
                .metas{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: flex-start;
                }
            `}</style>
            <PaginationComponent
                isActive={true}
                currentPage={dataForGettingMeta?.page}
                totalCount={metaSource?.totalCount}
                size={dataForGettingMeta?.size}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(dataForGettingMeta?.size))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <div className={router.query?.metaType + ' metas'}>

                {renderMetas}
            </div>
            <PaginationComponent
                isActive={true}
                currentPage={dataForGettingMeta?.page}
                totalCount={metaSource?.totalCount}
                size={dataForGettingMeta?.size}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(dataForGettingMeta?.size))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
        </div>

    );
};
export const getServerSideProps = async ({req, query}) => {
    const firstLoadData = await getFirstLoadData(req, ['metaPageLeftSidebar', 'metaPageRightSidebar'], 'metaPage')
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
    // const widgetsData = await getMultipleWidgetWithData({widgets: ['metaPageLeftSidebar', 'metaPageRightSidebar']}, firstLoadData.domainName, true, 'metaPage')
    const metaData = await getMeta(dataForGettingMeta, firstLoadData.domainName, true, query.metaType)
    const widgets = firstLoadData.widgets
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {props: {...firstLoadData.settings, query, isMobile: Boolean(firstLoadData.isMobile), widgets, metaSource, dataForGettingMeta, referer: firstLoadData.referer}}
}


export default meta;
