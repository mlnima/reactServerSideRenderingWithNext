import React, {useEffect, useState, useContext, useRef} from 'react';
import {getPost} from '../../../_variables/ajaxPostsVariables';
import {getAbsolutePath} from '../../../_variables/_variables'
import AdminLayout from "../../../components/layouts/AdminLayout";
import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import {AppContext} from "../../../context/AppContext";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import Meta from "../../../components/adminIncludes/PostComponents/Meta/Meta";
import VideoInformation from "../../../components/adminIncludes/PostComponents/VideoInformation/VideoInformation";
import withRouter from "next/dist/client/with-router";
import TextInputWithUploadBtn from '../../../components/adminIncludes/TextInputWithUploadBtn/TextInputWithUploadBtn'
import ImagePreview from '../../../components/adminIncludes/PostComponents/ImagePreview/ImagePreview';
import Link from 'next/link'
import dataDecoder from '../../../server/tools/dataDecoder'
import ProductInformation from '../../../components/adminIncludes/PostComponents/ProductInformation/ProductInformation'
import {getMultipleSetting} from '../../../_variables/ajaxVariables'
import RatingOption from '../../../components/adminIncludes/PostComponents/RatingOption/RatingOption'

const Index = props => {
    const activeEditingLanguage = useRef(null)
    const titleElement = useRef(null)
    const descriptionElement = useRef(null)

    const [state, setState] = useState({
        tags: [],
        categories: [],
        actors: [],
        translations: {},
        inSlideShow: false
    })

    const [textInputsState, setTextInputsState] = useState({
        translations: {}
    })

    const [siteIdentity, setSiteIdentity] = useState({
        translationLanguages: []
    })

    const [editingData, setEditingData] = useState({
        activeEditingLanguage: 'default'
    })

    useEffect(() => {
        if (props.router.query.new && state._id) {
            props.router.reload()
        } else {
            if (props.identity) {
                setSiteIdentity({
                    ...siteIdentity,
                    ...props.identity.data
                })
            }

            setState({
                ...props.post,
                translations: props.post.translations ? props.post.translations : {}
            })

            setTextInputsState({
                title: props.post.title,
                description: props.post.description,
                translations: props.post.translations,
            })

        }
    }, [props]);

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const onTitleDescriptionChangeHandler = e => {
        if (editingData.activeEditingLanguage === 'default') {
            setTextInputsState({
                ...textInputsState,
                [e.target.name]: e.target.value
            })

        } else {
            setTextInputsState({
                ...textInputsState,
                translations: {
                    ...textInputsState.translations,
                    [editingData.activeEditingLanguage]: {
                        ...textInputsState.translations[editingData.activeEditingLanguage],
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }


    const onPostMetaChangeHandler = (type, data) => {
        setState({
            ...state,
            [type]: [...state[type], ...data]
        })
    }
    const onDeleteMetaFromPost = (type, name) => {
        setState({
            ...state,
            [type]: state[type].filter(i => i.name != name)
        })
    }


    const languagesOptions = siteIdentity.translationLanguages.map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    })


    // useEffect(() => {
    //     setTextInputsState({
    //         ...textInputsState,
    //         translations: {
    //             ...textInputsState.translations ? textInputsState.translations : {},
    //             [editingData.activeEditingLanguage]: textInputsState.translations[editingData.activeEditingLanguage] ? {...textInputsState.translations[editingData.activeEditingLanguage]} : {}
    //         }
    //     })
    // }, [editingData.activeEditingLanguage]);


    useEffect(() => {
        console.log(textInputsState)
    }, [textInputsState,props]);


    useEffect(() => {
        console.log(props)
    }, [props]);

    const onActiveEditingLanguageChangeHandler = e => {
        setEditingData({
            ...editingData,
            activeEditingLanguage: e.target.value
        })

    }

    return (
        <>
            <AdminLayout>
                <Link href='/admin/post?new=1'><a className='newPostLinkAdminPanel'>New Post</a></Link>
                <div className='Post'>

                    <div className="content">

                        <p>Translation(you need to activate the language in general settings)</p>
                        <select onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                            <option value='default'>Default</option>
                            {languagesOptions}
                        </select>
                        <TitleDescription activeEditingLanguage={editingData.activeEditingLanguage}
                                          titleElement={titleElement} descriptionElement={descriptionElement}
                                          textInputsState={textInputsState}
                                          onChangeHandler={onTitleDescriptionChangeHandler}/>
                        <TextInputWithUploadBtn postData={state} onChangeHandler={onChangeHandler} name='mainThumbnail'
                                                title='Main thumbnail'/>
                        <ImagePreview postData={state}/>
                        <DropDownWidget postData={state} renderFor='product' component={ProductInformation}
                                        title='Product Information' onChangeHandler={onChangeHandler}/>
                        <DropDownWidget postData={state} renderFor='video' component={VideoInformation}
                                        title='Video Information' onChangeHandler={onChangeHandler}/>
                    </div>

                    <div className="side">
                        <DropDownWidget renderFor='all' postData={state} textInputsState={textInputsState}
                                        component={ActionOnPost} title={state.status}
                                        onChangeHandler={onChangeHandler}/>
                        <DropDownWidget renderFor='all' postData={state} component={Format} title='Format'
                                        onChangeHandler={onChangeHandler}/>
                        <DropDownWidget renderFor='all' postData={state} isNewPost={props.query.new === 'true'}
                                        component={Meta}
                                        type='categories' title='Post Category'
                                        onChangeHandler={onChangeHandler}
                                        onPostMetaChangeHandler={onPostMetaChangeHandler}
                                        onDeleteHandler={onDeleteMetaFromPost}/>
                        <DropDownWidget renderFor='all' postData={state} isNewPost={props.query.new === 'true'}
                                        component={Meta}
                                        type='tags' title='Post Tags'
                                        onChangeHandler={onChangeHandler}
                                        onPostMetaChangeHandler={onPostMetaChangeHandler}
                                        onDeleteHandler={onDeleteMetaFromPost}/>
                        <DropDownWidget renderFor='all' postData={state} isNewPost={props.query.new === 'true'}
                                        component={Meta}
                                        type='actors' title='Post Actors'
                                        onChangeHandler={onChangeHandler}
                                        onPostMetaChangeHandler={onPostMetaChangeHandler}
                                        onDeleteHandler={onDeleteMetaFromPost}/>
                        <DropDownWidget renderFor='all' postData={state} isNewPost={props.query.new === 'true'}
                                        component={RatingOption}
                                        title='Rating'
                                        onChangeHandler={onChangeHandler}/>


                    </div>

                </div>
            </AdminLayout>
        </>
    );
};

Index.getInitialProps = async ({query, req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let post;
    let postData
    let requestBody;
    let settings;
    const settingsData = await getMultipleSetting({settings: ['identity']}, domainName, false, 'adminPostPage')
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
        disLikes: 0,
        translations: {}
    }

    if (settings.identity.data.translationLanguages){
        settings.identity.data.translationLanguages.forEach(lang=>{
            newPostData.translations[lang] = ''
        })
    }







    if (query.new) {
        post = newPostData
    } else if (query.id) {
        requestBody = {
            _id: query.id,
        };

        postData = await getPost(requestBody, domainName, false, query.id)
        post = postData.data ? postData.data.post : newPostData
    }

    return {post, query, ...settings}
};
export default withRouter(Index);