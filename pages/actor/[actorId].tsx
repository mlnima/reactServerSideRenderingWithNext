import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {getFirstLoadData} from "@_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import MetaDataToSiteHead from "@components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {useRouter} from "next/router";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {getPosts} from "@store/clientActions/postsAction";
import {FC} from "react";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))
const ActorBio = dynamic(() => import('../../components/includes/pagesComponents/actorsPageComponents/Components/ActorBio/ActorBio'))

const StyledMain = styled.main`
  
  grid-area: main;
  width: 100%;
  height: 100%;
  .posts-page-info {
    margin: 5px 0;
    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }
  ${(props: { stylesData: string }) => props.stylesData || ''}
  
`

const actorPage: FC = () => {
    const role = useSelector((store :StoreTypes) => store?.user?.userData.role)
    const actor = useSelector((store: StoreTypes) => store?.posts?.actorData)
    const actorPageStyle = useSelector((store: StoreTypes) => store?.settings?.design?.actorPageStyle || '');
    const router = useRouter()

    return (

        <StyledMain className="main posts-page" stylesData={actorPageStyle}>
            {role === 'administrator' ?
                <div className='edit-as-admin'>
                    <Link href={'/admin/meta?id=' + router.query.actorId}>
                        <a className={'btn btn-primary'} >
                            Edit
                        </a>
                    </Link>
                </div>
                :null}
            {actor ? <MetaDataToSiteHead title={actor.name} description={actor.description} url={`${router.asPath}`} image={actor.imageUrl}/> : null}
            <ActorBio/>
            <WidgetsRenderer
                position='actorPageTop'
            />
            <PostsPage/>
            <WidgetsRenderer
                position='actorPageBottom'
            />
        </StyledMain>

    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const actorId = context.query.actorId as string
    if (!actorId) return {notFound: true};
    if (!actorId.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};
    await getFirstLoadData(
        context.req,
        ['actorPageTop', 'actorPageLeftSidebar', 'actorPageBottom', 'actorPageRightSidebar'],
        store,
        context.locale
    );
    // @ts-ignore
    await store.dispatch(getPosts(context.query, context.query.actorId, true,'actorData'))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
});


export default actorPage;
