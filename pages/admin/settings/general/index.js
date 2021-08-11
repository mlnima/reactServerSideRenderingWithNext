import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {updateSetting, getSetting} from "../../../../_variables/ajaxVariables";
import FA from "react-fontawesome";
import {AppContext} from '../../../../context/AppContext'
import {convertVariableNameToName, getAbsolutePath, languagesOptions} from '../../../../_variables/_variables'
import styled from "styled-components";
import _ from "lodash";

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
      &:active{
        background-color: white;
        border:none;
      }
    margin: 20px;
  }
    .keywords {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .site-settings-form-section-parent{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-gap: 10px;
    .site-settings-form-section {
      background-color: #33373c;
      border-radius: 10px;
      color: white;
      padding: 10px;
      input {
        background-color: white;
        margin: 10px;
        border: 1px solid #33373c;
      }

      textarea {
        background-color: white;
        margin: 10px;
        width: 90%;
        border: 1px solid #33373c;
        min-height: 200px;
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
    
    .checkbox-section{
    //display: flex;
    
    }

    .siteMode{
      background-color: red;
    }
    .language{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

  }

`
const settings = props => {
    const contextData = useContext(AppContext);
    const keywordsInput = useRef(null)
    const [editingSettings, setEditingSettings] = useState({
        activeEditingLanguage: 'default'
    })
    const [state, setState] = useState({
        translationLanguages: [],
        keywords: [],
        translations: {}
    });

    const [sidebars,setSidebars]= useState([
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
    ])


    const renderSidebarOptions = sidebars.map(sidebar=>{
        return(
            <div className="site-settings-form-section" key={_.uniqueId('sidebar_')}>
                <p>{convertVariableNameToName(sidebar)}:</p>
                <select name={sidebar} value={state[sidebar]} onChange={e => onChangeHandler(e)}>
                    <option>select</option>
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                    <option value='both'>Both</option>
                    <option value='false'>No</option>
                </select>
            </div>
        )
    })



    useEffect(() => {
        setState({
            ...state,
            ...props.identity

        })
         getSetting('identity', process.env.REACT_APP_PRODUCTION_URL, false).then(res=>{

             setState({
                 ...state,
                 ...res.data.setting ? res.data.setting.data : {}

             })
         })


    }, []);



    const onChangeLanguageHandler = e => {
        setEditingSettings({
            ...editingSettings,
            activeEditingLanguage: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        contextData.functions.updateSetting('identity', state, props.domainName).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    };

    const checkboxChangeHandler = e=>{
        setState({
            ...state,
            [e.target.name]: e.target.checked
        })
    }


    const onChangeHandler = e => {
        const finalValue = e.target.value === 'true' ? true :
                 e.target.value === 'false' ? false :
                e.target.value
        setState({
            ...state,
            [e.target.name]: finalValue
        })
    }
    const deleteItem = (e) => {
        setState({
            ...state,
            keywords: state.keywords.filter(i => {
                return i !== e.currentTarget.name
            }),
        })
    };
    const addKeyword = () => {
        if (keywordsInput.current.value.includes(',')) {
            let newItems = keywordsInput.current.value.split(',');
            setState(state => ({
                ...state,
                keywords: [...state.keywords, ...newItems]
            }))
        } else {
            setState({
                ...state,
                keywords: [...state.keywords, keywordsInput.current.value]
            })
        }
        keywordsInput.current.value = ''
    };
    const keywords = state.keywords.map(item => {
        return (
            <div key={item} className='item'>
                <p>{item}</p>
                <button name={item} onClick={(e) => deleteItem(e)}><FA className='fontawesomeMedium' name='times'/></button>
            </div>
        )
    });

    const onChangeHandlerWithTranslate = e => {
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
                        ...state.translations?.[editingSettings.activeEditingLanguage] || {},
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }



    return (

        <StyledForm className='site-settings-form' onSubmit={e => onSubmitHandler(e)}>
            <div className="forms">
                <h2>site identity:</h2>
                <h3>Site Info:</h3>
                <select name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
                    <option value='default'>{process.env.REACT_APP_DEFAULT_LOCAL ?? 'default'}</option>
                    {languagesOptions}
                </select>
                <div className="siteIdentity site-settings-form-section-parent">
                    <div className="site-settings-form-section">
                        <p>Site Title:</p>
                        <input type='text' name='title' value={
                            editingSettings.activeEditingLanguage === 'default' ? state.title :
                                state.translations?.[editingSettings.activeEditingLanguage]?.title || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Description:</p>
                        <textarea name='description' value={
                            editingSettings.activeEditingLanguage === 'default' ? state.description :
                                state.translations?.[editingSettings.activeEditingLanguage]?.description || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    </div>
                    <div className="site-settings-form-section keywords">
                        <p>Keywords:</p>
                        <input ref={keywordsInput} name='keywords'/>
                        <button type='button' onClick={() => addKeyword()}>add</button>
                        <span>Separate tags with commas</span>

                        <div className="items">
                            {keywords}
                        </div>
                    </div>
                    <div className="site-settings-form-section siteMode">
                        <p>site Mod:</p>
                        <h4>Careful</h4>
                        <select name='siteMode' value={state.siteMode} onChange={e => onChangeHandler(e)}>
                            <option>Select</option>
                            <option value='tube'>Tube</option>
                            <option value='eCommerce'>E-Commerce</option>
                            <option value='portFolio'>PortFolio</option>
                            <option value='restaurant'>Restaurant</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section developmentMode">
                        <p>Development Mode</p>
                        <input type="checkbox" name='developmentMode' checked={state.developmentMode} onChange={e => checkboxChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section redirectToSSLPop checkbox-section">
                        <p>Redirect To SSL Pop</p>
                        <input type="checkbox" name='redirectToSSLPop'
                               checked={state.redirectToSSLPop}
                               onChange={e => checkboxChangeHandler(e)}/>
                        <p>Auto Redirect To Https</p>
                        <input type="checkbox" name='autoRedirectToHttps'
                               checked={state.autoRedirectToHttps}
                               onChange={e => checkboxChangeHandler(e)}/>
                    </div>

                    <div className="site-settings-form-section cookiePopupMessage">
                        <p> Cookie Popup Message</p>
                        <input type="checkbox" name='cookiePopupMessage'
                               checked={state.cookiePopupMessage}
                               onChange={e => checkboxChangeHandler(e)}/>
                        <p> Cookie Read More Link</p>

                        <input type="text" name='cookieReadMoreLink'
                               value={state.cookieReadMoreLink || ''}
                               onChange={e => onChangeHandler(e)}/>
                        <p> Cookie Title Text</p>
                        <input type='text' name='cookieTitleText' value={
                            editingSettings.activeEditingLanguage === 'default' ? state.cookieTitleText :
                                state.translations?.[editingSettings.activeEditingLanguage]?.cookieTitleText || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>
                        <p> Cookie Message Text</p>
                        <textarea name='cookieMessageText' value={
                            editingSettings.activeEditingLanguage === 'default' ? state.cookieMessageText :
                                state.translations?.[editingSettings.activeEditingLanguage]?.cookieMessageText || ""
                        } onChange={e => onChangeHandlerWithTranslate(e)}/>

                    </div>
                    <div className="site-settings-form-section defaultPostType">
                        <p>Default new Post Type:</p>
                        <select name='defaultPostType' value={state.defaultPostType} onChange={e => onChangeHandler(e)}>
                            <option>Select</option>
                            <option value='video'>Video</option>
                            <option value='standard'>Standard</option>
                            <option value='product'>Product</option>
                            <option value='redirect'>Redirect</option>
                            <option value='promotion'>promotion</option>
                            <option value='article'>Article</option>
                            <option value='code'>Code</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section defaultPostRating">
                        <p>Default new Post Rating:</p>
                        <select name='defaultPostRating' value={state.defaultPostRating || false} onChange={e => onChangeHandler(e)}>
                            <option value='enable'>Enable</option>
                            <option value='disable'>Disable</option>
                        </select>
                    </div>

                    <div className="site-settings-form-section favIcon">
                        <p>Fav Icon:</p>
                        <input type='text' value={state.favIcon} name='favIcon' placeholder='Fav Icon Url..' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section favIcon">
                        <p>PWA icons</p>
                        <input type='text' value={state.pwa192} name='pwa192' placeholder='pwa192 Icon Url..' onChange={e => onChangeHandler(e)}/>
                        <input type='text' value={state.pwa384} name='pwa384' placeholder='pwa384 Icon Url..' onChange={e => onChangeHandler(e)}/>
                        <input type='text' value={state.pwa512} name='pwa512' placeholder='pwa512 Icon Url..' onChange={e => onChangeHandler(e)}/>
                    </div>

                    <div className="site-settings-form-section membership">
                        <p>Membership:</p>
                        <select name='membership' value={state.membership || false} onChange={e => onChangeHandler(e)}>
                            <option value='true'>Enable</option>
                            <option value='false'>Disable</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section allowUserToPost">
                        <p>Allow Users To Create New Post:</p>
                        <select name='allowUserToPost' value={state.allowUserToPost || false} onChange={e => onChangeHandler(e)}>
                            <option value='true'>Enable</option>
                            <option value='false'>Disable</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section allowUserToPost">
                        <p>Site Protocol:</p>
                        <select name='siteProtocol' value={state.siteProtocol} onChange={e => onChangeHandler(e)}>
                            <option value='http'>HTTP</option>
                            <option value='https'>HTTPS</option>
                        </select>
                    </div>

                    <div className="site-settings-form-section anyoneCanRegister">
                        <p>Any One Can Register :</p>
                        <select name='anyoneCanRegister' value={state.anyoneCanRegister || false} onChange={e => onChangeHandler(e)}>
                            <option value='true'>Enable</option>
                            <option value='false'>Disable</option>
                        </select>
                    </div>
                </div>

                <div className="site-settings-form-section">
                    <p>Theme Color:</p>
                    <input type='text' name='themeColor' value={state.themeColor} onChange={e => onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Posts Per Page:</p>
                    <input type='number' name='postsCountPerPage' value={state.postsCountPerPage} onChange={e => onChangeHandler(e)}/>
                </div>
                <h2>Sidebars Status</h2>
                <div className="sidebarsStatus site-settings-form-section-parent">

                    {renderSidebarOptions}
                </div>

            </div>

            <button className='submitBtn action-wide-button' type='submit'>save settings</button>
        </StyledForm>

    );
};

export default settings;

// settings.getInitialProps = async ({pathname, query, req, res, err}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let identity;
//     const identityData = await getSetting('identity', domainName, false);
//     identity = identityData.data.setting ? identityData.data.setting.data : {}
//
//     return {domainName, identity}
// }

// export const getServerSideProps = async ({req}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let identity;
//     const identityData = await getSetting('identity', domainName, false);
//     identity = identityData.data.setting ? identityData.data.setting.data : {}
//
//     return {props: {domainName, identity}}
// }




// <div className="site-settings-form-section">
//     <p>Home Page Sidebar:</p>
//     <select name='homePageSidebar' value={state.homePageSidebar || false} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Post Page Sidebar:</p>
//     <select name='postPageSidebar' value={state.postPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Posts Page Sidebar:</p>
//     <select name='postsPageSidebar' value={state.postsPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// {/*<div className="site-settings-form-section">*/}
// {/*    <p>Meta Page Sidebar:</p>*/}
// {/*    <select name='metaPageSidebar' value={state.metaPageSidebar} onChange={e => onChangeHandler(e)}>*/}
// {/*        <option>select</option>*/}
// {/*        <option value='left'>Left</option>*/}
// {/*        <option value='right'>Right</option>*/}
// {/*        <option value='both'>Both</option>*/}
// {/*        <option value='false'>No</option>*/}
// {/*    </select>*/}
// {/*</div>*/}
// <div className="site-settings-form-section">
//     <p>Profile Page Sidebar:</p>
//     <select name='profilePageSidebar' value={state.profilePageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>User Page Sidebar:</p>
//     <select name='userPageSidebar' value={state.userPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Tags Page Sidebar:</p>
//     <select name='tagsPageSidebar' value={state.tagsPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Categories Page Sidebar:</p>
//     <select name='categoriesPageSidebar' value={state.categoriesPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Actors Page Sidebar:</p>
//     <select name='actorsPageSidebar' value={state.actorsPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Tag Page Sidebar:</p>
//     <select name='tagPageSidebar' value={state.tagPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Category Page Sidebar:</p>
//     <select name='categoryPageSidebar' value={state.categoryPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>
// <div className="site-settings-form-section">
//     <p>Actor Page Sidebar:</p>
//     <select name='actorPageSidebar' value={state.actorPageSidebar} onChange={e => onChangeHandler(e)}>
//         <option>select</option>
//         <option value='left'>Left</option>
//         <option value='right'>Right</option>
//         <option value='both'>Both</option>
//         <option value='false'>No</option>
//     </select>
// </div>