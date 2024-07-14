'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {clientAPIRequestGetEditingPost, clientDeletePostByAuthor, getMeta, updatePost} from '@repo/api-requests';
import { capitalizeFirstLetter, imageCanvasCompressor, reduceArrayOfDataToIds } from '@repo/shared-util';
import MultipleImageUploader from '../MultipleImageUploader/MultipleImageUploader';
import MetaDataSelector from '../MetaDataSelector/MetaDataSelector';
import Price from '../Price/Price';
import LocationField from '../LocationField/LocationField';
import Csr from '@components/global/Csr';
import { useRouter } from 'next/navigation';
import { setAlert } from '@store/reducers/globalStateReducer';
import { postTypes, videoQualities, postStatuses, UGCPostImagesLimit } from '@repo/data-structures/dist/src';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'typescript-types';
import './UploadPageContent.scss';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import deepEqual from 'deep-equal';
import { formatDistance } from 'date-fns';
import LoggedInRequirePageMessage from '@components/LoggedInRequireMessage/LoggedInRequirePageMessage';
import ForbiddenMessage from '@components/ForbiddenMessage/ForbiddenMessage';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface IProps {
    _id: string;
    locale: string;
    dictionary: {
        [key: string]: string;
    };
}

const UploadPageContent: ({ _id, postType, dictionary, locale }: IProps) => null | React.JSX.Element = ({
    _id,
    postType,
    dictionary,
    locale,
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [editingPost, setEditingPost] = useState<Post | {}>({});
    const [editingPostOriginal, setEditingPostOriginal] = useState<Post | {}>({});
    const fileInputRef = useRef<any>(null);
    const { loggedIn, userData } = useAppSelector(({ user }) => user);
    const localeToSet = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`;
    const postByUserSettings = useAppSelector(({ settings }) => settings.initialSettings?.membershipSettings?.postByUserSettings);

    useEffect(() => {
        if (_id && loggedIn) {
            getEditingPostData();
        } else {
            setEditingPost({
                postType,
                images: [],
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [_id, loggedIn]);


    const getPostMeta = async (_id)=>{
        try {
            const metaData = await getMeta(_id)
            setEditingPost(prevState => ({ ...prevState, categories: [metaData.data?.meta]  }));
            // console.log(`metaData=> `,metaData.data?.meta)
        }catch (error){

        }
    }

    useEffect(() => {
        const categoryParams = searchParams.get('category')
        const category = !!categoryParams ? Array.isArray(categoryParams) ? categoryParams[0] :categoryParams : null

        if (!!category) {
            getPostMeta(category)
        }

    }, [searchParams,pathname]);

    const getEditingPostData = () => {
        if (_id) {
            clientAPIRequestGetEditingPost(_id).then((postData: { data: any }) => {
                if (userData.role === 'administrator' || postData?.data?.post?.author?._id === userData?._id) {
                    setEditingPost(postData?.data?.post || {});
                    setEditingPostOriginal(postData?.data?.post || {});
                }
            });
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<any>) => {
        setEditingPost(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onUniqueFieldsChangeHandler = (e: React.ChangeEvent<any>) => {
        setEditingPost(prevState => ({
            ...prevState,
            uniqueData: { ...(prevState?.uniqueData || {}), [e.target.name]: e.target.value },
        }));
    };
    //@ts-ignore
    const onMetaChangeHandler = (metas, type) => {
        setEditingPost(prevState => ({ ...prevState, [type]: metas }));
    };

    const onSaveHandler = async () => {
        if (deepEqual(editingPost, editingPostOriginal) && fileInputRef.current.files.length < 1) {
            dispatch(
                setAlert({
                    type: 'error',
                    message: 'You need to make changes in order to resubmit the post',
                }),
            );
            return;
        }

        const formData = new FormData();

        const image = fileInputRef.current.files?.[0] || fileInputRef.current.files?.[0];
        console.log(`image=> `, image);
        if (!!image) {
            formData.append(
                'thumbnail',
                await imageCanvasCompressor({
                    image,
                    outputType: 'file',
                    maxWidth: 320,
                    maxHeight: 180,
                }),
            );
        }

        const comments = editingPost?.comments ? { comments: reduceArrayOfDataToIds(editingPost.comments) } : {};
        const images = editingPost?.images ? { images: reduceArrayOfDataToIds(editingPost?.images) } : {};
        const categories = editingPost?.categories ? { categories: reduceArrayOfDataToIds(editingPost.categories) } : {};
        const tags = editingPost?.tags ? { tags: reduceArrayOfDataToIds(editingPost.tags) } : {};
        const actors = editingPost?.actors ? { actors: reduceArrayOfDataToIds(editingPost.actors) } : {};
        const author = !!editingPost?.author?._id
            ? { author: editingPost?.author?._id }
            : !_id && !editingPost?.author?._id
              ? { author: userData?._id }
              : {};
        const thumbnail = !!editingPost?.thumbnail?._id ? { thumbnail: editingPost?.thumbnail?._id } : {};

        const editedPost = {
            ...editingPost,
            ...images,
            ...comments,
            ...categories,
            ...author,
            ...tags,
            ...actors,
            ...thumbnail,
        };

        formData.append('data', JSON.stringify(editedPost));

        await updatePost(formData)
            .then(res => {
                dispatch(
                    setAlert({
                        type: 'success',
                        message: res.data.message,
                    }),
                );

                if (!editedPost._id && !!res.data?.postId) {
                    const localeToSet = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`;
                    router.push(`${localeToSet}/upload?_id=${res.data?.postId}`);
                } else {
                    getEditingPostData();
                }
            })
            .catch(error => {
                console.log('error=> ', error);
                dispatch(
                    setAlert({
                        type: 'error',
                        message: error.response.data.message,
                    }),
                );
            });
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        if (editingPost.status === 'published') {
            dispatch(
                setAlert({
                    message: 'Your post wont be visible to public until a moderator approval, Do you still want to apply the changes?',
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
        const deletePostRequestResult = await clientDeletePostByAuthor(editingPost?._id);
        dispatch(
            setAlert({
                message: deletePostRequestResult?.data?.message,
                type: 'success',
            }),
        );
        router.push(locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '/' : `/${locale}`);
    };

    // useEffect(() => {
    //     console.log('console=> ',editingPost);
    // }, [editingPost]);

    // if (userData._id !== editingPost.author._id) {
    //     return null
    // }

    if (!loggedIn) return <LoggedInRequirePageMessage dictionary={dictionary} />;

    if (!postByUserSettings?.[editingPost?.postType]?.allow || (!!_id && userData?._id !== editingPost?.author?._id))
        return <ForbiddenMessage />;

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
                            <span className={'smallText'}> Expected size: 320px * 180px </span>
                            <MultipleImageUploader fileInputRef={fileInputRef} editingPost={editingPost} setEditingPost={setEditingPost} />
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
                        {userData?.role === 'administrator' && !!editingPost?.status && (
                            <div className="formSection">
                                <p>Post Status:</p>
                                <select
                                    value={editingPost?.status || ''}
                                    name={'postType'}
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
                            </div>
                        )}

                        <div className="formSection postInformation">
                            <label>
                                {dictionary?.['Status'] || 'Status'}: &nbsp;
                                {dictionary?.[capitalizeFirstLetter(editingPost?.status)] ||
                                    capitalizeFirstLetter(editingPost?.status) ||
                                    'New Post'}
                            </label>
                            {!!editingPost?.createdAt && (
                                <label>
                                    {dictionary?.['Created at'] || 'Created at'}: &nbsp;
                                    {formatDistance(new Date(editingPost?.createdAt), new Date(), {
                                        addSuffix: true,
                                    })}
                                </label>
                            )}
                            {!!editingPost?.updatedAt && (
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

                        {!!postByUserSettings?.[editingPost?.postType]?.maxCategories && (
                            <div className="formSection">
                                <p>{dictionary?.['Categories'] || 'Categories'}:</p>
                                <MetaDataSelector
                                    postData={editingPost}
                                    type={'categories'}
                                    maxLimit={postByUserSettings?.[editingPost?.postType]?.maxCategories}
                                    onMetaChangeHandler={onMetaChangeHandler}
                                />
                            </div>
                        )}

                        {!!postByUserSettings?.[editingPost?.postType]?.maxTags && (
                            <div className="formSection">
                                <p>{dictionary?.['Tags'] || 'Tags'}:</p>
                                <MetaDataSelector
                                    postData={editingPost}
                                    type={'tags'}
                                    maxLimit={postByUserSettings?.[editingPost?.postType]?.maxTags}
                                    onMetaChangeHandler={onMetaChangeHandler}
                                />
                            </div>
                        )}

                        {editingPost.postType === 'video' && !!postByUserSettings?.[editingPost?.postType]?.maxActors && (
                            <div className="formSection">
                                <p>{dictionary?.['Actors'] || 'Actors'}:</p>
                                <MetaDataSelector
                                    postData={editingPost}
                                    type={'actors'}
                                    maxLimit={postByUserSettings?.[editingPost?.postType]?.maxActors}
                                    onMetaChangeHandler={onMetaChangeHandler}
                                />
                            </div>
                        )}

                        {editingPost?.postType === 'advertise' && (
                            <div className="formSection">
                                {/*//@ts-ignore*/}
                                <Price onChangeHandler={e => onChangeHandler(e, true)} />
                            </div>
                        )}

                        {/ugcAd|event/.test(editingPost?.postType as string) && (
                            <div className="formSection">
                                <LocationField onUniqueFieldsChangeHandler={onUniqueFieldsChangeHandler} />
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

                            {!!editingPost._id && (
                                <button type={'button'} onClick={async () => onDeleteRequestHandler()} className={'btn btn-danger'}>
                                    <FontAwesomeIcon icon={faTrash} className={'meta-icon'} />
                                    {/*{dictionary?.['Trash'] || 'Trash'}*/}
                                    {dictionary?.['Delete'] || 'Delete'}
                                </button>
                            )}

                            {!!editingPost._id && (
                                <button
                                    type={'button'}
                                    onClick={() =>
                                        router.push(`${localeToSet}/post/${editingPost?.postType}/${editingPost?._id}?preview=true`)
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

// {editingPost.status !== 'published' &&
// <button
//     type={'button'}
//     onClick={async () => await savePostData({ status: 'draft' })}
//     className={'btn btn-info submitButton'}
// >
//     <FontAwesomeIcon icon={faFilePen} className={'meta-icon'} />
//     {dictionary?.['Draft'] || 'Draft'}
// </button>
// }

// <label>
//     <span>{dictionary?.['Category'] || 'Category'}: </span>
//
//     {editingPost?.categories?.map((category: any) => {
//         return (
//             <span className={'category'} key={category}>
//                                             {category?.name}
//                                         </span>
//         );
//     })}
// </label>
