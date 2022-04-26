import {useRouter} from "next/router";
import PaginationComponent from "@components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import TagsRenderer from "../../components/includes/pagesComponents/tagsPageComponents/Components/TagsRenderer/TagsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import { StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "@store/store";
import {getMetas} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";

const TagsPageStyledMain = styled.main`
  grid-area: main;
  ${({tagsPageStyle}: { tagsPageStyle: string }) => tagsPageStyle || ''}
`

const tagsPage = () => {

    const {query} = useRouter()

    const {totalCount,tagsPageStyle} = useSelector(({settings,posts}: StoreTypes) =>{
        return{
            totalCount:posts.totalCount,
            tagsPageStyle:settings?.design.tagsPageStyle
        }
    })

    const postsCountPerPage = query?.size ? parseInt(query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <TagsPageStyledMain id={'main-content'} className={'content main '} tagsPageStyle={tagsPageStyle}>
            <WidgetsRenderer position={'tagsPageTop'}/>
            <TagsRenderer  cardWidthDesktop={undefined} />
            <PaginationComponent
                isActive={true}
                currentPage={query?.page ? parseInt(query?.page as string) : 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount/ postsCountPerPage)}
            />
            <WidgetsRenderer position={'tagsPageBottom'}/>
        </TagsPageStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'tagsPageTop',
            'tagsPageLeftSidebar',
            'tagsPageBottom',
            'tagsPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'tags'
        },
        store
    ))

    // @ts-ignore
    await  store.dispatch(getMetas(context.query, 'tags', true))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }

});

tagsPage.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default tagsPage;
