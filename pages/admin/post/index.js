import React, {useEffect, useState, useContext, useRef} from 'react';
import {getPost, savePost, updatePost} from '../../../_variables/ajaxPostsVariables';
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
import {useRouter} from "next/router";

const Index = props => {
    const contextData = useContext(AppContext);
    const currencyElement = useRef(null)
    const activeEditingLanguage = useRef(null)
    const titleElement = useRef(null)
    const descriptionElement = useRef(null)
    const priceElement = useRef(null)
    const priceTypeElement = useRef(null)
    const router = useRouter()


    const [state, setState] = useState({
        tags: [],
        categories: [],
        actors: [],
        translations: {},
        inSlideShow: false
    })

    const [textInputsState, setTextInputsState] = useState({
        translations: {},
        title: '',
        description: ''

    })

    const [productInfo, setProductInfo] = useState({})

    const [siteIdentity, setSiteIdentity] = useState({
        translationLanguages: []
    })

    const [editingData, setEditingData] = useState({
        activeEditingLanguage: 'default'
    })

    useEffect(() => {
        console.log('props updated on Admin Post Page')
        if (router.query.new && state._id) {
            router.reload()
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

            setProductInfo({
                price: props.post.price,
                priceType: props.post.priceType,
                currency: props.post.currency,
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
    const onChangeHandlerForTextInputState = e => {
        setTextInputsState({
            ...textInputsState,
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
    const onActiveEditingLanguageChangeHandler = e => {
        setEditingData({
            ...editingData,
            activeEditingLanguage: e.target.value
        })

    }

    useEffect(() => {
        console.log(productInfo)
    }, [state]);

    const onSaveHandler = async () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        try {
            const postValue = {
                ...state,
                ...textInputsState,
                ...productInfo,
                author: state.author ? state.author : contextData.userData._id,

            }

            console.log(postValue)
            if (state._id) {
                // contextData.functions.updatePost(contextData.editingPostData)
                updatePost(postValue, window.location.origin).then(() => {
                    contextData.dispatchState({
                        ...contextData.state,
                        loading: false
                    })
                    props.router.push('/admin/post?id=' + state._id)
                }).catch(err => {
                    console.log(err)
                    contextData.dispatchState({
                        ...contextData.state,
                        loading: false
                    })
                })
            } else {

                savePost(postValue, window.location.origin).then(res => {

                    props.router.push('/admin/post?id=' + res.data.savedPostData._id)
                    contextData.dispatchState({
                        ...contextData.state,
                        loading: false
                    })
                }).catch(err => {

                    contextData.dispatchAlert({
                        ...contextData.alert,
                        active: true,
                        alertMessage: err.response.data.error,
                        type: 'error'
                    })
                    contextData.dispatchState({
                        ...contextData.state,
                        loading: false
                    })
                })
            }
        } catch (e) {
            console.log(e)
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }
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
                        <TitleDescription textInputsState={textInputsState} setTextInputsState={setTextInputsState}
                                          activeEditingLanguage={editingData.activeEditingLanguage}
                                          onChangeHandler={onTitleDescriptionChangeHandler}/>
                        <TextInputWithUploadBtn postData={state} onChangeHandler={onChangeHandler} name='mainThumbnail'
                                                title='Main thumbnail'/>
                        <ImagePreview postData={state}/>
                        <ProductInformation
                            postData={state}
                            productInfo={productInfo} setProductInfo={setProductInfo}
                            renderFor='product' component={ProductInformation}
                            title='Product Information' onChangeHandler={onChangeHandler}/>

                        <VideoInformation
                            postData={state} renderFor='video' component={VideoInformation}
                            title='Video Information' onChangeHandler={onChangeHandler}/>
                    </div>

                    <div className="side">
                        <DropDownWidget renderFor='all' postData={state} textInputsState={textInputsState}
                                        component={ActionOnPost} title={state.status}
                                        onChangeHandler={onChangeHandler} onSaveHandler={onSaveHandler}/>
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

    if (settings.identity.data.translationLanguages) {
        settings.identity.data.translationLanguages.forEach(lang => {
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
        if (!post.translations) {
            post.translations = {}
        }
    }

    return {post, query, ...settings}
};
export default withRouter(Index);