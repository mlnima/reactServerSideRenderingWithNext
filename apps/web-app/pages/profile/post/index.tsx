// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {wrapper} from "@store_toolkit/store";
import {useRouter} from "next/router";
import CreateEditArticlePostField
    from "@components/includes/profilePageComponents/profilePost/CreateEditArticlePostField/CreateEditArticlePostField";
import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";
import MetaDataSelector from "@components/includes/profilePageComponents/profilePost/common/MetaDataSelector";
import VideoTypeFields
    from "@components/includes/profilePageComponents/profilePost/VideoTypeFields/VideoTypeFields";
import {editPostField} from "@store_toolkit/clientReducers/postsReducers/postsReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import EventDates from "@components/includes/PostEditorForm/event/EventDates";
import getEditingPostAction from "@store_toolkit/clientReducers/postsReducers/getEditingPostAction";
import updatePostAction from "@store_toolkit/clientReducers/postsReducers/updatePostAction";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import MultipleImageUploader from "@components/includes/PostEditorForm/common/MultipleImageUploader/MultipleImageUploader";
import Csr from "@components/global/commonComponents/Csr";
const AdMode = dynamic(() => import('@components/includes/PostEditorForm/ucgAd/AdMode'));
const Price = dynamic(() => import('@components/includes/PostEditorForm/common/Price'));
const Location = dynamic(() => import('@components/includes/PostEditorForm/common/PostLocation'));
const PersonalInfo = dynamic(() => import('@components/includes/PostEditorForm/common/PersonalInfo'));
import {ProfilePostPageStyle} from "@components/pagesIncludes/profile/post/ProfileEditingPostPageStyle";

const post = () => {
    const dispatch = useAppDispatch();
    const {loggedIn, userData, editingPost, sidebar} = useSelector(({settings, user, posts}: Store) => {
        return {
            sidebar: settings?.currentPageSettings?.sidebar,
            loggedIn: user.loggedIn,
            userData: user.userData,
            editingPost: posts?.editingPost,
        }
    })
    const {query} = useRouter();
    const postType = query?.postType;

    const [images, setImages] = useState<File[]>([]);

    const handleFileSelect = (event: any) => {
        const selectedFiles = event.target.files || event.dataTransfer.files;

        if (!selectedFiles?.length) {
            return;
        }

        const newImages = Array.from(selectedFiles);
        //@ts-ignore
        setImages((prevImages) => [...prevImages, ...newImages]);
        //@ts-ignore
        // onUploadComplete([...images, ...newImages]);
    };

    useEffect(() => {
        if (query.id) {
            dispatch(getEditingPostAction(query.id as string));
        } else if (!query.id && !!query?.new && !!query?.postType && loggedIn) {
            dispatch(editPostField({
                status: 'pending',
                postType: query?.postType as string,
                author: userData._id
            }))
        }
    }, [userData?._id, query.id]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(editPostField({[e.target.name]: e.target.value}))
    }

    const onUniqueDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(editPostField({
            uniqueData: {
                ...(editingPost?.uniqueData || {}),
                [e.target.name]: e.target.value
            }
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (
            editingPost._id && query.id &&
            (userData?._id === editingPost?.author?._id as unknown as string || userData.role === 'administrator')
        ) {
            dispatch(updatePostAction({
                ...editingPost,
                status: 'pending',
            }))
        }
    }

    const handleUpload = async (formData: FormData) => {
        const jsonData = {foo: "bar"}; // Replace with your JSON data
        // formData.append("data", JSON.stringify(jsonData));

        // await axios.post("/upload", formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        // });
    };

    const onMetaChangeHandler = (metas, type) => {
        dispatch(editPostField({[type]: metas}))
    }

    return (

        <ProfilePostPageStyle className={`profile-page create-new-post page-${sidebar || 'no'}-sidebar`}
                                  id={'content'}>
            <HeadSetter title={'Edit Post'}/>
            <div id={'primary'}>

                <div className={'info-box'}>
                    {!!editingPost?.status && <label>Status: {editingPost?.status}</label>}
                    {!!editingPost?.postType && userData?.role === 'administrator' &&
                        <label>Post Type: {editingPost?.postType}</label>}
                    {editingPost?.postType === 'ugcAd' && <AdMode onChangeHandler={onUniqueDataChangeHandler}/>}
                </div>



                <div className={'title-section field-section'}>
                    <input type="text"
                           placeholder={'Title'}
                           value={editingPost?.title}
                           onChange={onChangeHandler}
                           className={'form-control-input'}
                           name={'title'}/>
                </div>

                <div className={'description-section field-section'}>
                        <textarea name={'description'}
                                  placeholder={'Description'}
                                  className={'description form-control-input'}
                                  onChange={onChangeHandler}
                                  value={editingPost?.description}/>

                </div>



                <Csr>
                    {/*<MultipleImageUploader setImages={setImages}*/}
                    {/*                       handleFileSelect={handleFileSelect}*/}
                    {/*                       images={images}/>*/}
                </Csr>
                {editingPost?.postType === 'event' &&
                    <EventDates onChangeHandler={onUniqueDataChangeHandler} uniqueData={editingPost?.uniqueData}/>}
                {editingPost?.postType === 'event' &&
                    <div className={'capacity field-section'}>
                        <TextInput name={'capacity'} type={'number'} value={editingPost?.uniqueData?.capacity}
                                   title={'Capacity'}
                                   onChangeHandler={onUniqueDataChangeHandler}/>
                    </div>
                }

                <div className="meta-selector-section">
                    <p>Categories:</p>
                    <MetaDataSelector type={'categories'}
                                      onMetaChangeHandler={onMetaChangeHandler}
                                      onChangeHandler={onChangeHandler}
                    />
                </div>
                <div className="meta-selector-section">
                    <p>Tags:</p>
                    <MetaDataSelector type={'tags'}
                                      onMetaChangeHandler={onMetaChangeHandler}
                                      onChangeHandler={onChangeHandler}
                    />
                </div>

                {editingPost?.postType === 'video' &&
                    <>
                        <div className="meta-selector-section">
                            <p>Actors:</p>
                            <MetaDataSelector type={'actors'}
                                              onMetaChangeHandler={onMetaChangeHandler}
                                              onChangeHandler={onChangeHandler}
                            />
                        </div>
                    </>
                }

                {editingPost?.postType === 'ugcAd' && <Price onChangeHandler={onUniqueDataChangeHandler}/>}

                {/ugcAd|event/.test(editingPost?.postType) &&
                    <Location onChangeHandler={onUniqueDataChangeHandler}/>}
                {editingPost?.postType === 'ugcAd' && <PersonalInfo onChangeHandler={onUniqueDataChangeHandler}/>}

                {postType === 'article' ?
                    <CreateEditArticlePostField onChangeHandler={onChangeHandler}/>
                    : null
                }

                {editingPost?.postType === 'video' ?
                    <VideoTypeFields onChangeHandler={onChangeHandler}/>
                    : null
                }

                <button className={'btn btn-primary'} type={'submit'}>Save</button>

            </div>


        </ProfilePostPageStyle>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ], {
            setHeadData: true,
            page: 'editPost'
        },
        store)

    return null
})


export default post;
// <DynamicNoSSR>
//</DynamicNoSSR>