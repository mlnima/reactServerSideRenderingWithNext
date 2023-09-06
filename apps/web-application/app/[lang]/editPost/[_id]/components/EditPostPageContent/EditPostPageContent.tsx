'use client';
import React, {FC, useEffect, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {clientAPIRequestGetEditingPost, clientAPIRequestUpdatePost, clientAPIRequestUploadImage} from "api-requests";
import {randomNumberGenerator, reduceArrayOfDataToIds} from "custom-util";
import MultipleImageUploader from "../PostEditorForm/common/MultipleImageUploader/MultipleImageUploader";
import MetaDataSelector from "../MetaDataSelector/MetaDataSelector";
import Price from "../PostEditorForm/common/Price";
import VideoTypeFields from "../PostEditorForm/VideoTypeFields/VideoTypeFields";
import PostLocation from "../PostEditorForm/common/PostLocation";
import './EditPostPageContent.styles.scss'
import updatePostAction from "@store/reducers/postsReducers/updatePostAction";
import {loading, setAlert} from "@store/reducers/globalStateReducer";

interface IProps {
    _id: string,
    dictionary: {
        [key: string]: string
    }
}

const EditPostPageContent: FC<IProps> = ({_id, dictionary}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
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
            if (!!response.data?.images?.length) {
                setEditingPost(prevState => ({
                    ...prevState,
                    images: [...(prevState?.images || []), ...response.data?.images]
                }))
            }
        })
    };

    const onChangeHandler = (e: React.ChangeEvent<any>, isUniqueField?: boolean) => {
        if (isUniqueField) {
            setEditingPost(prevState => ({
                ...prevState,
                uniqueData: {...(prevState?.uniqueData || {}), [e.target.name]: e.target.value}
            }))
        } else {
            setEditingPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
        }
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
                ...author,
                ...tags,
                ...actors,
                status: 'pending'
            }

            dispatch(updatePostAction(editedPost))
        } catch (error) {

        }
    }

    return (

        <div className={'editPostPageContent'}>
            <form onSubmit={onSubmitHandler}>
                <div className="formSection imageUploader">
                    <MultipleImageUploader editingPost={editingPost}
                                           setEditingPost={setEditingPost}
                                           onSelectImageHandler={onSelectImageHandler}/>
                </div>
                <div className="formSection">
                    <input type="text"
                           placeholder={dictionary?.["Title"] || "Title"}
                           value={editingPost?.title}
                           onChange={onChangeHandler}
                           className={'form-control-input'}
                           name={'title'}/>
                </div>

                {/*{editingPost?.postType === 'event' &&*/}
                {/*    <div className="formSection">*/}
                {/*        <EventDates onChangeHandler={e => onChangeHandler(e, true)} uniqueData={postData?.uniqueData}/>*/}
                {/*        <TextInput name={'capacity'} type={'number'} value={postData?.uniqueData?.capacity}*/}
                {/*                   title={'Capacity'}*/}
                {/*                   onChangeHandler={e => onChangeHandler(e, true)}/>*/}
                {/*    </div>*/}
                {/*}*/}


                <div className="formSection description">
                          <textarea name={'description'}
                                    placeholder={dictionary?.["Description"] || "Description"}
                                    className={'description form-control-input'}
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
                        {/*//@ts-ignore*/}
                        <PostLocation onChangeHandler={e => onChangeHandler(e, true)}/>
                    </div>
                }

                {editingPost?.postType === 'video' &&
                    <div className="formSection">
                        <VideoTypeFields onChangeHandler={onChangeHandler} editingPost={editingPost}/>
                    </div>
                }
                <button type={'submit'}
                        className={'btn btn-primary submitButton'}>{dictionary?.["Submit"] || "Submit"}</button>
            </form>

        </div>
    )
};

export default EditPostPageContent;
