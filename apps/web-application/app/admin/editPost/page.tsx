// @ts-nocheck
'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import Link from 'next/link';
import TitleDescription from './components/TitleDescription/TitleDescription';
import ActionOnPost from './components/ActionOnPost/ActionOnPost';
import Format from './components/Format';
import Meta from './components/Meta';
import RatingOption from './components/RatingOption';
import PostInformation from './components/PostInformation/PostInformation';
import { useAppSelector } from '@storeDashboard/hooks';
import {
  changeActiveEditingLanguage,
} from '@storeDashboard/reducers/postsReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { LanguagesOptions } from '@repo/ui';
import { isNumericString } from '@repo/utils';
import Author from './components/Author';
import { useSearchParams } from 'next/navigation';
import './styles.scss';
import dashboardGetPost from '@lib/actions/database/operations/posts/dashboardGetPost';
import { IPost } from '@repo/typescript-types';


const EditPostPage = () => {

  //const post = useAppSelector(({ posts }) => posts.post);

  const [post, setPost] = useState<IPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IPost | null>(null);
  const activeEditingLanguage = useAppSelector(({ posts }) => posts.activeEditingLanguage);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const languageElement = useRef(null);

  const getPostData = async (_id) => {
    const { data, success, message } = await dashboardGetPost(_id);
    if (!success) {
      return;
    }
    setPost(data?.post);
  };


  useEffect(() => {
    const _id = searchParams.get('id');
    if (_id) {
      getPostData(_id);
    } else {
      setPost({
        postType: 'standard',
      });
    }
  }, [searchParams]);


  useEffect(() => {
    console.log(post);
  }, [post]);


  const onChangeHandler = (e: { target: { name: any; value: any } }) => {
    setPost(prevState => ({
      ...prevState,
      [e.target.name]: isNumericString(e.target.value) ? parseInt(e.target.value) : e.target.value,
    }));
  };


  const onTranslatedInputChangeHandler = (e: { target: any }) => {
    if (activeEditingLanguage === 'default') {
      setPost(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      setPost(prevState => ({
        ...prevState,
        translations: {
          ...(post?.translations || {}),
          [activeEditingLanguage]: {
            ...(post?.translations?.[activeEditingLanguage] || {}),
            [e.target.name]: e.target.value,
          },
        },
      }));
    }
  };

  const onDescriptionChangeHandler = (data: string) => {
    const e = { target: { name: 'description', value: data } };
    onTranslatedInputChangeHandler(e);
  };

  if (!post) {
    return <h1>Not Found</h1>;
  }

  return (
    <div className={'EditPostPage'}>
      <div className={'content'}>
        <div className="language-action">
          <Link href={'/dashboard/post?new=1'} className={'btn btn-info'}>
            New Post
          </Link>
          <select className={'primarySelect language-selector'} ref={languageElement}
                  onChange={(e) => dispatch(changeActiveEditingLanguage(e.target.value as string))}>
            <option value={'default'}>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'Default'}</option>
            <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''} />
          </select>
        </div>
        <TitleDescription onChangeHandler={onTranslatedInputChangeHandler}
                          post={post}
                          onDescriptionChangeHandler={onDescriptionChangeHandler}
                          onTranslatedInputChangeHandler={onTranslatedInputChangeHandler} />
        <PostInformation onChangeHandler={onChangeHandler} post={post} relatedPosts={relatedPosts} />
      </div>
      <aside className={'side'}>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>
            <span>Status:</span>
            <span>{post?.status}</span>
          </div>
          <ActionOnPost post={post}  />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Format:</div>
          <Format post={post} onChangeHandler={onTranslatedInputChangeHandler} />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Author:</div>
          <Author post={post} onChangeHandler={onTranslatedInputChangeHandler} />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Categories:</div>
          <Meta type={'categories'} post={post} onChangeHandler={onTranslatedInputChangeHandler} />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Tags:</div>
          <Meta type={'tags'} post={post} onChangeHandler={onTranslatedInputChangeHandler} />
        </div>
        {post?.postType === 'video' && (
          <div className={'editingPostSection editingPostSectionSide'}>
            <div className={'editingPostSectionTitle'}>Actors:</div>
            <Meta type={'actors'} post={post} onChangeHandler={onTranslatedInputChangeHandler} />
          </div>
        )}
        <div className={'editingPostSection editingPostSectionSide'}>
          <RatingOption post={post} onChangeHandler={onTranslatedInputChangeHandler} />
        </div>
      </aside>
    </div>
  );
};

export default EditPostPage;

// const onChangeHandler = (e: { target: { name: any; value: any } }) => {
//   if (isNumericString(e.target.value)) {
//     dispatch(editPostAction({ [e.target.name]: parseInt(e.target.value) }));
//   } else {
//     dispatch(editPostAction({ [e.target.name]: e.target.value }));
//   }
// };

// const onTranslatedInputChangeHandler = (e: { target: any }) => {
//   if (activeEditingLanguage === 'default') {
//     dispatch(
//       editPostAction({ [e.target.name]: e.target.value }),
//     );
//   } else {
//     dispatch(
//       editPostAction({
//         translations: {
//           ...(post?.translations || {}),
//           [activeEditingLanguage]: {
//             ...(post?.translations?.[activeEditingLanguage] || {}),
//             [e.target.name]: e.target.value,
//           },
//         },
//       }),
//     );
//   }
// };