'use client';
import React, {FC, useEffect, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {
    clientAPIRequestGetEditingPost,
    clientAPIRequestUpdatePost,
    clientAPIRequestUploadImage, clientDeletePostByAuthor
} from "api-requests";
import {randomNumberGenerator, reduceArrayOfDataToIds} from "custom-util";
import MultipleImageUploader from "../PostEditorForm/common/MultipleImageUploader/MultipleImageUploader";
import MetaDataSelector from "../MetaDataSelector/MetaDataSelector";
import Price from "../PostEditorForm/common/Price";
import VideoTypeFields from "../PostEditorForm/VideoTypeFields/VideoTypeFields";
import './EditPostPageContent.styles.scss'
import updatePostAction from "@store/reducers/postsReducers/updatePostAction";
import LocationField from "../PostEditorForm/common/LocationField/LocationField";
import Csr from "@components/global/Csr";
import {useRouter} from "next/navigation";
import {setAlert} from "@store/reducers/globalStateReducer";

// import {loading, setAlert} from "@utils/reducers/globalStateReducer";

interface IProps {
    _id: string,
    dictionary: {
        [key: string]: string
    }
}

const EditPostPageContent: FC<IProps> = ({_id, dictionary}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [editingPost, setEditingPost] = useState<{ [key: string]: any }>({})
    const {loggedIn, userData} = useAppSelector(({user}) => user)

    useEffect(() => {
        console.log(editingPost)
    }, [editingPost]);

    useEffect(() => {
        getEditingPostData()
    }, [_id]);

    const getEditingPostData = async () => {
        if (_id) {
            await clientAPIRequestGetEditingPost(_id).then((postData) => {
                setEditingPost(postData?.data?.post || {})
            })
        }
    }


    const onChangeHandler = (e: React.ChangeEvent<any>, isUniqueField?: boolean) => {
        setEditingPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const onUniqueFieldsChangeHandler = (e: React.ChangeEvent<any>, isUniqueField?: boolean) => {
        setEditingPost(prevState => ({
            ...prevState,
            uniqueData: {...(prevState?.uniqueData || {}), [e.target.name]: e.target.value}
        }))
    }


    //@ts-ignore
    const onMetaChangeHandler = (metas, type) => {
        setEditingPost(prevState => ({...prevState, [type]: metas}))
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            //clean post data
            const comments = editingPost?.comments ? {comments: reduceArrayOfDataToIds(editingPost.comments)} : {}
            const images = editingPost?.images ? {images: reduceArrayOfDataToIds(editingPost?.images)} : {}
            const categories = editingPost?.categories ? {categories: reduceArrayOfDataToIds(editingPost.categories)} : {}
            const tags = editingPost?.tags ? {tags: reduceArrayOfDataToIds(editingPost.tags)} : {}
            const actors = editingPost?.actors ? {actors: reduceArrayOfDataToIds(editingPost.actors)} : {}
            const author = editingPost?.author ? {author: editingPost.author?._id} : userData?._id

            const editedPost = {
                ...editingPost,
                ...images,
                ...comments,
                ...categories,
                //@ts-ignore
                ...author,
                ...tags,
                ...actors,
                status: userData.role === 'administrator' ? editingPost.status : 'pending',
            }


            dispatch(updatePostAction(editedPost))
        } catch (error) {

        }
    }


    const onSelectImageHandler = async (event: any) => {
        const formData = new FormData();
        const selectedImages = event.target.files || event.dataTransfer.files;
        if (!selectedImages?.length) return;

        //rename files and append to form data
        for await (const image of selectedImages) {
            const newName = `${editingPost._id}-${userData._id}-${Date.now()}-${randomNumberGenerator(1, 10000)}${image.name.substr(image.name.lastIndexOf('.'))}`;
            const renamedFile = new File([image], newName, {type: image.type})
            formData.append('images', renamedFile);
        }

        //append images data to form data
        formData.append('imagesData', JSON.stringify({
            usageType: 'post'
        }));

        //upload images
        await clientAPIRequestUploadImage(formData).then(response => {
            if (response.data?.images?.length > 0) {

                setEditingPost(prevState => {
                    try {
                        const allImages = [...(prevState?.images || []), ...response.data?.images]
                        return ({
                            ...prevState,
                            mainThumbnail: allImages[0]?.filePath,
                            images: allImages
                        })
                    } catch (error) {
                        console.log('error=> ', error)
                    }
                })
            }
        })
    };

    const onDeletePostByAuthorHandler = async () => {
        const deletePostRequestResult = await clientDeletePostByAuthor(editingPost?._id)
        dispatch(setAlert({
            message: deletePostRequestResult?.data?.message,
            type: 'success'
        }))
        router.push('/')
    }


    return (
        <Csr>
            <div className={'editPostPageContent'}>
                <form onSubmit={onSubmitHandler} className={'editPostForm primaryForm'}>
                    <div className="formSection imageUploader">
                        <MultipleImageUploader editingPost={editingPost}
                                               setEditingPost={setEditingPost}
                                               onSelectImageHandler={onSelectImageHandler}/>
                    </div>
                    <div className="formSection">
                        <p>{dictionary?.["Title"] || "Title"}:</p>
                        <input type="text"
                               value={editingPost?.title || ''}
                               onChange={onChangeHandler}
                               className={'primaryInput'}
                               name={'title'}/>
                    </div>

                    <div className="formSection description">
                        <p>{dictionary?.["Description"] || "Description"}:</p>
                        <textarea name={'description'}
                                  className={'description primaryInput'}
                                  onChange={onChangeHandler}
                                  value={editingPost?.description as string}/>

                    </div>
                    <div className="formSection">
                        <p>Categories:</p>
                        <MetaDataSelector postData={editingPost} type={'categories'} maxLimit={1}
                                          onMetaChangeHandler={onMetaChangeHandler}/>
                    </div>
                    <div className="formSection">
                        <p>Tags:</p>
                        <MetaDataSelector postData={editingPost} type={'tags'} maxLimit={5}
                                          onMetaChangeHandler={onMetaChangeHandler}/>
                    </div>
                    {editingPost.postType === 'video' &&
                        <div className="formSection"><p>Actors:</p>
                            <MetaDataSelector postData={editingPost} type={'actors'} maxLimit={5}
                                              onMetaChangeHandler={onMetaChangeHandler}/>
                        </div>
                    }
                    {editingPost?.postType === 'advertise' &&
                        <div className="formSection">
                            {/*//@ts-ignore*/}
                            <Price onChangeHandler={e => onChangeHandler(e, true)}/>
                        </div>
                    }

                    {/ugcAd|event/.test(editingPost?.postType as string) &&
                        <div className="formSection">
                            <LocationField onUniqueFieldsChangeHandler={onUniqueFieldsChangeHandler}/>
                        </div>
                    }

                    {editingPost?.postType === 'video' &&
                        <div className="formSection">
                            <VideoTypeFields onChangeHandler={onChangeHandler} editingPost={editingPost}/>
                        </div>
                    }
                    <div className={'actionButtons'}>
                        <button type={'submit'} className={'btn btn-primary submitButton'}>
                            {dictionary?.["Save"] || "Save"}
                        </button>
                        <button type={'button'}
                                onClick={onDeletePostByAuthorHandler}
                                className={'btn btn-danger'}>
                            {dictionary?.["Delete"] || "Delete"}
                        </button>
                    </div>

                </form>

            </div>
        </Csr>
    )
};

export default EditPostPageContent;


//
// setEditingPost(prevState => ({
//     ...prevState,
//     mainThumbnail: response.data?.images[0],
//     images: [...(prevState?.images || []), ...response.data?.images]
// }))