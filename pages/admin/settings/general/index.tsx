import React, {useState, useRef,useEffect} from 'react';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {convertVariableNameToName, languagesOptions} from '../../../../_variables/_variables'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";
import {updateSetting} from "../../../../store/actions/settingsActions";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

let StyledForm = styled.form`
  background-color: white;
  padding: 20px;

  button {
    background-color: #f1f1f1;
    color: black;
    outline: none;
    border: .4px #9fa3a8 solid;
    padding: 8px 10px;
    border-radius: 5px;

    &:active {
      background-color: white;
      border: none;
    }

    margin: 20px;
  }

  .keywords {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .site-settings-form-section-parent {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;

    .site-settings-form-section {
      background-color: #33373c;
      border-radius: 10px;
      color: white;
      padding: 10px;

      input,textarea {
width: 90%;
      }



      .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          display: flex;
          align-items: center;
          margin: 10px;

          button {
            margin: 5px;
          }
        }
      }
    }

    .checkbox-section {
      //display: flex;

    }

    .siteMode {
      background-color: red;
    }

    .language {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

  }

`

const settings = () => {
    const dispatch = useDispatch()
    const identity = useSelector((store:StoreTypes) => store.settings.identity)
    const keywordsInput = useRef(null)

    const [editingSettings, setEditingSettings] = useState({
        activeEditingLanguage: 'default'
    })

    const [state, setState] = useState({
        keywords: [],
        translations: {},
        anyoneCanRegister: ''

    });

    useEffect(() => {
        // @ts-ignore
        setState({
            ...state,
            ...identity
        });
    }, [identity]);

    const [sidebars, setSidebars] = useState([
        'homePageSidebar',
        'postPageSidebar',
        'postsPageSidebar',
        'profilePageSidebar',
        'userPageSidebar',
        'tagsPageSidebar',
        'categoriesPageSidebar',
        'actorsPageSidebar',
        'tagPageSidebar',
        'categoryPageSidebar',
        'actorPageSidebar',
        'searchPageSidebar',
    ])


    const onChangeLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditingSettings({
            ...editingSettings,
            activeEditingLanguage: e.target.value
        })
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setLoading(true))
        dispatch(updateSetting('identity', state))
    };

    const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.checked
        })
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const finalValue = e.target.value === 'true' ? true :
            e.target.value === 'false' ? false :
                e.target.value
        setState({
            ...state,
            [e.target.name]: finalValue
        })
    }
    const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setState({
            ...state,
            keywords: state.keywords.filter(i => {
                return i !== e.currentTarget.name
            }),
        })
    };
    const addKeyword = () => {
        if (editingSettings.activeEditingLanguage === 'default') {
            // @ts-ignore
            if (keywordsInput.current.value.includes(',')) {
                // @ts-ignore
                let newItems = keywordsInput.current.value.split(',');
                // @ts-ignore
                setState(state => ({
                    ...state,
                    // @ts-ignore
                    keywords: [...state.keywords, ...newItems]
                }))
            } else {
                setState({
                    ...state,
                    // @ts-ignore
                    keywords: [...state.keywords, keywordsInput.current.value]
                })
            }
        } else {
            // @ts-ignore
            if (keywordsInput.current.value.includes(',')) {
                // @ts-ignore
                let newItems = keywordsInput.current.value.split(',');
                setState(state => ({
                    ...state,
                    translations: {
                        ...state.translations,
                        [editingSettings.activeEditingLanguage]: {
                            // @ts-ignore
                            ...(state?.translations?.[editingSettings.activeEditingLanguage] || {}),
                            // @ts-ignore
                            keywords: [...(state.translations?.[editingSettings.activeEditingLanguage]?.keywords || []), ...newItems]
                        }
                    }
                }))
            } else {
                setState(state => ({
                    ...state,
                    translations: {
                        ...state.translations,
                        [editingSettings.activeEditingLanguage]: {
                            // @ts-ignore
                            ...(state?.translations?.[editingSettings.activeEditingLanguage] || {}),
                            // @ts-ignore
                            keywords: [...(state.translations?.[editingSettings.activeEditingLanguage]?.keywords || []), keywordsInput.current.value]
                        }
                    }

                }))
            }
        }

    };

    const keywordsData = editingSettings.activeEditingLanguage === 'default' ?
        state.keywords :
        // @ts-ignore
        state?.translations?.[editingSettings?.activeEditingLanguage]?.keywords || [];

    const keywords = keywordsData.map((item: {} | null | undefined) => {

        // @ts-ignore
        return (
            <div
                // @ts-ignore
                key={item}
                className='item'>
                <p>{item}</p>
                {/*// @ts-ignore*/}
                <button name={item} onClick={(e) => deleteItem(e)}> <FontAwesomeIcon icon={faTimes}/></button>
            </div>
        )
    });

    const onChangeHandlerWithTranslate = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editingSettings.activeEditingLanguage === 'default') {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        } else {
            setState({
                ...state,
                translations: {
                    ...state.translations,
                    [editingSettings.activeEditingLanguage]: {
                        // @ts-ignore
                        ...state.translations?.[editingSettings.activeEditingLanguage] || {},
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }

    // @ts-ignore
    return (

        <StyledForm className='site-settings-form' onSubmit={e => onSubmitHandler(e)}>
            <div className="forms">
                <h2>site identity:</h2>
                <h3>Site Info:</h3>
                <select name='activeEditingLanguage'   className={'custom-select'} onChange={e => onChangeLanguageHandler(e)}>
                    <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?? 'default'}</option>
                    {languagesOptions}
                </select>
                <div className="siteIdentity site-settings-form-section-parent">
                    <div className="site-settings-form-section">
                        <p>Site Title:</p>
                        <input className={'form-control-input'} type='text' name='title' value={
                            // @ts-ignore
                            editingSettings.activeEditingLanguage === 'default' ? state.title :
                                // @ts-ignore
                                state.translations?.[editingSettings.activeEditingLanguage]?.title || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Description:</p>
                        <textarea className={'form-control-input'} name='description' value={
                            // @ts-ignore
                            editingSettings.activeEditingLanguage === 'default' ? state.description :
                                // @ts-ignore
                                state.translations?.[editingSettings.activeEditingLanguage]?.description || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    </div>
                    <div className="site-settings-form-section keywords">
                        <p>Keywords:</p>
                        <input className={'form-control-input'} ref={keywordsInput} name='keywords'/>
                        <button type='button' onClick={() => addKeyword()}>add</button>
                        <span>Separate tags with commas</span>

                        <div className="items">
                            {keywords}
                        </div>
                    </div>
                    <div className="site-settings-form-section siteMode">
                        <p>site Mod:</p>
                        <h4>Careful</h4>
                        <select name='siteMode'
                                className={'custom-select'}
                            // @ts-ignore
                                value={state.siteMode}
                                onChange={e => onChangeHandler(e)}>
                            <option>Select</option>
                            <option value='tube'>Tube</option>
                            <option value='eCommerce'>E-Commerce</option>
                            <option value='portFolio'>PortFolio</option>
                            <option value='restaurant'>Restaurant</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section developmentMode">
                        <p>Development Mode</p>
                        <input  type="checkbox" name='developmentMode'
                            // @ts-ignore
                               checked={state.developmentMode}
                               onChange={e => checkboxChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section redirectToSSLPop checkbox-section">
                        <p>Redirect To SSL Pop</p>
                        <input type="checkbox" name='redirectToSSLPop'
                            // @ts-ignore
                               checked={state.redirectToSSLPop}
                               onChange={e => checkboxChangeHandler(e)}/>
                        <p>Auto Redirect To Https</p>
                        <input type="checkbox" name='autoRedirectToHttps'
                            // @ts-ignore
                               checked={state.autoRedirectToHttps}
                               onChange={e => checkboxChangeHandler(e)}/>
                    </div>

                    <div className="site-settings-form-section cookiePopupMessage">
                        <p> Cookie Popup Message</p>
                        <input type="checkbox" name='cookiePopupMessage'
                            // @ts-ignore
                               checked={state.cookiePopupMessage}
                               onChange={e => checkboxChangeHandler(e)}/>
                        <p> Cookie Read More Link</p>

                        <input className={'form-control-input'} type="text" name='cookieReadMoreLink'
                            // @ts-ignore
                               value={state.cookieReadMoreLink || ''}
                               onChange={e => onChangeHandler(e)}/>
                        <p> Cookie Title Text</p>
                        <input  className={'form-control-input'} type='text' name='cookieTitleText' value={
                            // @ts-ignore
                            editingSettings.activeEditingLanguage === 'default' ? state.cookieTitleText :
                                // @ts-ignore
                                state.translations?.[editingSettings.activeEditingLanguage]?.cookieTitleText || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>
                        <p> Cookie Message Text</p>
                        <textarea className={'form-control-input'} name='cookieMessageText' value={
                            // @ts-ignore
                            editingSettings.activeEditingLanguage === 'default' ? state.cookieMessageText :
                                // @ts-ignore
                                state.translations?.[editingSettings.activeEditingLanguage]?.cookieMessageText || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>

                    </div>
                    <div className="site-settings-form-section defaultPostType">
                        <p>Default new Post Type:</p>
                        <select name='defaultPostType'
                                className={'custom-select'}
                            // @ts-ignore
                                value={state.defaultPostType}
                                onChange={e => onChangeHandler(e)}>
                            <option>Select</option>
                            <option value='video'>Video</option>
                            <option value='standard'>Standard</option>
                            <option value='product'>Product</option>
                            <option value='promotion'>promotion</option>
                            <option value='article'>Article</option>
                            <option value='learn'>Learn</option>
                            <option value='food'>Food</option>
                            <option value='book'>Book</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section defaultPostRating">
                        <p>Default new Post Rating:</p>
                        <select name='defaultPostRating'
                                className={'custom-select'}
                            // @ts-ignore
                                value={state.defaultPostRating || false}
                                onChange={e => onChangeHandler(e)}>
                            <option value='enable'>Enable</option>
                            <option value='disable'>Disable</option>
                        </select>
                    </div>

                    <div className="site-settings-form-section favIcon">
                        <p>Fav Icon:</p>

                        <input type='text'
                            // @ts-ignore
                               value={state.favIcon}
                               className={'form-control-input'}
                               name='favIcon'
                               placeholder='Fav Icon Url..'
                               onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section favIcon">
                        <p>PWA icons</p>

                        <input type='text'
                               className={'form-control-input'}
                            // @ts-ignore
                               value={state.pwa192}
                               name='pwa192'
                               placeholder='pwa192 Icon Url..'
                               onChange={e => onChangeHandler(e)}
                        />

                        <input type='text'
                               className={'form-control-input'}
                            // @ts-ignore
                               value={state.pwa384}
                               name='pwa384'
                               placeholder='pwa384 Icon Url..'
                               onChange={e => onChangeHandler(e)}
                        />
                        <input type='text'
                               className={'form-control-input'}
                            // @ts-ignore
                               value={state.pwa512}
                               name='pwa512'
                               placeholder='pwa512 Icon Url..'
                               onChange={e => onChangeHandler(e)}
                        />
                    </div>

                    <div className="site-settings-form-section membership">
                        <p>Membership:</p>
                        <select name='membership'
                                className={'custom-select'}
                            // @ts-ignore
                                value={state.membership || false}
                                onChange={e => onChangeHandler(e)}>
                            <option value='true'>Enable</option>
                            <option value='false'>Disable</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section allowUserToPost">
                        <p>Allow Users To Create New Post:</p>
                        <select name='allowUserToPost'
                                className={'custom-select'}
                            // @ts-ignore
                                value={state.allowUserToPost || false}
                                onChange={e => onChangeHandler(e)}>
                            <option value='true'>Enable</option>
                            <option value='false'>Disable</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section allowUserToPost">
                        <p>Site Protocol:</p>
                        <select name='siteProtocol'
                                className={'custom-select'}
                            // @ts-ignore
                                value={state.siteProtocol}
                                onChange={e => onChangeHandler(e)}>

                            <option value='http'>HTTP</option>
                            <option value='https'>HTTPS</option>
                        </select>
                    </div>

                    <div className="site-settings-form-section anyoneCanRegister">
                        <p>Any One Can Register :</p>
                        <select name='anyoneCanRegister'
                                className={'custom-select'}
                            // @ts-ignore
                                value={state?.anyoneCanRegister || false}
                                onChange={e => onChangeHandler(e)}>
                            <option value='true'>Enable</option>
                            <option value='false'>Disable</option>
                        </select>
                    </div>
                </div>

                <div className="site-settings-form-section">
                    <p>Theme Color:</p>
                    <input type='text'
                           name='themeColor'
                           className={'form-control-input'}
                        // @ts-ignore
                           value={state.themeColor}
                           onChange={e => onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Posts Per Page:</p>
                    <input type='number'
                           name='postsCountPerPage'
                           className={'form-control-input'}
                        // @ts-ignore
                           value={state.postsCountPerPage}
                           onChange={e => onChangeHandler(e)}/>
                </div>
                <h2>Sidebars Status</h2>
                <div className="sidebarsStatus site-settings-form-section-parent">

                    {sidebars.map((sidebar,index) => {
                        return (
                            <div className="site-settings-form-section" key={index}>
                                <p>{convertVariableNameToName(sidebar)}:</p>
                                {/*// @ts-ignore*/}
                                <select className={'custom-select'} name={sidebar} value={state[sidebar]} onChange={e => onChangeHandler(e)}>
                                    <option>select</option>
                                    <option value='left'>Left</option>
                                    <option value='right'>Right</option>
                                    <option value='both'>Both</option>
                                    <option value='false'>No</option>
                                </select>
                            </div>
                        )
                    })}
                </div>

            </div>

            <button className='submitBtn action-wide-button' type='submit'>save settings</button>
        </StyledForm>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default settings;

