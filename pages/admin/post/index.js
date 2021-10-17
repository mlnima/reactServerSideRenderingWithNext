import {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import {getPost, savePost, updatePost} from '../../../_variables/ajaxPostsVariables';
import {getAbsolutePath} from '../../../_variables/_variables'
import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import Meta from "../../../components/adminIncludes/PostComponents/Meta/Meta";
import withRouter from "next/dist/client/with-router";
import Link from 'next/link'
import {getMultipleSetting} from '../../../_variables/ajaxVariables'
import RatingOption from '../../../components/adminIncludes/PostComponents/RatingOption/RatingOption'
import {useRouter} from "next/router";
import PostInformation from "../../../components/adminIncludes/PostComponents/PostInformation/PostInformation";

import {languagesOptions} from "../../../_variables/_variables";
import _ from "lodash";

import styled from "styled-components";
const AdminPostPageStyledDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 200px;
    grid-gap: 10px;

`


const Index = props => {
    const contextData = useContext(AppContext);
    const router = useRouter();
    const languageElement = useRef(null)


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
                ...state,
                ...props.post,
                translations: props.post?.translations || {}
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
    // const onChangeHandlerForTextInputState = e => {
    //     setTextInputsState({
    //         ...textInputsState,
    //         [e.target.name]: e.target.value
    //     })
    // };

    const onTranslatedInputChangeHandler = e => {

        if (languageElement?.current?.value === 'default') {
            setTextInputsState({
                ...textInputsState,
                [e.target.name]: e.target.value
            })

        } else {
            setTextInputsState({
                ...textInputsState,
                translations: {
                    ...textInputsState.translations,
                    [languageElement?.current?.value]: {
                        ...textInputsState.translations[languageElement?.current?.value],
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }


    const onDescriptionChangeHandler = data => {
        const e = {
            target: {
                name: 'description',
                value: data
            }
        }
        onTranslatedInputChangeHandler(e)
    }

    const onPostMetaChangeHandler = (type, data) => {
        const previousMetaData = state?.[type] || [] ;
        const uniqItems = _.uniqBy([...previousMetaData, ...data], (e) => {
            return e.name;
        })

        setState(prevState => ({
            ...prevState,
            [type]: uniqItems
        }))
    }
    const onDeleteMetaFromPost = (type, name) => {
        setState({
            ...state,
            [type]: state[type].filter(i => i.name != name)
        })
    }


    const onActiveEditingLanguageChangeHandler = e => {
        setEditingData({
            ...editingData,
            activeEditingLanguage: e.target.value
        })
    }


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
        } catch (err) {
            console.log(err)
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }
    }


    // const renderWidgetEditors = (state.widgets ? state.widgets.sort((a, b) => (a.widgetIndex > b.widgetIndex) ? 1 : -1) : []).map(widgetEditorData => {
    //     return (
    //         <div className='post-admin-widget-editor'>
    //             <WidgetModel state={state} setState={setState} widgetIndex={widgetEditorData ? widgetEditorData.widgetIndex ? widgetEditorData.widgetIndex : 0 : 0} isPost={true}
    //                          key={(state.widgets || []).indexOf(widgetEditorData)}
    //                 //data={{data: widgetEditorData}}
    //                          data={widgetEditorData}
    //                          translationLanguages={siteIdentity.translationLanguages || []}/>
    //         </div>
    //     )
    // })

    return (
        <>

            <Link href='/admin/post?new=1'><a className={'btn btn-info'}>New Post</a></Link>
            <AdminPostPageStyledDiv className='admin-post'>
                <div className="content">
                    <select className={'custom-select'} ref={languageElement} onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                        <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'Default'}</option>
                        {languagesOptions}
                    </select>

                    <TitleDescription textInputsState={textInputsState} setTextInputsState={setTextInputsState}
                                      activeEditingLanguage={editingData.activeEditingLanguage}
                                      onChangeHandler={onTranslatedInputChangeHandler}
                                      onDescriptionChangeHandler={onDescriptionChangeHandler}

                    />


                    {/*{renderWidgetEditors}*/}
                    <PostInformation productInfo={productInfo} setProductInfo={setProductInfo} postData={state} onChangeHandler={onChangeHandler}/>

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

                    {
                        state.postType === 'video' ?
                            <DropDownWidget renderFor='all'
                                            postData={state}
                                            isNewPost={props.query.new === 'true'}
                                            component={Meta}
                                            type='actors' title='Post Actors'
                                            onChangeHandler={onChangeHandler}
                                            onPostMetaChangeHandler={onPostMetaChangeHandler}
                                            onDeleteHandler={onDeleteMetaFromPost}/>
                            :null
                    }

                    <DropDownWidget renderFor='all' postData={state} isNewPost={props.query.new === 'true'}
                                    component={RatingOption}
                                    title='Rating'
                                    onChangeHandler={onChangeHandler}/>

                </div>

            </AdminPostPageStyledDiv>
        </>
    );
};

export const getServerSideProps = async ({req, query}) => {

    let post;
    let postData
    let requestBody;
    const settingsData = await getMultipleSetting({settings: ['identity']}, false)
    let settings = settingsData.data ? {
        identity: settingsData?.data?.settings.find(s => s.type === 'identity'),
    } : {}


    const newPostData = {
        status: 'published',
        postType: settings.identity.data.defaultPostType || 'standard',
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

        postData = await getPost(requestBody, false)
        post = postData.data ? postData.data.post : newPostData
        if (!post.translations) {
            post.translations = {}
        }
    }

    return {props: {post, query, ...settings}}

}


export default withRouter(Index);