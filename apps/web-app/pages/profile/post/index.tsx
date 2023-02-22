import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import {useRouter} from "next/router";
import CreateEditArticlePostField
    from "../../../components/includes/profilePageComponents/profilePost/CreateEditArticlePostField/CreateEditArticlePostField";
import TextInput from "../../../components/includes/profilePageComponents/profilePost/common/TextInput";
import MetaDataSelector from "../../../components/includes/profilePageComponents/profilePost/common/MetaDataSelector";
import ThumbnailsUploader
    from "../../../components/includes/profilePageComponents/profilePost/common/ThumbnailsUploader";
import VideoTypeFields
    from "../../../components/includes/profilePageComponents/profilePost/VideoTypeFields/VideoTypeFields";
import {editPostField, setEditingPostImagesToUpload} from "@store_toolkit/clientReducers/postsReducer/postsReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import postDataCleanerBeforeSave from "@_variables/post-variables/postDataCleanerBeforeSave";
import {Store} from "typescript-types";
import EventDates from "@components/pagesIncludes/profile/post/event/EventDates";
import getEditingPostAction from "@store_toolkit/clientReducers/postsReducer/getEditingPostAction";
import createNewPostAction from "@store_toolkit/clientReducers/postsReducer/createNewPostAction";
import updatePostAction from "@store_toolkit/clientReducers/postsReducer/updatePostAction";

const AdMode = dynamic(() => import('@components/pagesIncludes/profile/post/ucgAd/AdMode'));
const Price = dynamic(() => import('@components/pagesIncludes/profile/post/common/Price'));
const Location = dynamic(() => import('@components/pagesIncludes/profile/post/common/Location'));
const PersonalInfo = dynamic(() => import('@components/pagesIncludes/profile/post/common/PersonalInfo'));
const DatePickerComponent = dynamic(() => import('@components/pagesIncludes/profile/post/common/DatePickerComponent'));

const ProfilePostPageStyledDiv = styled.div`
  margin: 20px auto;
  box-sizing: border-box;
  max-width: 738px;

  .create-new-post-fields {

    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin: 20px 5px;
    gap: 8px;
    padding: 8px;
    box-sizing: border-box;
    background-color: var(--secondary-background-color, #181818);
    
    .field-section{
      width: 100%;
     p{
       width: 20%;
     }
    }
    
    .description-section, .title-section ,.capacity{
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 8px;

      .description {
        min-height: 90px;
      }

      input, .description {
        width: 80%;
      }
    }
    
    .meta-selector-section {
      display: grid;
      grid-template-columns: 20% 80%;
    }

    .admin-control-fields {
      border: var(--default-border);
      background-color: var(--secondary-background-color, #181818);
    }
  }

  @media only screen and (min-width: 768px) {
    .create-new-post-fields {
      margin: auto;
    }
  }
`
const post = () => {
    const dispatch = useAppDispatch();
    const {query, push} = useRouter();
    const postType = query?.postType;

    const {loggedIn,userData, editingPost,sidebar} = useSelector(({settings,user,posts}: Store) => {
        return {
            sidebar: settings?.identity?.profilePageSidebar,
            loggedIn: user.loggedIn,
            userData: user.userData,
            editingPost: posts?.editingPost,
        }
    })

    useEffect(() => {
        if (query.id) {
            dispatch(getEditingPostAction(query.id as string));
        } else if (!query.id && !!query?.new && !!query?.postType && loggedIn) {

            const unpopulatedPostData = postDataCleanerBeforeSave(editingPost)
            dispatch(createNewPostAction({
                data: {
                    ...unpopulatedPostData,
                    status: 'pending',
                    postType: query?.postType as string,
                    author: userData._id
                }
            }))
        }
    }, [userData._id]);

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
            (userData?._id === editingPost.author._id as unknown as string || userData.role === 'administrator')
        ) {
            dispatch(updatePostAction({
                ...editingPost,
                status: 'pending',
            }))
        }
    }

    const onMetaChangeHandler = (metas, type) => {
        dispatch(editPostField({[type]: metas}))
    }


    return (

            <ProfilePostPageStyledDiv className={`profile-page create-new-post page-${sidebar || 'no'}-sidebar`}
                                      id={'content'}>
                <div id={'primary'}>
                    <form className={'create-new-post-fields'} onSubmit={e => onSubmitHandler(e)}>

                        {!!editingPost?.status && <label>Status: {editingPost?.status}</label>}
                        {!!editingPost?.postType && userData?.role === 'administrator' &&
                            <label>Post Type: {editingPost?.postType}</label>}
                        {editingPost?.postType === 'ugcAd' && <AdMode onChangeHandler={onUniqueDataChangeHandler}/>}
                        <div className={'title-section field-section'}>
                            <TextInput required={true} name={'title'} type={'text'} value={editingPost?.title}
                                       title={'Title'}
                                       onChangeHandler={onChangeHandler}/>
                        </div>
                        { editingPost?.postType === 'event' &&
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

                        <div className={'description-section field-section'}>
                            <TextInput required={true} name={'description'} type={'textarea'}
                                       value={editingPost?.description}
                                       title={'Description'}
                                       onChangeHandler={onChangeHandler}
                                       className={'description'}/>
                        </div>


                        <ThumbnailsUploader mainThumbnail={editingPost?.mainThumbnail}
                                            postId={editingPost?._id}
                            //@ts-ignore
                                            images={editingPost?.images}
                        />

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
                    </form>
                </div>



            </ProfilePostPageStyledDiv>

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