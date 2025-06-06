'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import TitleDescription from './components/TitleDescription/TitleDescription';
import ActionOnPost from './components/ActionOnPost/ActionOnPost';
import Format from './components/Format/Format';
import Meta from './components/Meta/Meta';
import RatingOption from './components/RatingOption';
import PostInformation from './components/PostInformation/PostInformation';
import LanguagesOptions from '@components/global/LanguagesOptions';
import { isNumericString } from '@repo/utils';
import Author from './components/Author';
import { useSearchParams } from 'next/navigation';
import './styles.scss';
import dashboardGetPost from '@lib/actions/database/posts/dashboardGetPost';
import { IPost } from '@repo/typescript-types';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useAppDispatch } from '@store/hooks';
import postDataScrappers from '@lib/actions/scrapers/postDataScrappers';
import findAnotherSimilarSourceLink from '@lib/actions/scrapers/findAnotherSimilarSourceLink';


const EditPostPage = () => {

  const [post, setPost] = useState<IPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IPost[] | null>(null);
  const [activeEditingLanguage, setActiveEditingLanguage] = useState<string | 'default'>('default');
  const searchParams = useSearchParams();
  const languageElement = useRef(null);
  const dispatch = useAppDispatch();

  const getPostData = async (_id: string) => {
    const { data, success } = await dashboardGetPost(_id);
    console.log(`data=> `, data);
    if (!success || !data?.post) {
      return;
    }
    setPost(data.post);
  };


  useEffect(() => {
    const _id = searchParams.get('id');
    if (_id) {
      getPostData(_id);
    } else {
      setPost({
        title: '',
        description: '',
      });
    }
  }, [searchParams]);


  const onChangeHandler = (e: React.ChangeEvent<React.ChangeEvent<HTMLElement | {
    target: { name: any; value: any }
  }>>) => {
    // @ts-expect-error: it's fine
    if (!e.target?.value) return;
    setPost((prevState) => ({
      ...(prevState || {}),
      // @ts-expect-error: it's fine
      [e.target.name]: isNumericString(e.target.value) ? parseInt(e.target.value) : e.target.value,
    }));
  };

  const onTranslatedInputChangeHandler = (e: { target: { name: any; value: any } }) => {
    if (activeEditingLanguage === 'default') {

      setPost(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));

    } else {

      setPost((prevState) => ({
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

  const scrapAndSetPostData = async ({ url, fields }: { url: string; fields?: string[] }) => {
    try {
      const { success, data, message } = await postDataScrappers(url);

      if (!success || !data?.postData) {
        dispatch(setAlert({
          message,
          type: 'error',
        }));
        return;
      }

      if (!fields?.length) {
        setPost(data.postData);
      } else {
        let fieldToSet = {};
        for await (const field of fields) {
          // @ts-expect-error: it's fine
          fieldToSet[field] = data.postData?.[field];
        }
        setPost(fieldToSet);
      }


    } catch (error) {
      dispatch(setAlert({
        message: 'Something went wrong',
        type: 'error',
      }));
    }
  };

  const findSimilarPost = async (
    {
      postId,
      relatedBy,
      page,
    }: { postId?: string; relatedBy?: string; page?: number }) => {
    if (!postId || !relatedBy || !page) return;

    try {

      const { success, message, data } = await findAnotherSimilarSourceLink(
        postId,
        relatedBy,
        page,
      );

      if (!success || !data?.relatedPosts) {
        dispatch(setAlert({
          message,
          type: 'error',
        }));
        return;
      }

      setRelatedPosts(data.relatedPosts);

    } catch (error) {
      dispatch(
        setAlert({
          message: 'Something went wrong',
          type: 'Error',
        }),
      );
    }


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
                  onChange={(e) => setActiveEditingLanguage(e.target.value as string)}>
            <option value={'default'}>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'Default'}</option>
            <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''} />
          </select>
        </div>
        {/*// @ts-expect-error: it's fine*/}
        <TitleDescription onChangeHandler={onTranslatedInputChangeHandler}
                          activeEditingLanguage={activeEditingLanguage}
                          post={post}
                          onDescriptionChangeHandler={onDescriptionChangeHandler}
                          onTranslatedInputChangeHandler={onTranslatedInputChangeHandler} />
        {/*// @ts-expect-error: it's fine*/}
        <PostInformation onChangeHandler={onChangeHandler}
                         findSimilarPost={findSimilarPost}
                         post={post}
                         scrapAndSetPostData={scrapAndSetPostData}
                         relatedPosts={relatedPosts}
                         setPost={setPost} />
      </div>
      <aside className={'side'}>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>
            <span>Status:</span>
            <span>{post?.status}</span>
          </div>
          <ActionOnPost post={post} setPost={setPost} />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Format:</div>
          <Format post={post} setPost={setPost} />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Author:</div>
          <Author author={post?.author} setPost={setPost} />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Categories:</div>
          <Meta type={'categories'} post={post} setPost={setPost} />
        </div>
        <div className={'editingPostSection editingPostSectionSide'}>
          <div className={'editingPostSectionTitle'}>Tags:</div>
          <Meta type={'tags'} post={post} setPost={setPost} />
        </div>
        {post?.postType === 'video' && (
          <div className={'editingPostSection editingPostSectionSide'}>
            <div className={'editingPostSectionTitle'}>Actors:</div>
            <Meta type={'actors'} post={post} setPost={setPost} />
          </div>
        )}
        <div className={'editingPostSection editingPostSectionSide'}>
          <RatingOption post={post} setPost={setPost} />
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