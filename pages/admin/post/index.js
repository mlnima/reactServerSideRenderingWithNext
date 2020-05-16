import React, { useEffect, useState, useContext, useRef } from 'react';
import { getPost } from '../../../_variables/ajaxPostsVariables';
import { getAbsolutePath } from '../../../_variables/_variables'

import AdminLayout from "../../../components/layouts/AdminLayout";
import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import { AppContext } from "../../../context/AppContext";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import PostCategoriesTagsActors from "../../../components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors";
import VideoInformation from "../../../components/adminIncludes/PostComponents/VideoInformation/VideoInformation";
import withRouter from "next/dist/client/with-router";
import TextInputWithUploadBtn from '../../../components/adminIncludes/TextInputWithUploadBtn/TextInputWithUploadBtn'
import ImagePreview from '../../../components/adminIncludes/PostComponents/ImagePreview/ImagePreview';
import Link from 'next/link'
import dataDecoder from '../../../server/tools/dataDecoder'
import ProductInformation from '../../../components/adminIncludes/PostComponents/ProductInformation/ProductInformation'
import { getMultipleSetting } from '../../../_variables/ajaxVariables'
import RatingOption from '../../../components/adminIncludes/PostComponents/RatingOption/RatingOption'

const Index = props => {
    const contextData = useContext(AppContext);

    const [ state, setState ] = useState({
        tags: [],
        categories: [],
        actors: [],
        inSlideShow: false
    })

    useEffect(() => {
        console.log(props)
    }, [ props ]);

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const onPostMetaChangeHandler = (type, data) => {
        setState({
            ...state,
            [type]: data
        })
    }

    useEffect(() => {
        if (props.router.query.new&& state._id){
            props.router.reload()
        }else {
            setState(props.post)
        }
    }, [ props ]);



    return (
        <>
            <AdminLayout>
                <Link href='/admin/post?new=1'><a className='newPostLinkAdminPanel'>New Post</a></Link>
                <div className='Post'>

                    <div className="content">
                        <TitleDescription postData={ state } onChangeHandler={ onChangeHandler }/>
                        <TextInputWithUploadBtn postData={ state } onChangeHandler={ onChangeHandler } name='mainThumbnail' title='Main thumbnail'/>
                        <ImagePreview postData={ state }/>
                        <DropDownWidget postData={ state } renderFor='product' component={ ProductInformation } title='Product Information' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget postData={ state } renderFor='video' component={ VideoInformation } title='Video Information' onChangeHandler={ onChangeHandler }/>
                    </div>

                    <div className="side">
                        <DropDownWidget renderFor='all' postData={ state } component={ ActionOnPost } title={ state.status } onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget renderFor='all' postData={ state } component={ Format } title='Format' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget renderFor='all' postData={ state } isNewPost={ props.query.new === 'true' }
                                        component={ PostCategoriesTagsActors }
                                        type='categories' title='Post Category'
                                        onChangeHandler={ onChangeHandler } onPostMetaChangeHandler={ onPostMetaChangeHandler }/>
                        <DropDownWidget renderFor='all' postData={ state } isNewPost={ props.query.new === 'true' }
                                        component={ PostCategoriesTagsActors }
                                        type='tags' title='Post Tags'
                                        onChangeHandler={ onChangeHandler } onPostMetaChangeHandler={ onPostMetaChangeHandler }/>
                        <DropDownWidget renderFor='all' postData={ state } isNewPost={ props.query.new === 'true' }
                                        component={ PostCategoriesTagsActors }
                                        type='actors' title='Post Actors'
                                        onChangeHandler={ onChangeHandler } onPostMetaChangeHandler={ onPostMetaChangeHandler }/>
                        <DropDownWidget renderFor='all' postData={ state } isNewPost={ props.query.new === 'true' }
                                        component={ RatingOption }
                                        title='Rating'
                                        onChangeHandler={ onChangeHandler }/>


                    </div>

                </div>
            </AdminLayout>
        </>
    );
};

Index.getInitialProps = async ({ query, req }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let post;
    let postData
    let requestBody;
    let settings;
    const settingsData = await getMultipleSetting({ settings: [ 'identity' ] }, false, domainName, 'adminPostPage')
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []

    const newPostData = {
        status: 'published',
        postType: settings.identity.data.defaultPostType || 'video',
        rating: settings.identity.data.defaultPostRating || 'enable',
        tags: [],
        categories: [],
        actors: [],
        inSlideShow: false,
        quality: '2160p',
        views: 0,
        likes: 0,
        disLikes: 0
    }

    if (query.new) {
        post = newPostData
    } else if (query.postTitle || query.id) {
        requestBody = {
            postTitle: query.postTitle,
            _id: query.id,
        };

        postData = await getPost(requestBody, false, domainName,query.id)
        post = postData.data ? dataDecoder(postData.data.post).post : newPostData
    }

    return { post, query,...settings }
};
export default withRouter(Index);