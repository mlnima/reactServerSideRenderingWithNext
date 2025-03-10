// // @ts-nocheck
// import React, {useState,useRef} from 'react';
// import {convertVariableNameToName, LanguagesOptions} from "@repo/utils";
// import styled from "styled-components";
// import {useSelector} from "react-redux";
// import {DashboardStore, utils} from "@repo/typescript-types";
// import TitleDescriptionSettingFields from "./TitleDescriptionSettingFields";
// import {useAppDispatch} from "@utils/hooks";
// import {editIdentityAction, updateSettingAction} from "@utils/reducers/settingsReducer";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
//
// let StyledForm = styled.form`
//   //background-color: white;
//   padding: 20px;
//
//   .forms {
//     .active-editing-language {
//       width: 100px;
//       margin: 10px 0;
//     }
//   }
//
//   button {
//     background-color: #f1f1f1;
//     color: black;
//     outline: none;
//     border: .4px #9fa3a8 solid;
//     padding: 8px 10px;
//     border-radius: 5px;
//
//     &:active {
//       background-color: white;
//       border: none;
//     }
//
//     margin: 20px;
//   }
//
//   .keywords {
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: flex-start;
//   }
//
//   .site-settings-form-section-parent {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
//     grid-gap: 10px;
//
//     .site-settings-form-section {
//       background-color: #33373c;
//       border-radius: 10px;
//       color: white;
//       padding: 10px;
//
//       input, textarea {
//         width: 90%;
//       }
//
//
//       .items {
//         display: flex;
//         flex-wrap: wrap;
//
//         .item {
//           display: flex;
//           align-items: center;
//           margin: 10px;
//
//           button {
//             margin: 5px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//           }
//         }
//       }
//     }
//
//     .checkbox-section {
//       //display: flex;
//
//     }
//
//     .siteMode {
//       background-color: red;
//     }
//
//     .language {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }
//
//   }
//
// `
//
// const General = () => {
//     const dispatch = useAppDispatch()
//     const keywordsInput = useRef(null)
//     const initialSettings = useSelector(({settings}: DashboardStore) => settings)
//
//     const [editingSettings, setEditingSettings] = useState({
//         activeEditingLanguage: 'default'
//     })
//
//     const sidebars = [
//         'homePageSidebar',
//         'postPageSidebar',
//         'postsPageSidebar',
//         'profilePageSidebar',
//         'userPageSidebar',
//         'tagsPageSidebar',
//         'categoriesPageSidebar',
//         'actorsPageSidebar',
//         'tagPageSidebar',
//         'categoryPageSidebar',
//         'actorPageSidebar',
//         'searchPageSidebar',
//     ]
//
//     const widgetAreas = ['topbar', 'header', 'footer', 'navigation']
//
//     const onChangeLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setEditingSettings({
//             ...editingSettings,
//             activeEditingLanguage: e.target.value
//         })
//     }
//
//     const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         dispatch(updateSettingAction({type: 'identity', data: identity}))
//     }
//
//     const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//         dispatch(editIdentityAction({[e.target.name]: e.target.checked}))
//     }
//
//     const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
//         const finalValue = e.target.value === 'true' ? true :
//             e.target.value === 'false' ? false :
//                 e.target.value
//         dispatch(editIdentityAction({[e.target.name]: finalValue}))
//     }
//     const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         if (editingSettings.activeEditingLanguage === 'default') {
//             dispatch(editIdentityAction({
//                     keywords: identity.keywords.filter(i => {
//                         return i !== e.currentTarget.name
//                     })
//                 }
//             ))
//         } else {
//             dispatch(editIdentityAction({
//                 translations: {
//                     ...identity.translations,
//                     [editingSettings.activeEditingLanguage]: {
//                         ...(identity.translations?.[editingSettings.activeEditingLanguage] || {}),
//                         keywords: identity.keywords.filter(i => {
//                             return i !== e.currentTarget.name
//                         })
//                     }
//                 }
//             }))
//         }
//     };
//
//     const addKeyword = () => {
//         const enteredKeywords = keywordsInput?.current?.value?.includes(',') ?
//             keywordsInput.current.value.split(',') :
//             [keywordsInput.current.value]
//         if (keywordsInput.current.value)
//             if (editingSettings.activeEditingLanguage === 'default') {
//                 dispatch(editIdentityAction({
//                     keywords: [...identity.keywords, ...enteredKeywords]
//                 }))
//             } else {
//                 dispatch(editIdentityAction({
//                     translations: {
//                         ...identity.translations,
//                         [editingSettings.activeEditingLanguage]: {
//                             ...(identity.translations?.[editingSettings.activeEditingLanguage] || {}),
//                             keywords: [
//                                 ...(identity.translations?.[editingSettings.activeEditingLanguage]?.keywords || []),
//                                 ...enteredKeywords
//                             ]
//                         }
//                     }
//                 }))
//             }
//         setTimeout(() => {
//             keywordsInput.current.value = ''
//         }, 1000)
//     };
//
//     const keywordsData = editingSettings.activeEditingLanguage === 'default' ?
//         identity?.keywords :
//         identity?.translations?.[editingSettings?.activeEditingLanguage]?.keywords || [];
//
//     const keywords = keywordsData?.map((item: string, index) => {
//         return (
//             <div key={index} className='item'>
//                 <p>{item}</p>
//                 <button name={item} onClick={(e) => deleteItem(e)}>
//                     <FontAwesomeIcon icon={faXmark}/>
//                 </button>
//             </div>
//         )
//     });
//
//     const onChangeHandlerWithTranslate = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
//         if (editingSettings.activeEditingLanguage === 'default') {
//             dispatch(editIdentityAction({[e.target.name]: e.target.value}))
//         } else {
//             dispatch(editIdentityAction({
//                 translations: {
//                     ...(identity.translations || {}),
//                     [editingSettings.activeEditingLanguage]: {
//                         ...(identity.translations?.[editingSettings.activeEditingLanguage] || {}),
//                         [e.target.name]: e.target.value
//                     }
//                 }
//             }))
//         }
//     }
//
//
//     return (
//
//         <StyledForm className='site-settings-form' onSubmit={e => onSubmitHandler(e)}>
//             <div className="forms">
//                 <h2>site identity:</h2>
//                 <h3>Site Info:</h3>
//                 <select name='activeEditingLanguage' className={'primarySelect active-editing-language'}
//                         onChange={e => onChangeLanguageHandler(e)}>
//                     <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'default'}</option>
//                     <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''}/>
//                 </select>
//                 <div className="siteIdentity site-settings-form-section-parent">
//                     <div className={'site-settings-form-section'}>
//                         <p>Site Name:</p>
//                         <input className={'primaryInput'}
//                                type='text'
//                                name='siteName'
//                                value={identity.siteName}
//                                onChange={e => onChangeHandlerWithTranslate(e)}
//                         />
//                     </div>
//                 </div>
//
//
//                 <div className="siteIdentity site-settings-form-section-parent">
//
//                     <TitleDescriptionSettingFields identity={identity}
//                                                    onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
//                                                    activeEditingLanguage={editingSettings.activeEditingLanguage}
//                     />
//
//
//                     <div className="site-settings-form-section keywords">
//                         <p>Keywords:</p>
//                         <input className={'primaryInput'} ref={keywordsInput} name='keywords'/>
//                         <button type='button' onClick={() => addKeyword()}>add</button>
//                         <span>Separate tags with commas</span>
//
//                         <div className="items">
//                             {keywords}
//                         </div>
//                     </div>
//                     <div className="site-settings-form-section siteMode">
//                         <p>site Mod:</p>
//                         <h4>Careful</h4>
//                         <select name='siteMode'
//                                 className={'primarySelect'}
//                             // @ts-ignore
//                                 value={identity.siteMode}
//                                 onChange={e => onChangeHandler(e)}>
//                             <option>Select</option>
//                             <option value='tube'>Tube</option>
//                             <option value='eCommerce'>E-Commerce</option>
//                             <option value='portFolio'>PortFolio</option>
//                             <option value='restaurant'>Restaurant</option>
//                         </select>
//                     </div>
//                     <div className="site-settings-form-section developmentMode">
//                         <p>Development Mode</p>
//                         <input type="checkbox" name='developmentMode'
//                             // @ts-ignore
//                                checked={identity.developmentMode}
//                                onChange={e => checkboxChangeHandler(e)}/>
//                     </div>
//                     <div className="site-settings-form-section developmentMode">
//                         <p>RTA Label</p>
//                         <input type="checkbox" name='rtaContent'
//                             // @ts-ignore
//                                checked={identity.rtaContent}
//                                onChange={e => checkboxChangeHandler(e)}/>
//                     </div>
//                     <div className="site-settings-form-section redirectToSSLPop checkbox-section">
//                         <p>Redirect To SSL Pop</p>
//                         <input type="checkbox" name='redirectToSSLPop'
//                             // @ts-ignore
//                                checked={identity.redirectToSSLPop}
//                                onChange={e => checkboxChangeHandler(e)}/>
//                         <p>Auto Redirect To Https</p>
//                         <input type="checkbox" name='autoRedirectToHttps'
//                             // @ts-ignore
//                                checked={identity.autoRedirectToHttps}
//                                onChange={e => checkboxChangeHandler(e)}/>
//                     </div>
//
//                     <div className="site-settings-form-section cookiePopupMessage">
//                         <p> Cookie Popup Message</p>
//                         <input type="checkbox" name='cookiePopupMessage'
//                             // @ts-ignore
//                                checked={identity.cookiePopupMessage}
//                                onChange={e => checkboxChangeHandler(e)}/>
//                         <p> Cookie Read More Link</p>
//
//                         <input className={'primaryInput'} type="text" name='cookieReadMoreLink'
//                             // @ts-ignore
//                                value={identity.cookieReadMoreLink || ''}
//                                onChange={e => onChangeHandler(e)}/>
//                         <p> Cookie Title Text</p>
//                         <input className={'primaryInput'} type='text' name='cookieTitleText' value={
//                             // @ts-ignore
//                             editingSettings.activeEditingLanguage === 'default' ? identity.cookieTitleText :
//                                 // @ts-ignore
//                                 identity.translations?.[editingSettings.activeEditingLanguage]?.cookieTitleText || ""
//                         } onChange={e => onChangeHandlerWithTranslate(e)}/>
//                         <p> Cookie Message Text</p>
//                         <textarea className={'primaryInput'} name='cookieMessageText' value={
//                             // @ts-ignore
//                             editingSettings.activeEditingLanguage === 'default' ? identity.cookieMessageText :
//                                 // @ts-ignore
//                                 identity.translations?.[editingSettings.activeEditingLanguage]?.cookieMessageText || ""
//                         } onChange={e => onChangeHandlerWithTranslate(e)}/>
//
//                     </div>
//                     <div className="site-settings-form-section defaultPostType">
//                         <p>Default new Post Type:</p>
//                         <select name='defaultPostType'
//                                 className={'custom-select'}
//                             // @ts-ignore
//                                 value={identity.defaultPostType}
//                                 onChange={e => onChangeHandler(e)}>
//                             <option>Select</option>
//                             <option value='video'>Video</option>
//                             <option value='standard'>Standard</option>
//                             <option value='product'>Product</option>
//                             <option value='promotion'>promotion</option>
//                             <option value='article'>Article</option>
//                             <option value='learn'>Learn</option>
//                             <option value='food'>Food</option>
//                             <option value='book'>Book</option>
//                         </select>
//                     </div>
//                     <div className="site-settings-form-section defaultPostRating">
//                         <p>Default new Post Rating:</p>
//                         <select name='defaultPostRating'
//                                 className={'custom-select'}
//                             // @ts-ignore
//                                 value={identity.defaultPostRating || false}
//                                 onChange={e => onChangeHandler(e)}>
//                             <option value='enable'>Enable</option>
//                             <option value='disable'>Disable</option>
//                         </select>
//                     </div>
//
//                     <div className="site-settings-form-section favIcon">
//                         <p>Fav Icon:</p>
//
//                         <input type='text'
//                                value={identity.favIcon}
//                                className={'primaryInput'}
//                                name='favIcon'
//                                placeholder='Fav Icon Url..'
//                                onChange={e => onChangeHandler(e)}/>
//                     </div>
//                     <div className="site-settings-form-section favIcon">
//                         <p>Google Analytics ID:</p>
//
//                         <input type='text'
//                             // @ts-ignore
//                                value={identity.googleAnalyticsId}
//                                className={'primaryInput'}
//                                name='googleAnalyticsId'
//                                placeholder='Google Analytics ID..'
//                                onChange={e => onChangeHandler(e)}/>
//                     </div>
//                     <div className="site-settings-form-section favIcon">
//                         <p>PWA icons</p>
//
//                         <input type='text'
//                                className={'primaryInput'}
//                             // @ts-ignore
//                                value={identity.pwa192}
//                                name='pwa192'
//                                placeholder='pwa192 Icon Url..'
//                                onChange={e => onChangeHandler(e)}
//                         />
//
//                         <input type='text'
//                                className={'primaryInput'}
//                             // @ts-ignore
//                                value={identity.pwa384}
//                                name='pwa384'
//                                placeholder='pwa384 Icon Url..'
//                                onChange={e => onChangeHandler(e)}
//                         />
//                         <input type='text'
//                                className={'primaryInput'}
//                             // @ts-ignore
//                                value={identity.pwa512}
//                                name='pwa512'
//                                placeholder='pwa512 Icon Url..'
//                                onChange={e => onChangeHandler(e)}
//                         />
//                     </div>
//                 </div>
//
//                 <div className={'site-settings-form-section'}>
//                     <p>Theme Color:</p>
//                     <input type='text'
//                            name='themeColor'
//                            className={'primaryInput'}
//                         // @ts-ignore
//                            value={identity.themeColor}
//                            onChange={e => onChangeHandler(e)}/>
//                 </div>
//                 <div className={'site-settings-form-section'}>
//                     <p>Posts Per Page:</p>
//                     <input type={'number'}
//                            name={'postsCountPerPage'}
//                            className={'primaryInput'}
//                            value={identity.postsCountPerPage}
//                            onChange={e => onChangeHandler(e)}/>
//                 </div>
//                 <h2>Widget Areas</h2>
//                 <div className={'site-settings-form-section-parent'}>
//                     {widgetAreas.map((widgetArea, index) => {
//                         return (
//                             <div className={'site-settings-form-section'} key={index}>
//                                 <p>{convertVariableNameToName(widgetArea)}:</p>
//                                 <select className={'custom-select'} name={widgetArea} value={identity?.[widgetArea]}
//                                         onChange={e => onChangeHandler(e)}>
//                                     <option>select</option>
//                                     <option value='enable'>Enable</option>
//                                 </select>
//                             </div>
//                         )
//                     })}
//                 </div>
//                 <h2>Sidebars Status</h2>
//                 <div className={'sidebarsStatus site-settings-form-section-parent'}>
//                     {sidebars.map((sidebar, index) => {
//                         return (
//                             <div className={'site-settings-form-section'} key={index}>
//                                 <p>{convertVariableNameToName(sidebar)}:</p>
//                                 {/*// @ts-ignore*/}
//                                 <select className={'custom-select'} name={sidebar} value={identity[sidebar]}
//                                         onChange={e => onChangeHandler(e)}>
//                                     <option value={'no'}>No</option>
//                                     <option value={'left'}>Left</option>
//                                     <option value={'right'}>Right</option>
//                                     <option value={'both'}>Both</option>
//                                 </select>
//                             </div>
//                         )
//                     })}
//                 </div>
//
//             </div>
//
//             <button className='submitBtn action-wide-button' type='submit'>save settings</button>
//         </StyledForm>
//
//     );
// };
//
// export default General;
//

const General = ()=>null

export default General;