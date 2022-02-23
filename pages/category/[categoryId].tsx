import {getFirstLoadData} from '@_variables/ajaxVariables';
import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/Posts/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Link from "next/link";
import {useRouter} from "next/router";
import MetaDataToSiteHead from "@components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import capitalizeFirstLetter from "../../_variables/util/capitalizeFirstLetter";
import {getPosts} from "@store/clientActions/postsAction";
import {FC} from "react";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))


let StyledMain = styled.main`
  grid-area: main;
  width: 100%;
  
  .edit-as-admin{
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

  ${(props: { stylesData: string }) => props.stylesData}
`
const categoryPage: FC = () => {

    const userData = useSelector((store :StoreTypes) => store?.user?.userData)
    const category = useSelector((store: StoreTypes) => store.posts.categoryData)
    const categoryPageStyle = useSelector((store: StoreTypes) => store.settings.design?.categoryPageStyle ||'');
    const router = useRouter()

    return (
        <StyledMain className="main posts-page" stylesData={categoryPageStyle}>
            {userData?.role === 'administrator' ?
                <div className='edit-as-admin'>
                    <Link href={'/admin/meta?id=' + router.query.categoryId}>
                        <a className={'btn btn-primary'} >
                            Edit
                        </a>
                    </Link>
                </div>
                :null}
            {category ? <PostsPageInfo titleToRender={capitalizeFirstLetter(category?.name)}/> : null}
            {category ?
                <MetaDataToSiteHead title={category?.name}
                                    description={category?.description}
                                    url={`${router.asPath}`}
                                    image={category?.imageUrl}
                />
                : null
            }
            <WidgetsRenderer
                position={'categoryPageTop'}
            />
            <PostsPage/>
            <WidgetsRenderer
                position={'categoryBottom'}
            />
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const categoryId = context.query.categoryId as string
    if (!categoryId) return {notFound: true};
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};
    await getFirstLoadData(
        context.req,
        ['categoryPageTop', 'categoryPageLeftSidebar', 'categoryPageBottom', 'categoryPageRightSidebar'],
        store,
        context.locale
    );

    // @ts-ignore
    await store.dispatch(getPosts(context.query, context.query.categoryId, true,'categoryData'))
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
});

export default categoryPage;
