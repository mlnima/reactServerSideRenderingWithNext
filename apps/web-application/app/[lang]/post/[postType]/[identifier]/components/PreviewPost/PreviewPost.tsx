'use client';
import { FC } from 'react';
import {  PostPageProps } from '@repo/typescript-types';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@store/hooks';
import NotFoundOrRestricted from '../NotFoundOrRestricted/NotFoundOrRestricted';

const VideoTypePostPage = dynamic(() => import('../VideoTypePostPage/VideoTypePostPage'));
const ArticleTypePostPage = dynamic(() => import('../ArticleTypePostPage/ArticleTypePostPage'));
const PromotionTypePostPage = dynamic(() => import('../PromotionTypePostPage/PromotionTypePostPage'));
const LearnTypePostPage = dynamic(() => import('../LearnTypePostPage/LearnTypePostPage'));

const PreviewPost: FC<PostPageProps> = (props) => {
    const { userData } = useAppSelector(({ user }) => user);
    const { loggedIn } = useAppSelector(({ user }) => user);

    if (
      (userData?._id === props.post?.author?._id || userData?.role === 'administrator') &&
      loggedIn) {
      return (
        <>
            {
              props.postType === 'video' ?
                <VideoTypePostPage {...props} /> :
                props.postType === 'article' ?
                  <ArticleTypePostPage {...props} /> :
                  props.postType === 'promotion' ?
                    <PromotionTypePostPage {...props} /> :
                    props.postType === 'learn' ?
                      <LearnTypePostPage {...props} /> : null
            }
        </>

      );
    } else {
      return (
        <NotFoundOrRestricted dictionary={props.dictionary} />
      );
    }


  };
export default PreviewPost;

