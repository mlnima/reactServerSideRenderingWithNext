//
// import React, {FC, useEffect, useState} from "react";
// import {PostEditorFormStyles} from "@components/includes/PostEditorForm/Styles";
// import Csr from "@components/global/Csr";
// import MultipleImageUploader
//     from "./common/MultipleImageUploader/MultipleImageUploader";
// import useTranslation from "next-translate/useTranslation";
// import {Post} from "typescript-types";
// import MetaDataSelector from "@components/includes/profilePageComponents/profilePost/common/MetaDataSelector";
// import EventDates from "@components/includes/PostEditorForm/event/EventDates";
// import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";
// import Price from "@components/includes/PostEditorForm/common/Price";
// import dynamic from "next/dynamic";
// import VideoTypeFields from "@components/includes/profilePageComponents/profilePost/VideoTypeFields/VideoTypeFields";
// import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
// import updatePostAction from "@store_toolkit/clientReducers/postsReducers/updatePostAction";
// import {reduceArrayOfDataToIds} from "custom-util";
// import {clientAPIRequestUploadImage} from "api-requests";
// import {randomNumberGenerator} from "custom-util";
//
// const PostLocation = dynamic(() => import('@components/includes/PostEditorForm/common/PostLocation'));
//
// interface PropTypes {
//     data?: {}
// }
//
// const PostEditorForm: FC<PropTypes> = ({data}) => {
//     const {t} = useTranslation('common');
//     const dispatch = useAppDispatch();
//     const [postData, setPostData] = useState<any>({})
//     const userData = useAppSelector(({user}) => user.userData);
//
//     const onSelectImageHandler = async (event: any) => {
//         const formData = new FormData();
//         const selectedImages = event.target.files || event.dataTransfer.files;
//         if (!selectedImages?.length) return;
//
//         //rename files and append to form data
//         for await (const image of selectedImages) {
//             const newName = `${postData._id}-${userData._id}-${Date.now()}-${randomNumberGenerator(1,10000)}${image.name.substr(image.name.lastIndexOf('.'))}`;
//             const renamedFile = new File([image], newName, {type: image.type})
//             formData.append('images', renamedFile);
//         }
//
//         //append images data to form data
//         formData.append('imagesData', JSON.stringify({
//             usageType: 'post'
//         }));
//
//         //upload images
//         await clientAPIRequestUploadImage(formData).then(response => {
//             if (!!response.data?.images?.length){
//                 setPostData(prevState => ({...prevState, images: [...prevState.images, ...response.data?.images]}))
//             }
//         })
//     };
//
//     const onChangeHandler = (e: React.ChangeEvent<any>, isUniqueField?: boolean) => {
//         if (isUniqueField) {
//             setPostData(prevState => ({
//                 ...prevState,
//                 uniqueData: {...prevState.uniqueData, [e.target.name]: e.target.value}
//             }))
//         } else {
//             setPostData(prevState => ({...prevState, [e.target.name]: e.target.value}))
//         }
//
//     }
//
//     const onMetaChangeHandler = (metas, type) => {
//         setPostData(prevState => ({...prevState, [type]: metas}))
//     }
//
//     const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//         try {
//             e.preventDefault();
//
//             //clean post data
//             const comments = postData?.comments ? {comments: reduceArrayOfDataToIds(postData.comments)} : {}
//             const images = postData?.images ? {images: reduceArrayOfDataToIds(postData?.images)} : {}
//             const categories = postData?.categories ? {categories: reduceArrayOfDataToIds(postData.categories)} : {}
//             const tags = postData?.tags ? {tags: reduceArrayOfDataToIds(postData.tags)} : {}
//             const actors = postData?.actors ? {actors: reduceArrayOfDataToIds(postData.actors)} : {}
//             const author = postData?.author ? {author: postData.author?._id} : userData?._id
//
//             const editedPost = {
//                 ...postData,
//                 ...images,
//                 ...comments,
//                 ...categories,
//                 ...author,
//                 ...tags,
//                 ...actors,
//                 status: 'pending'
//             }
//
//             dispatch(updatePostAction(editedPost))
//
//         } catch (error) {
//
//         }
//     }
//
//     useEffect(() => {
//         if (data) {
//             setPostData(() => ({...data} as Post))
//         }
//     }, [data]);
//
//     useEffect(() => {
//
//     }, [postData.images]);
//
//     return (
//         <Csr>
//             <PostEditorFormStyles id={'primary'} onSubmit={onSubmitHandler}>
//                 <div className="formSection imageUploader">
//                     <MultipleImageUploader postData={postData}
//                                            setPostData={setPostData}
//                                            onSelectImageHandler={onSelectImageHandler}/>
//                 </div>
//                 <div className="formSection">
//                     <input type="text"
//                            placeholder={t<string>(`Title`)}
//                            value={postData?.title}
//                            onChange={onChangeHandler}
//                            className={'form-control-input'}
//                            name={'title'}/>
//                 </div>
//                 {postData?.postType === 'event' &&
//                     <div className="formSection">
//                         <EventDates onChangeHandler={e => onChangeHandler(e, true)} uniqueData={postData?.uniqueData}/>
//                         <TextInput name={'capacity'} type={'number'} value={postData?.uniqueData?.capacity}
//                                    title={'Capacity'}
//                                    onChangeHandler={e => onChangeHandler(e, true)}/>
//                     </div>
//                 }
//
//
//                 <div className="formSection description">
//                           <textarea name={'description'}
//                                     placeholder={t<string>(`Description`)}
//                                     className={'description form-control-input'}
//                                     onChange={onChangeHandler}
//                                     value={postData?.description as string}/>
//
//                 </div>
//                 <div className="formSection">
//                     <p>Categories:</p>
//                     <MetaDataSelector postData={postData} type={'categories'} maxLimit={1}
//                                       onMetaChangeHandler={onMetaChangeHandler}/>
//                 </div>
//                 <div className="formSection">
//                     <p>Tags:</p>
//                     <MetaDataSelector postData={postData} type={'tags'} maxLimit={5}
//                                       onMetaChangeHandler={onMetaChangeHandler}/>
//                 </div>
//                 {postData.postType === 'video' && <div className="formSection"><p>Tags:</p>
//                     <MetaDataSelector postData={postData} type={'tags'} maxLimit={5}
//                                       onMetaChangeHandler={onMetaChangeHandler}/>
//                 </div>
//                 }
//                 {postData?.postType === 'advertise' &&
//                     <div className="formSection">
//                         <Price onChangeHandler={e => onChangeHandler(e, true)}/>
//                     </div>
//                 }
//
//                 {/ugcAd|event/.test(postData?.postType as string) &&
//                     <div className="formSection">
//                         <PostLocation onChangeHandler={e => onChangeHandler(e, true)}/>
//                     </div>
//                 }
//
//                 {postData?.postType === 'video' &&
//                     <div className="formSection">
//                         <VideoTypeFields onChangeHandler={onChangeHandler}/>
//                     </div>
//                 }
//                 <button type={'submit'} className={'btn btn-primary submitButton'}>{t<string>(`Submit`)}</button>
//             </PostEditorFormStyles>
//         </Csr>
//     )
// };
// export default PostEditorForm;