import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {updateSetting, getSetting} from "../../../../_variables/ajaxVariables";
import FA from "react-fontawesome";
import {AppContext} from '../../../../context/AppContext'
import {getAbsolutePath, languagesOptions} from '../../../../_variables/_variables'

const settings = props => {
    const contextData = useContext(AppContext);
    const keywordsInput = useRef(null)
    const [editingSettings, setEditingSettings] = useState({
        activeEditingLanguage: 'default'
    })
    const [state, setState] = useState({
        translationLanguages: [],
        keywords: [],
        translations:{}
    });
    useEffect(() => {
        setState({
            ...state,
            ...props.identity

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

    const onChangeHandler = e => {
        const finalValue = e.target.value === 'true' ? true :
            e.target.value === 'false' ? false : e.target.value
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
        <AdminLayout>
            <form id='site-settings-form' onSubmit={e => onSubmitHandler(e)}>
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
                            <input name='title' value={
                                editingSettings.activeEditingLanguage === 'default' ? state.title :
                                state.translations?.[editingSettings.activeEditingLanguage]?.title || ""
                            } onChange={e => onChangeHandlerWithTranslate(e)}/>
                        </div>
                        <div className="site-settings-form-section">
                            <p>Description:</p>
                            <textarea name='description' value={
                                editingSettings.activeEditingLanguage === 'default' ? state.description :
                                    state.translations?.[editingSettings.activeEditingLanguage]?.description || ""
                            }onChange={e => onChangeHandlerWithTranslate(e)}/>
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
                            <select name='developmentMode' value={state.developmentMode || false} onChange={e => onChangeHandler(e)}>
                                <option value='true'>ON</option>
                                <option value='false'>OFF</option>
                            </select>
                        </div>
                        <div className="site-settings-form-section defaultPostType">
                            <p>Default new Post Type:</p>
                            <select name='defaultPostType' value={state.defaultPostType} onChange={e => onChangeHandler(e)}>
                                <option>Select</option>
                                <option value='video'>Video</option>
                                <option value='standard'>Standard</option>
                                <option value='product'>Product</option>
                                <option value='food'>Food</option>
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
                            <input value={state.favIcon} name='favIcon' placeholder='Fav Icon Url..' onChange={e => onChangeHandler(e)}/>
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
                        {/*<div className="site-settings-form-section translationLanguages">*/}
                        {/*    <p>Translation Languages:</p>*/}
                        {/*    <div className='language'>*/}
                        {/*        <p>English</p>*/}
                        {/*        <input value='en' name='en' type='checkbox' checked={state.translationLanguages.includes('en')} onChange={e => onTranslationLanguagesChangeHandler(e)}/>*/}
                        {/*    </div>*/}
                        {/*    <div className='language'>*/}
                        {/*        <p>German</p>*/}
                        {/*        <input value='de' name='de' type='checkbox' checked={state.translationLanguages.includes('de')} onChange={e => onTranslationLanguagesChangeHandler(e)}/>*/}
                        {/*    </div>*/}
                        {/*    <div className='language'>*/}
                        {/*        <p>Persian</p>*/}
                        {/*        <input value='fa' name='fa' type='checkbox' checked={state.translationLanguages.includes('fa')} onChange={e => onTranslationLanguagesChangeHandler(e)}/>*/}
                        {/*    </div>*/}
                        {/*    <div className='language'>*/}
                        {/*        <p>Arabic</p>*/}
                        {/*        <input value='ar' name='ar' type='checkbox' checked={state.translationLanguages.includes('ar')} onChange={e => onTranslationLanguagesChangeHandler(e)}/>*/}
                        {/*    </div>*/}
                        {/*    <div className='language'>*/}
                        {/*        <p>Turkish</p>*/}
                        {/*        <input value='tr' name='tr' type='checkbox' checked={state.translationLanguages.includes('tr')} onChange={e => onTranslationLanguagesChangeHandler(e)}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="site-settings-form-section defaultSiteLanguage">*/}
                        {/*    <p>Default Site Language:</p>*/}
                        {/*    <input name='defaultSiteLanguage' value={state.defaultSiteLanguage} onChange={e => onChangeHandler(e)}/>*/}
                        {/*</div>*/}
                    </div>

                    <div className="site-settings-form-section">
                        <p>Theme Color:</p>
                        <input name='themeColor' value={state.themeColor} onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Posts Per Page:</p>
                        <input type='number' name='postsCountPerPage' value={state.postsCountPerPage} onChange={e => onChangeHandler(e)}/>
                    </div>
                    <h2>Sidebars Status</h2>
                    <div className="sidebarsStatus site-settings-form-section-parent">
                        <div className="site-settings-form-section">
                            <p>Home Page Sidebar:</p>
                            <select name='homePageSidebar' value={state.homePageSidebar || false} onChange={e => onChangeHandler(e)}>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                        </div>

                        <div className="site-settings-form-section">
                            <p>Post Page Sidebar:</p>
                            <select name='postPageSidebar' value={state.postPageSidebar} onChange={e => onChangeHandler(e)}>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                        </div>
                        <div className="site-settings-form-section">
                            <p>Posts Page Sidebar:</p>
                            <select name='postsPageSidebar' value={state.postsPageSidebar} onChange={e => onChangeHandler(e)}>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                        </div>
                        <div className="site-settings-form-section">
                            <p>Meta Page Sidebar:</p>
                            <select name='metaPageSidebar' value={state.metaPageSidebar} onChange={e => onChangeHandler(e)}>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                        </div>
                    </div>

                </div>

                <button className='submitBtn' type='submit'>save settings</button>
            </form>
        </AdminLayout>
    );
};

// settings.getInitialProps = async ({pathname, query, req, res, err}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let identity;
//     const identityData = await getSetting('identity', domainName, false);
//     identity = identityData.data.setting ? identityData.data.setting.data : {}
//
//     return {domainName, identity}
// }

export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let identity;
    const identityData = await getSetting('identity', domainName, false);
    identity = identityData.data.setting ? identityData.data.setting.data : {}

    return {props: {domainName, identity}}
}


export default settings;