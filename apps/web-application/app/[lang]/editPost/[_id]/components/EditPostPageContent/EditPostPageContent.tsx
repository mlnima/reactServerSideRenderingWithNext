'use client';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clientAPIRequestGetEditingPost, clientDeletePostByAuthor } from '@repo/api-requests';
import { capitalizeFirstLetter, reduceArrayOfDataToIds } from '@repo/shared-util';
import MultipleImageUploader from '../PostEditorForm/common/MultipleImageUploader/MultipleImageUploader';
import MetaDataSelector from '../MetaDataSelector/MetaDataSelector';
import Price from '../Price/Price';
import './EditPostPageContent.scss';
import updatePostAction from '@store/reducers/postsReducers/updatePostAction';
import LocationField from '../PostEditorForm/common/LocationField/LocationField';
import Csr from '@components/global/Csr';
import { usePathname, useRouter } from 'next/navigation';
import { setAlert } from '@store/reducers/globalStateReducer';
import { removeUserDraftPost } from '@store/reducers/userReducers/userReducer';
import { postTypes, videoQualities, postStatuses, UGCPostImagesLimit } from '@repo/data-structures/dist/src';
import { clientAPIRequestDeletePostImages } from '@repo/api-requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faBinoculars, faFilePen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import {Post} from "typescript-types";

interface IProps {
    _id: string;
    locale: string;
    dictionary: {
        [key: string]: string;
    };
}

const EditPostPageContent: FC<IProps> = ({ _id, dictionary, locale }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [editingPost, setEditingPost] = useState<Post>({});
    const [isPreviewReady, setIsPreviewReady] = useState<boolean>(false);
    const { loggedIn } = useAppSelector(({ user }) => user);
    const { userData } = useAppSelector(({ user }) => user);
    const localeToSet = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`;

    useEffect(() => {
        if (_id && loggedIn) {
            getEditingPostData();
        }
    }, [_id, loggedIn]);

    const getEditingPostData = async () => {
        if (_id) {
            await clientAPIRequestGetEditingPost(_id).then((postData: { data: any }) => {
                if (userData.role === 'administrator' || postData?.data?.post?.author?._id === userData?._id) {
                    setEditingPost(postData?.data?.post || {});
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

    const savePostData = async ({ status }: { status: string }) => {
        //clean post data
        const comments = editingPost?.comments ? { comments: reduceArrayOfDataToIds(editingPost.comments) } : {};
        const images = editingPost?.images ? { images: reduceArrayOfDataToIds(editingPost?.images) } : {};
        const categories = editingPost?.categories ? { categories: reduceArrayOfDataToIds(editingPost.categories) } : {};
        const tags = editingPost?.tags ? { tags: reduceArrayOfDataToIds(editingPost.tags) } : {};
        const actors = editingPost?.actors ? { actors: reduceArrayOfDataToIds(editingPost.actors) } : {};
        const author = !!editingPost?.author?._id ? { author: editingPost?.author?._id } : { author: userData?._id };

        const editedPost = {
            ...editingPost,
            ...images,
            ...comments,
            ...categories,
            ...author,
            ...tags,
            ...actors,
            status,
        };

        if (status === 'draft' || status === 'pending') {
            setIsPreviewReady(true);
        }

        if (status !== 'draft') {
            dispatch(removeUserDraftPost(null));
        }

        dispatch(updatePostAction(editedPost));
    };

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            await savePostData({ status: userData.role === 'administrator' ? editingPost.status : 'pending' });
        } catch (error) {}
    };

    const onDraftPostHandler = async () => {
        await savePostData({ status: 'draft' });
    };

    const onDeletePostByAuthorHandler = async () => {
        if (editingPost?.images?.length > 0) {
            await clientAPIRequestDeletePostImages({ postId: editingPost?._id });
        }
        const deletePostRequestResult = await clientDeletePostByAuthor(editingPost?._id);
        dispatch(removeUserDraftPost(null));
        dispatch(
            setAlert({
                message: deletePostRequestResult?.data?.message,
                type: 'success',
            }),
        );
        router.push('/');
    };

    const onTrashHandler = async () => {
        if (editingPost.status !== 'publish' || editingPost.status !== 'trash'){
            await savePostData({ status: 'trash' });
            setTimeout(() => router.push(`${localeToSet}`), 1000);
        }
    }

    return (
        <Csr>
            <div className={'editPostPageContent'}>
                <form onSubmit={onSubmitHandler} className={'editPostForm primaryForm'}>
                    <div className={'mainFields'}>
                        <div className="formSection">
                            <p>{dictionary?.['Title'] || 'Title'}:</p>
                            <input
                                type="text"
                                value={editingPost?.title || ''}
                                onChange={onChangeHandler}
                                className={'primaryInput'}
                                name={'title'}
                            />
                        </div>
                        <div className="formSection imageUploader">
                            <MultipleImageUploader
                                editingPost={editingPost}
                                dictionary={dictionary}
                                limit={userData?.role === 'administrator' ? 20 : UGCPostImagesLimit?.[editingPost?.type as string] || 1}
                                setEditingPost={setEditingPost}
                                // onSelectImageHandler={onSelectImageHandler}
                            />
                        </div>
                        <div className="formSection description">
                            <div className={'descriptionHeader'}>
                                <p>{dictionary?.['Description'] || 'Description'}:</p>
                                {/*<button className={'btn btn-primary'}*/}
                                {/*        onClick={() => setAdvanceEditor(!advanceEditor)}>Advance*/}
                                {/*</button>*/}
                            </div>
                            <textarea
                                name={'description'}
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
                        {userData?.role === 'administrator' ? (
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
                        ) : userData?.role !== 'administrator' ? (
                            <div className="formSection">
                                <label>
                                    {dictionary?.['Status'] || 'Status'}: &nbsp;
                                    {dictionary?.[capitalizeFirstLetter(editingPost?.status)] || capitalizeFirstLetter(editingPost?.status)}
                                </label>
                            </div>
                        ) : null}
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

                        {userData?.role === 'administrator' || editingPost?.postType === 'video' ? (
                            <div className="formSection">
                                <p>{dictionary?.['Categories'] || 'Categories'}:</p>
                                <MetaDataSelector
                                    postData={editingPost}
                                    type={'categories'}
                                    maxLimit={1}
                                    onMetaChangeHandler={onMetaChangeHandler}
                                />
                            </div>
                        ) : (
                            <label>
                                <span>{dictionary?.['Category'] || 'Category'}: </span>

                                {editingPost?.categories?.map((category: any) => {
                                    return (
                                        <span className={'category'} key={category}>
                                            {category?.name}
                                        </span>
                                    );
                                })}
                            </label>
                        )}

                        <div className="formSection">
                            <p>{dictionary?.['Tags'] || 'Tags'}:</p>
                            <MetaDataSelector postData={editingPost} type={'tags'} maxLimit={5} onMetaChangeHandler={onMetaChangeHandler} />
                        </div>
                        {editingPost.postType === 'video' && (
                            <div className="formSection">
                                <p>{dictionary?.['Actors'] || 'Actors'}:</p>
                                <MetaDataSelector
                                    postData={editingPost}
                                    type={'actors'}
                                    maxLimit={5}
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
                            <>
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
                            </>
                        )}
                    </div>
                    <div className={'actionButtons'}>
                        <button type={'submit'} className={'btn btn-primary submitButton'}>
                            <FontAwesomeIcon icon={faFloppyDisk} className={'meta-icon'} />
                            {dictionary?.['Publish'] || 'Publish'}
                        </button>

                        {isPreviewReady && (
                            <button
                                type={'button'}
                                onClick={() => router.push(`${localeToSet}/post/${editingPost?.postType}/${editingPost?._id}?preview=true`)}
                                className={'btn btn-info submitButton'}
                            >
                                <FontAwesomeIcon icon={faBinoculars} className={'meta-icon'} />
                                {dictionary?.['Preview'] || 'Preview'}
                            </button>
                        )}

                        <button
                            type={'button'}
                            onClick={async () => await savePostData({ status: 'draft' })}
                            className={'btn btn-info submitButton'}
                        >
                            <FontAwesomeIcon icon={faFilePen} className={'meta-icon'} />
                            {dictionary?.['Draft'] || 'Draft'}
                        </button>
                        <button
                            type={'button'}
                            onClick={async () => onTrashHandler()}
                            className={'btn btn-danger'}
                        >
                            <FontAwesomeIcon icon={faTrash} className={'meta-icon'} />
                            {dictionary?.['Trash'] || 'Trash'}
                        </button>
                        {/*<button type={'button'}*/}
                        {/*        onClick={onDeletePostByAuthorHandler}*/}
                        {/*        className={'btn btn-danger'}>*/}
                        {/*    <FontAwesomeIcon icon={faTrash} className={'meta-icon'}/>*/}
                        {/*    {dictionary?.["Trash"] || "Trash"}*/}
                        {/*</button>*/}
                    </div>
                </form>
            </div>
        </Csr>
    );
};

export default EditPostPageContent;
