/* eslint-disable */
// @ts-nocheck
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { capitalizeFirstLetter, imageCanvasCompressor, reduceArrayOfDataToIds } from '@repo/utils';
import MultipleImageUploader from '../MultipleImageUploader/MultipleImageUploader';
import MetaDataSelector from '../MetaDataSelector/MetaDataSelector';
import Price from '../Price/Price';
import LocationField from '../LocationField/LocationField';
import Csr from '@components/global/Csr';
import { useRouter } from 'next/navigation';
import { setAlert } from '@store/reducers/globalStateReducer';
import { postTypes, videoQualities, postStatuses } from '@repo/data-structures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { IPost } from '@repo/typescript-types';
import './UploadPageContent.scss';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import deepEqual from 'deep-equal';
import { formatDistance } from 'date-fns';
import LoggedInRequirePageMessage from '@components/LoggedInRequireMessage/LoggedInRequirePageMessage';
import ForbiddenMessage from '@components/ForbiddenMessage/ForbiddenMessage';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import getMeta from '@lib/actions/database/metas/getMeta';
import getEditingPost from '@lib/actions/database/posts/getEditingPost';
import deletePost from '@lib/actions/database/posts/deletePost';
import updatePost from '@lib/actions/database/posts/updatePost';
import { clearACacheByTag } from '@lib/serverActions';

interface IProps {
  _id: string;
  postType: string;
  locale: string;
  dictionary: {
    [key: string]: string;
  };
}

const UploadPageContent = ({ _id, postType, dictionary, locale }: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const [editingPostOriginal, setEditingPostOriginal] = useState<IPost | null>(null);
  const fileInputRef = useRef(null);
  const { loggedIn, userData } = useAppSelector(({ user }) => user);
  const localeToSet = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`;
  const postByUserSettings = useAppSelector(
    ({ settings }) => settings.initialSettings?.membershipSettings?.postByUserSettings,
  );

  // useEffect(() => {
  //   console.log(`postByUserSettings=> `, postByUserSettings);
  // }, [postByUserSettings]);

  useEffect(() => {
    if (_id && loggedIn) {
      getEditingPostData();
    } else {
      setEditingPost(prevState => ({
        ...(prevState),
        postType,
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [_id, loggedIn]);

  useEffect(() => {
    const categoryParams = searchParams.get('category');
    const category = categoryParams ? (Array.isArray(categoryParams) ? categoryParams[0] : categoryParams) : null;

    if (category) {
      void getPostMeta(category);
    }
  }, [searchParams, pathname]);

  const getPostMeta = async (_id: string) => {
    try {
      const {success,data} = await getMeta(_id);
      if(!success || !data){
        return
      }
      setEditingPost(prevState => ({ ...prevState, categories: [data.meta] }));

    } catch {
      return;
    }
  };

  const getEditingPostData = async () => {
    const { success, data }= await getEditingPost({ _id});

    if (!success || !data){
      return
    }
    console.log(`data=> `,data)
    setEditingPost(data.post);
    setEditingPostOriginal(data.post);
  };

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditingPost(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSaveHandler = async () => {
    if (deepEqual(editingPost, editingPostOriginal) && (!fileInputRef.current || fileInputRef.current.files.length < 1)) {
      dispatch(
        setAlert({
          type: 'error',
          message: 'You need to make changes in order to resubmit the post',
        }),
      );
      return;
    }

    const formData = new FormData();
    let imageToProcess: File | undefined = undefined;

    if (fileInputRef.current?.files?.length) {
      imageToProcess = fileInputRef.current.files[0];
    }

    if (imageToProcess) {
      try {
        const compressedImageFile = await imageCanvasCompressor({
          image: imageToProcess,
          outputType: 'file',
          maxWidth: 280,
          maxHeight: 157.5,
        });
        formData.append('thumbnail', compressedImageFile, imageToProcess.name);
      } catch (compressionError) {
        console.error("Image compression error:", compressionError);
        dispatch(setAlert({ type: 'error', message: 'Failed to compress image.' }));
        return;
      }
    }

    const reduceArrayOfDataToIds = (arr: any[] | undefined): string[] =>
      arr?.map(item => item._id || item).filter(id => !!id) || [];

    const postDataForForm: Partial<IPost> = {
      ...editingPost,
      comments: editingPost?.comments ? reduceArrayOfDataToIds(editingPost.comments) : undefined,
      images: editingPost?.images ? reduceArrayOfDataToIds(editingPost.images) : undefined,
      categories: editingPost?.categories ? reduceArrayOfDataToIds(editingPost.categories) : undefined,
      tags: editingPost?.tags ? reduceArrayOfDataToIds(editingPost.tags) : undefined,
      actors: editingPost?.actors ? reduceArrayOfDataToIds(editingPost.actors) : undefined,
    };

    if (editingPost?.author?._id) {
      postDataForForm.author = editingPost.author._id;
    } else if (!editingPost?._id && !editingPost?.author?._id && userData?._id) {
      postDataForForm.author = userData._id;
    } else if (postDataForForm.hasOwnProperty('author')) {
      delete postDataForForm.author;
    }


    if (imageToProcess) {
      postDataForForm.thumbnail = undefined;
    } else {
      if (editingPost?.thumbnail) {
        postDataForForm.thumbnail = editingPost.thumbnail;
      } else {
        postDataForForm.thumbnail = null;
      }
    }

    formData.append('data', JSON.stringify(postDataForForm));

    dispatch(setAlert({ type: 'info', message: 'Submitting post...' }));

    try {
      const result = await updatePost(formData);

      if (!result.success) {
        dispatch(
          setAlert({
            type: 'error',
            message: result.message || 'An error occurred while updating the post.',
          }),
        );
      } else {
        dispatch(
          setAlert({
            type: 'success',
            message: result.message,
          }),
        );

        if (!editingPost?._id && result.data?.postId) {
          const localeToSet = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`;
          router.push(`${localeToSet}/upload?_id=${result.data.postId}`);
        } else {
          getEditingPostData();
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      dispatch(
        setAlert({
          type: 'error',
          message: (error instanceof Error ? error.message : 'An unexpected error occurred.'),
        }),
      );
    }
  };



  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingPost.status === 'published') {
      dispatch(
        setAlert({
          message:
            'Your post wont be visible to public until a moderator approval, Do you still want to apply the changes?',
          type: 'confirmAction',
          actionFunctions: onSaveHandler,
        }),
      );
      return;
    } else {
      await onSaveHandler();
    }
  };

  const onDeleteRequestHandler = () => {
    dispatch(
      setAlert({
        message: 'Do you want to delete this post?',
        type: 'deleteAction',
        actionFunctions: onDeleteHandler,
      }),
    );
  };

  const onDeleteHandler = async () => {

    const {success,error,message} = await deletePost({_id:editingPost?._id})
    dispatch(
      setAlert({
        message,
        type: success ?  'success' : 'error',
        error
      }),
    );
    router.push(locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '/' : `/${locale}`);
  };

  if (!loggedIn) return <LoggedInRequirePageMessage dictionary={dictionary} />;

  if (
    !postByUserSettings?.[editingPost?.postType]?.allow ||
    (_id && userData?._id !== editingPost?.author?._id && userData?.role !== 'administrator')
  )
    return <ForbiddenMessage dictionary={dictionary} />;

  return (
    <Csr>
      <div className={'uploadPageContent'}>
        <form onSubmit={onSubmitHandler} className={'editPostForm primaryForm'}>
          <div className={'mainFields'}>
            <div className="formSection">
              <p>{dictionary?.['Title'] || 'Title'}:</p>
              <input
                required={true}
                type="text"
                maxLength={60}
                value={editingPost?.title || ''}
                onChange={onChangeHandler}
                className={'primaryInput'}
                name={'title'}
              />
            </div>

            {editingPost?.postType === 'promotion' && (
              <div className="formSection">
                <p>
                  <span>URL </span>
                  <span className={'smallText'}>
                                        {' '}
                    - Must be HTTPS (ex: https://example.com or https://www.example.com)
                                    </span>
                </p>
                <input
                  type="url"
                  maxLength={200}
                  pattern="https://.*"
                  required={true}
                  value={editingPost?.redirectLink || ''}
                  onChange={onChangeHandler}
                  className={'primaryInput'}
                  name={'redirectLink'}
                />
              </div>
            )}

            <div className="formSection imageUploader">
              <span className={'smallText'}> Expected size: 280px * 157.5px </span>
              <MultipleImageUploader
                fileInputRef={fileInputRef}
                editingPost={editingPost}
                setEditingPost={setEditingPost}
              />
            </div>
            <div className="formSection description">
              <div className={'descriptionHeader'}>
                <p>{dictionary?.['Description'] || 'Description'}:</p>
              </div>
              <textarea
                name={'description'}
                maxLength={3000}
                className={'description primaryInput'}
                onChange={onChangeHandler}
                value={editingPost?.description as string}
              />
            </div>

            {editingPost?.postType === 'video' && (
              <>
                <div className="formSection">
                  <p>Video Url:</p>
                  <input
                    type={'text'}
                    required={true}
                    value={editingPost?.videoUrl || ''}
                    onChange={onChangeHandler}
                    className={'primaryInput'}
                    name={'videoUrl'}
                  />
                </div>
                <div className="formSection">
                  <p>Video Embed Code:</p>
                  <input
                    type={'text'}
                    required={true}
                    value={editingPost?.videoEmbedCode || ''}
                    onChange={onChangeHandler}
                    className={'primaryInput'}
                    name={'videoEmbedCode'}
                  />
                </div>
                <div className="formSection">
                  <p>Video Trailer Url:</p>
                  <input
                    type={'text'}
                    required={true}
                    value={editingPost?.videoTrailerUrl || ''}
                    onChange={onChangeHandler}
                    className={'primaryInput'}
                    name={'videoTrailerUrl'}
                  />
                </div>
              </>
            )}
          </div>
          <div className={'sidebarField'}>
            {userData?.role === 'administrator' && editingPost?.status && (
              <div className="formSection">
                <p>Post Status:</p>
                <select
                  value={editingPost?.status || ''}
                  name={'status'}
                  className={'primarySelect'}
                  onChange={onChangeHandler}
                >
                  {postStatuses.map((postStatus: string) => {
                    return (
                      <option value={postStatus} key={postStatus}>
                        {capitalizeFirstLetter(postStatus)}
                      </option>
                    );
                  })}
                </select>

                {/*<Select    name={'postType'}*/}
                {/*    onChange={(value)=>onReactSelectChangeHandler('postType',value as string)}*/}
                {/*    options={postStatuses.map((postStatus: string) => {*/}
                {/*        return {*/}
                {/*            locale: capitalizeFirstLetter(postStatus),*/}
                {/*            value: postStatus,*/}
                {/*        };*/}
                {/*    })}*/}
                {/*    styles={reactSelectPrimaryTheme}*/}
                {/*/>*/}
              </div>
            )}

            <div className="formSection postInformation">
              <label>
                {dictionary?.['Status'] || 'Status'}: &nbsp;
                {dictionary?.[capitalizeFirstLetter(editingPost?.status)] ||
                  capitalizeFirstLetter(editingPost?.status) ||
                  'New Post'}
              </label>
              {editingPost?.createdAt && (
                <label>
                  {dictionary?.['Created at'] || 'Created at'}: &nbsp;
                  {formatDistance(new Date(editingPost?.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </label>
              )}
              {editingPost?.updatedAt && (
                <label>
                  {dictionary?.['Updated at'] || 'Updated at'}: &nbsp;
                  {formatDistance(new Date(editingPost?.updatedAt), new Date(), {
                    addSuffix: true,
                  })}
                </label>
              )}
            </div>

            {userData?.role === 'administrator' ? (
              <div className="formSection">
                <p>Post Type:</p>
                <select
                  value={editingPost?.postType || ''}
                  name={'postType'}
                  className={'primarySelect'}
                  onChange={onChangeHandler}
                >
                  {postTypes.map((postTypes: string) => {
                    return (
                      <option value={postTypes} key={postTypes}>
                        {capitalizeFirstLetter(postTypes)}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : userData?.role !== 'administrator' && editingPost?.postType === 'video' ? (
              <div className="formSection">
                <label>
                  {dictionary?.['Post Type'] || 'Post Type'}: &nbsp;
                  {capitalizeFirstLetter(editingPost?.postType)}
                </label>
              </div>
            ) : null}

            {postByUserSettings?.[editingPost?.postType]?.maxCategories && (
              <div className="formSection">
                <p>{dictionary?.['Categories'] || 'Categories'}:</p>
                <MetaDataSelector
                  postData={editingPost}
                  setEditingPost={setEditingPost}
                  metaType={'categories'}
                  maxLimit={postByUserSettings?.[editingPost?.postType]?.maxCategories}
                />
              </div>
            )}

            {postByUserSettings?.[editingPost?.postType]?.maxTags && (
              <div className="formSection">
                <p>{dictionary?.['Tags'] || 'Tags'}:</p>
                <MetaDataSelector
                  postData={editingPost}
                  setEditingPost={setEditingPost}
                  metaType={'tags'}
                  maxLimit={postByUserSettings?.[editingPost?.postType]?.maxTags}
                />
              </div>
            )}

            {editingPost.postType === 'video' && postByUserSettings?.[editingPost?.postType]?.maxActors && (
              <div className="formSection">
                <p>{dictionary?.['Actors'] || 'Actors'}:</p>
                <MetaDataSelector
                  postData={editingPost}
                  setEditingPost={setEditingPost}
                  metaType={'actors'}
                  maxLimit={postByUserSettings?.[editingPost?.postType]?.maxActors}
                />
              </div>
            )}

            {editingPost?.postType === 'advertise' && (
              <div className="formSection">
                <Price onChangeHandler={onChangeHandler} />
              </div>
            )}

            {/ugcAd|event/.test(editingPost?.postType as string) && (
              <div className="formSection">
                <LocationField setEditingPost={setEditingPost} />
              </div>
            )}
            {editingPost?.postType === 'video' && (
              <div className="formSection">
                <p>quality:</p>
                <select
                  value={editingPost?.quality || ''}
                  name={'quality'}
                  className={'primarySelect'}
                  onChange={onChangeHandler}
                >
                  {videoQualities.map((quality: string) => {
                    return (
                      <option value={quality} key={quality}>
                        {quality}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className={'actionButtons'}>
              <button type={'submit'} className={'btn btn-primary submitButton'}>
                <FontAwesomeIcon icon={faFloppyDisk} className={'meta-icon'} />
                {dictionary?.['Submit'] || 'Submit'}
              </button>

              {editingPost._id && (
                <button
                  type={'button'}
                  onClick={async () => onDeleteRequestHandler()}
                  className={'btn btn-danger'}
                >
                  <FontAwesomeIcon icon={faTrash} className={'meta-icon'} />
                  {/*{dictionary?.['Trash'] || 'Trash'}*/}
                  {dictionary?.['Delete'] || 'Delete'}
                </button>
              )}

              {editingPost._id && (
                <button
                  type={'button'}
                  onClick={() =>
                    router.push(
                      `${localeToSet}/post/${editingPost?.postType}/${editingPost?._id}?preview=true`,
                    )
                  }
                  className={'btn btn-info submitButton'}
                >
                  <FontAwesomeIcon icon={faEye} className={'meta-icon'} />
                  {dictionary?.['Preview'] || 'Preview'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Csr>
  );
};

export default UploadPageContent;

// const onSaveHandler = async () => {
//   if (deepEqual(editingPost, editingPostOriginal) && fileInputRef.current.files.length < 1) {
//     dispatch(
//       setAlert({
//         type: 'error',
//         message: 'You need to make changes in order to resubmit the post',
//       }),
//     );
//     return;
//   }
//
//   const formData = new FormData();
//
//   const image = fileInputRef.current.files?.[0] || fileInputRef.current.files?.[0];
//
//   if (image) {
//     formData.append(
//       'thumbnail',
//       await imageCanvasCompressor({
//         image,
//         outputType: 'file',
//         maxWidth: 320,
//         maxHeight: 180,
//       }),
//     );
//   }
//
//   const comments = editingPost?.comments ? { comments: reduceArrayOfDataToIds(editingPost.comments) } : {};
//   const images = editingPost?.images ? { images: reduceArrayOfDataToIds(editingPost?.images) } : {};
//   const categories = editingPost?.categories
//     ? { categories: reduceArrayOfDataToIds(editingPost.categories) }
//     : {};
//   const tags = editingPost?.tags ? { tags: reduceArrayOfDataToIds(editingPost.tags) } : {};
//   const actors = editingPost?.actors ? { actors: reduceArrayOfDataToIds(editingPost.actors) } : {};
//   const author = editingPost?.author?._id
//     ? { author: editingPost?.author?._id }
//     : !_id && !editingPost?.author?._id
//       ? { author: userData?._id }
//       : {};
//   const thumbnail = editingPost?.thumbnail?._id ? { thumbnail: editingPost?.thumbnail?._id } : {};
//
//   const editedPost = {
//     ...editingPost,
//     ...images,
//     ...comments,
//     ...categories,
//     ...author,
//     ...tags,
//     ...actors,
//     ...thumbnail,
//   };
//
//   formData.append('data', JSON.stringify(editedPost));
//
//   await updatePost(formData)
//     .then((res: AxiosResponse) => {
//       dispatch(
//         setAlert({
//           type: 'success',
//           message: res.data.message,
//         }),
//       );
//
//       if (!editedPost._id && res.data?.postId) {
//         const localeToSet = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`;
//         router.push(`${localeToSet}/upload?_id=${res.data?.postId}`);
//       } else {
//         getEditingPostData();
//       }
//     })
//     .catch((error: AxiosError) => {
//       dispatch(
//         setAlert({
//           type: 'error',
//           //@ts-expect-error message might not defined
//           message: (error.response?.data?.message as string) || '',
//         }),
//       );
//     });
// };