import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import React from "react";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasRenderer from "../../components/pagesIncludes/metas/MetasRenderer";
import getTagsAction from "@store_toolkit/clientReducers/postsReducers/getTagsAction";
import {useRouter} from "next/router";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {textContentReplacer} from "custom-util";
import {getTextDataWithTranslation} from "custom-util";
import {useAppSelector} from "@store_toolkit/hooks";

interface IStyles{
    customStyles?: string
}

const PageStyle = styled.div<IStyles>`
  ${({customStyles}) => customStyles || ''}
`

const tagsPage = () => {
    const {locale} = useRouter()
    const metas = useAppSelector(({posts}) => posts?.tagsMetas)
    const currentPageSettings = useAppSelector(({settings}) => settings?.currentPageSettings)
    const headDataSettings = useAppSelector(({settings}) => settings?.initialSettings?.headDataSettings)

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

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

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

    return {
        props: {}
    }

});

export default tagsPage;


