import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import TagsRenderer from "../../components/includes/TagsPage/Components/TagsRenderer/TagsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const tagsPage = ({metaSource, identity, dataForGettingMeta,design,widgets,referer,isMobile}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const isWithSidebar = identity?.data?.metaPageSidebar || contextData?.siteIdentity?.metaPageSidebar
    return (
        <div className={isWithSidebar ? 'content main ' : 'content main '}>
            <style jsx>{`
                .content{
                  grid-area:main;
                }
                .tags{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    max-width: 100%;
                }
            `}</style>
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w=>w.data.position === 'tagsPageTop' )}
                position={'tagsPageTop'}
                referer={referer}
                currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
            <PaginationComponent
                isActive={true}
                currentPage={dataForGettingMeta?.page}
                totalCount={metaSource?.totalCount}
                size={dataForGettingMeta?.size}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(dataForGettingMeta?.size))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <TagsRenderer tags={metaSource?.metas || []} postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>

            <PaginationComponent
                isActive={true}
                currentPage={dataForGettingMeta?.page}
                totalCount={metaSource?.totalCount}
                size={dataForGettingMeta?.size}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(dataForGettingMeta?.size))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w=>w.data.position === 'tagsPageBottom' )}
                position={'tagsPageBottom'}
                referer={referer}
                currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['tagsPageTop','tagsPageLeftSidebar','tagsPageBottom','tagsPageRightSidebar'], 'tagsPage')
    const dataForGettingMeta = {
        metaType: 'tags',
        page: parseInt(context.query?.page) || 1,
        size: parseInt(context.query?.size) || 30,
        sort: context.query?.sort || null,
        startWith: context.query?.startWith || 'any',
        keyword: context.query?.keyword || null,
        lang: context.query?.lang || 'default',
        status: 'published'
    }
    const metaData = await getMultipleMeta(dataForGettingMeta, firstLoadData.domainName, true, context.query.metaType)
    const widgets = firstLoadData.widgets
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
             ...firstLoadData.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            widgets,
            metaSource,
            dataForGettingMeta,
            referer: firstLoadData.referer
    }}
}

export default tagsPage;
