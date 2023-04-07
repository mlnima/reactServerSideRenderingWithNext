import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import React from "react";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import MetasRenderer from "../../components/pagesIncludes/metas/MetasRenderer";
import getTagsAction from "@store_toolkit/clientReducers/postsReducers/getTagsAction";
import {useRouter} from "next/router";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import textContentReplacer from "custom-util/src/string-util/textContentReplacer";
import {getTextDataWithTranslation} from "custom-util";

const PageStyle = styled.div`
  ${({customStyles}: { customStyles?: string }) => customStyles || ''}
`

const tagsPage = () => {
    const {locale} = useRouter()
    const metas = useSelector(({posts}: Store) => posts?.tagsMetas)
    const currentPageSettings = useSelector(({settings}: Store) => settings?.currentPageSettings)
    const headDataSettings = useSelector(({settings}: Store) => settings?.initialSettings?.headDataSettings)

    return (
        <PageStyle id={'content'} className={`page-${currentPageSettings?.sidebar || 'no'}-sidebar `}
                   customStyles={currentPageSettings?.customStyles}>
            <HeadSetter title={currentPageSettings?.title ?
                textContentReplacer(currentPageSettings?.title,
                    {name: undefined, count: undefined, siteName: headDataSettings.siteName}
                ) : getTextDataWithTranslation(locale as string, 'title', currentPageSettings)}/>
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer position={'tagsPageTop'}/>
                <MetasRenderer metaData={metas} metaType={'tags'}/>

                <WidgetsRenderer position={'tagsPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={currentPageSettings?.sidebar} position={'tagsPage'}/>
        </PageStyle>
    );
};
//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'tagsPageTop',
            'tagsPageLeftSidebar',
            'tagsPageBottom',
            'tagsPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'tagsPage'
        },
        store
    )

    await store.dispatch(getTagsAction({data: context.query}))

    return null

});

export default tagsPage;


