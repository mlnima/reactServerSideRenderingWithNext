import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsPage/PostsPageInfo";
import dynamic from "next/dynamic";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import Link from "next/link";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import fetchPosts from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPosts";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const WidgetsRenderer = dynamic(() => import('@components/includes/WidgetsRenderer/WidgetsRenderer'))

let PageStyle = styled.div`

  width: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({tagPageStyle}: { tagPageStyle: string }) => tagPageStyle || ''}
`
const tagPage = () => {

    const {role, tag, tagPageStyle, sidebar} = useSelector(({user, posts, settings}: Store) => {
        return {
            role: user?.userData?.role,
            tag: posts.tagData,
            tagPageStyle: settings.design?.tagPageStyle,
            sidebar: settings?.identity?.tagPageSidebar
        }
    })

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} tagPageStyle={tagPageStyle}>
            <main id={'primary'} className="main posts-page">
                {role === 'administrator' ?
                    <div className='edit-as-admin'>
                        <Link href={'/admin/meta?id=' + tag._id}>
                            <a className={'btn btn-primary'} target={'_blank'}>
                                Edit
                            </a>
                        </Link>
                    </div>
                    : null}
                {!!tag && <PostsPageInfo titleEntry={tag.name}/> }


                <WidgetsRenderer
                    position={'tagPageTop'}
                />
                <PostsPage renderPagination={true}/>
                <WidgetsRenderer
                    position={'tagPageBottom'}
                />
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'tagPage'}/>
        </PageStyle>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'tagPageTop',
            'tagPageLeftSidebar',
            'tagPageBottom',
            'tagPageRightSidebar'
        ], {
            page: 'tag',
            setHeadData: false
        },
        store)

    await store.dispatch(
        fetchPosts({
                context,
                metaId: context?.query?.tagId as string,
                metaType: 'tags',
                options: {
                    page: 'tag',
                    setHeadData:true
                }
            }
        ))


    return null
});

export default tagPage;

