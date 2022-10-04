import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsPage/PostsPageInfo";
import dynamic from "next/dynamic";
import Link from "next/link";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import fetchPosts from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPosts";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import getAppLayout from "@components/layouts/getAppLayout";

const WidgetsRenderer = dynamic(() => import('@components/includes/WidgetsRenderer/WidgetsRenderer'))

let PageStyle = styled.div`
  width: 100%;

  .edit-as-admin {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({categoryPageStyle}: { categoryPageStyle: string }) => categoryPageStyle || ''}
`

const categoryPage = () => {

    const {role, category, categoryPageStyle, sidebar} = useSelector(({user, posts, settings}: Store) => {
        return {
            role: user?.userData?.role,
            category: posts.categoryData ,
            categoryPageStyle: settings.design?.categoryPageStyle,
            sidebar: settings?.identity?.categoryPageSidebar
        }
    })

    return (

        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} categoryPageStyle={categoryPageStyle}>

            <main id={'primary'} className="main posts-page">
                {category?.name && <PostsPageInfo titleEntry={category.name}/>}
                <WidgetsRenderer position={'categoryPageTop'}/>
                <PostsPage renderPagination={true}/>
                <WidgetsRenderer position={'categoryPageBottom'}/>
                {role === 'administrator' &&
                <div className='edit-as-admin'>
                    <Link href={'/admin/meta?id=' + category?._id}>
                        <a className={'btn btn-primary'}>
                            Edit
                        </a>
                    </Link>
                </div>
                }
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'categoryPage'}/>
        </PageStyle>

    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {


    await store.dispatch(
        fetchPosts({
                context,
                metaId: context?.query?.categoryId as string,
                metaType: 'categories',
                options: {
                    page: 'category',
                    setHeadData:true
                }
            }
        ))

    await _getServerSideStaticPageData(
        context,
        [
            'categoryPageTop',
            'categoryPageLeftSidebar',
            'categoryPageBottom',
            'categoryPageRightSidebar'
        ],
        {
            page:'category',
            setHeadData:false
        },
        store
    )



    return null
});


// export async function getServerSideProps(context) {
//     return {
//         props: {}, // will be passed to the page component as props
//     }
// }





// categoryPage.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <AppLayout>
//             {page}
//         </AppLayout>
//     )
// }

// categoryPage.getLayout = page=> getAppLayout(page)

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addCount: fetchPosts(addCount, dispatch),
//         startClock: bindActionCreators(startClock, dispatch),
//     }
// }

export default categoryPage;

// export default connect(null, mapDispatchToProps)(categoryPage)