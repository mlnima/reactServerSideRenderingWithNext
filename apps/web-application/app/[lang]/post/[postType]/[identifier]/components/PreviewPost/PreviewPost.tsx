'use client';
import { FC, useEffect } from 'react';
import { IPost } from '@repo/typescript-types';
import { IWidget } from '@repo/typescript-types';
import dynamic from 'next/dynamic';
import Csr from '@components/global/Csr';
import { useAppSelector } from '@store/hooks';
import NotFoundOrRestricted from '../NotFoundOrRestricted/NotFoundOrRestricted';

const VideoTypePostPage = dynamic(() => import('../VideoTypePostPage/VideoTypePostPage'));
const ArticleTypePostPage = dynamic(() => import('../ArticleTypePostPage/ArticleTypePostPage'));
const PromotionTypePostPage = dynamic(() => import('../PromotionTypePostPage/PromotionTypePostPage'));
const LearnTypePostPage = dynamic(() => import('../LearnTypePostPage/LearnTypePostPage'));


// import VideoTypePostPage from "../VideoTypePostPage/VideoTypePostPage";
// import LearnTypePostPage from "../LearnTypePostPage/LearnTypePostPage";
// import ArticleTypePostPage from "../ArticleTypePostPage/ArticleTypePostPage";
// import PromotionTypePostPage from "../PromotionTypePostPage/PromotionTypePostPage";

interface IProps {
  post: IPost,
  locale: string,
  sidebar: string,
  postType: string,
  views: number,
  likes: number,
  dictionary: {
    [key: string]: string
  },

  widgets: {
    [key: string]: IWidget[]
  }

  relatedPosts: IPost[],
}

const PreviewPost: FC<IProps> =
  ({
     post,
     locale,
     dictionary,
     relatedPosts,
     sidebar,
     widgets,
     postType,
     views,
     likes,
   }) => {
    const { userData } = useAppSelector(({ user }) => user);
    const { loggedIn } = useAppSelector(({ user }) => user);

    useEffect(() => {
      console.log(`userData?._id === post?.author?._id=> `,userData?._id === post?.author?._id);
      console.log(`userData?.role === 'administrator'`,userData?.role === 'administrator');
    }, []);

    if (
      (userData?._id === post?.author?._id || userData?.role === 'administrator') &&
      loggedIn) {
      return (
        <>
          {/*<Csr>*/}
            {
              postType === 'video' ?
                <VideoTypePostPage widgets={widgets?.['underPost']}
                                   post={post}
                                   views={views}
                                   likes={likes}
                                   hasSidebar={sidebar}
                                   relatedPosts={relatedPosts}
                                   dictionary={dictionary}
                                   locale={locale} /> :
                postType === 'article' ?
                  <ArticleTypePostPage widgets={widgets?.['underPost']}
                                       post={post}
                                       views={views}
                                       likes={likes}
                                       hasSidebar={sidebar}
                                       relatedPosts={relatedPosts}
                                       dictionary={dictionary} locale={locale} /> :
                  postType === 'promotion' ?
                    <PromotionTypePostPage widgets={widgets?.['underPost']}
                                           post={post}
                                           views={views}
                                           likes={likes}
                                           hasSidebar={sidebar}
                                           relatedPosts={relatedPosts}
                                           dictionary={dictionary}
                                           locale={locale} /> : postType === 'learn' ?
                      <LearnTypePostPage widgets={widgets?.['underPost']}
                                         post={post}
                                         views={views}
                                         likes={likes}
                                         hasSidebar={sidebar}
                                         relatedPosts={relatedPosts}
                                         dictionary={dictionary} locale={locale} /> : null
            }
          {/*</Csr>*/}
        </>

      );
    } else {
      return (
        <NotFoundOrRestricted dictionary={dictionary} />
      );
    }


  };
export default PreviewPost;

// <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
//
//
//     <main id={'primary'} className={'main postPage'}>


// {/*    </main>*/}
// {/*    <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['postPageLeftSidebar']}*/}
// {/*                               rightSideWidgets={widgetsData.widgets?.['postPageRightSidebar']}*/}
// {/*                               dictionary={dictionary}*/}
// {/*                               locale={locale}*/}
// {/*                               sidebar={sidebar || 'no'}*/}
// {/*                               position={'postPage'}/>*/}
// {/*</div>*/}
// {/*</Csr>*/}