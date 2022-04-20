import React, {FC} from "react";
import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsRenderer/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {getPosts} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

let StyledMain = styled.main`
  grid-area: main;
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
const tagPage: FC = () => {

    const {role, tag, tagPageStyle} = useSelector(({user, posts, settings}: StoreTypes) => {
        return {
            role: user?.userData?.role,
            tag: posts.tagData,
            tagPageStyle: settings.design?.tagPageStyle,
        }
    })

    return (
        <StyledMain id={'main-content'} className="main posts-page" tagPageStyle={tagPageStyle}>
            {role === 'administrator' ?
                <div className='edit-as-admin'>
                    <Link href={'/admin/meta?id=' + tag._id}>
                        <a className={'btn btn-primary'}>
                            Edit
                        </a>
                    </Link>
                </div>
                : null}
            {tag ? <PostsPageInfo metaData={tag}/> : null}


            <WidgetsRenderer
                position={'tagPageTop'}
            />
            <PostsPage/>
            <WidgetsRenderer
                position={'tagPageBottom'}
            />
        </StyledMain>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    // const tagId = context.query.tagId as string;
    // if (!tagId) return {notFound: true};
    // if (!tagId?.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'tagPageTop',
            'tagPageLeftSidebar',
            'tagPageBottom',
            'tagPageRightSidebar'
        ]))

    // @ts-ignore
    await store.dispatch(getPosts(context, context.query.tagId, true, 'tags', {page: 'tag'}))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            // query: context.query,
        }
    }
});

export default tagPage;

//import MetaDataToSiteHead from "@components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
// {storeData.tag ?
//     <MetaDataToSiteHead title={storeData.tag?.name}
//                         description={storeData.tag?.description}
//                         url={`${asPath}`}
//                         image={storeData.tag?.imageUrl}
//     />
//     : null
// }