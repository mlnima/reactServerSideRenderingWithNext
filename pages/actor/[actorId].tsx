import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import {useRouter} from "next/router";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {getPosts} from "@store/clientActions/postsAction";
import {FC} from "react";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))
const ActorBio = dynamic(() =>
    import('../../components/includes/pagesComponents/actorsPageComponents/Components/ActorBio/ActorBio'))

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

    const {query,asPath} = useRouter()

    const actorPageData = useSelector(({posts,user,settings} :StoreTypes)=>{
        return{
            actor:posts?.actorData,
            role:user?.userData.role,
            actorPageStyle: settings?.design?.actorPageStyle || ''
        }
    })

    return (

        <StyledMain className="main posts-page" stylesData={actorPageData.actorPageStyle}>
            {actorPageData.role === 'administrator' ?
                <div className='edit-as-admin'>
                    <Link href={'/admin/meta?id=' + query.actorId}>
                        <a className={'btn btn-primary'} >
                            Edit
                        </a>
                    </Link>
                </div>
                :null}

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
    if (!actorId?.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'actorPageTop',
            'actorPageLeftSidebar',
            'actorPageBottom',
            'actorPageRightSidebar'
        ]
    ))
//@ts-ignore
    await store.dispatch(getPosts(context, context.query.actorId, true,'actors',{page:'actor'}))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }
});


export default actorPage;

//import MetaDataToSiteHead from "@components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
// {actorPageData.actor ? <MetaDataToSiteHead title={actorPageData.actor.name}
//                                            description={actorPageData.actor.description}
//                                            url={`${asPath}`}
//                                            image={actorPageData.actor.imageUrl}
//     />
//     : null
// }