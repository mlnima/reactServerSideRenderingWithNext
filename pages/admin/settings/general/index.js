import React, { useEffect, useState, useContext,useRef } from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import { updateSetting,getSetting } from "../../../../_variables/ajaxVariables";
import FA from "react-fontawesome";

const settings = props => {
    const keywordsInput = useRef(null)
    const [ state, setState ] = useState({
        siteAddress:props.identity.siteAddress||'',
        protocol:props.identity.protocol||'',
        title: props.identity.title||'website title',
        themeColor: props.identity.themeColor||'#000',
        description: props.identity.description||'website description',
        keywords: props.identity.keywords||[],
        logoText:props.identity.logoText||'',
        headLine:props.identity.headLine||'',
        homePageH1:props.identity.homePageH1||'',
        homePagePagination:props.identity.homePagePagination||false,
        postsCountPerPage:props.identity.postsCountPerPage||30,
        homePageSidebar:props.identity.homePageSidebar||false,

        categoriesPageSidebar:props.identity.categoriesPageSidebar||false,
        tagsPageSidebar:props.identity.tagsPageSidebar||false,
        actorsPageSidebar:props.identity.actorsPageSidebar||false,
        postPageSidebar:props.identity.postPageSidebar||false


    });
    useEffect(() => {

        console.log(props)
    }, [props]);

    //
    // useEffect(()=>{
    //  getSetting('identity').then(res=>{
    //      if (res.data.setting){
    //          setState({
    //              ...state,
    //              ...res.data.setting.data
    //          })
    //      }else {
    //          setState({
    //              ...state,
    //              title: 'website title',
    //              themeColor: '#000',
    //              description: 'website description',
    //              Keywords: ['keywords']
    //          })
    //      }
    //  })
    // },[ ]);

    const onSubmitHandler = e => {
        e.preventDefault()
        updateSetting('identity', state)
    };
    const onChangeHandler = e => {
        const finalValue = e.target.value ==='true'?true:
            e.target.value ==='false'?false:e.target.value
        setState({
            ...state,
            [e.target.name]:finalValue
        })
    }
    const deleteItem = (e) => {
        setState({
            ...state,
            keywords: state.keywords.filter(i=> {return i!== e.currentTarget.name}),
        })
    };
    const addKeyword = () => {
        if (keywordsInput.current.value.includes(',')) {
            let newItems = keywordsInput.current.value.split(',');
            setState(state => ({
                ...state,
                keywords: [ ...state.keywords, ...newItems ]
            }))
        } else {
            setState({
                ...state,
                keywords:  [...state.keywords,keywordsInput.current.value]
            })
        }
        keywordsInput.current.value = ''
    };

    const keywords = state.keywords.map(item => {
        return (
            <div key={ item }  className='item'>
                <p>{ item }</p>
                <button name={ item } onClick={ (e) => deleteItem(e) } ><FA className='fontawesomeMedium' name='times'/></button>
            </div>
        )
    });

    return (
        <AdminLayout>
            <form id='site-settings-form' onSubmit={ e => onSubmitHandler(e) }>
                <div className="forms">
                    <div className="site-settings-form-section">
                        <p>Site Address (URL):</p>
                        <input name='siteAddress' value={state.siteAddress} onChange={e=>onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Protocol:</p>
                        <select name='protocol' value={state.protocol} onChange={e=>onChangeHandler(e)}>
                            <option>Http</option>
                            <option>Https</option>
                        </select>
                    </div>

                    <div className="site-settings-form-section">
                        <p>Logo Text:</p>
                        <input name='logoText' value={state.logoText} onChange={e=>onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Head Line:</p>
                        <input name='headLine' value={state.headLine} onChange={e=>onChangeHandler(e)}/>
                    </div>

                    <div className="site-settings-form-section">
                        <p>Site Title:</p>
                        <input name='title' value={state.title} onChange={e=>onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Description:</p>
                        <textarea name='description' value={state.description} onChange={e=>onChangeHandler(e)} />
                    </div>
                    <div className="site-settings-form-section">
                        <p>Home Page H1:</p>
                        <textarea name='homePageH1' value={state.homePageH1} onChange={e=>onChangeHandler(e)} />
                    </div>
                    <div className="site-settings-form-section keywords">
                        <p>Keywords:</p>
                        <input ref={keywordsInput} name='keywords'  />
                        <button type='button' onClick={()=>addKeyword()}>add</button>
                        <span>Separate tags with commas</span>

                        <div className="items">
                            {keywords}
                        </div>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Theme Color:</p>
                        <input name='themeColor' value={state.themeColor}  onChange={e=>onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Posts Per Page:</p>
                        <input type='number' name='postsCountPerPage' value={state.postsCountPerPage}  onChange={e=>onChangeHandler(e)}/>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Home Page Pagination:</p>
                        <select name='homePagePagination' value={state.homePagePagination} onChange={e=>onChangeHandler(e)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Home Page Sidebar:</p>
                        <select name='homePageSidebar' value={state.homePageSidebar||false} onChange={e=>onChangeHandler(e)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Categories Pages Sidebar:</p>
                        <select name='categoriesPageSidebar' value={state.categoriesPageSidebar} onChange={e=>onChangeHandler(e)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Tags Pages Sidebar:</p>
                        <select name='tagsPageSidebar' value={state.tagsPageSidebar} onChange={e=>onChangeHandler(e)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Actors Pages Sidebar:</p>
                        <select name='actorsPageSidebar' value={state.actorsPageSidebar} onChange={e=>onChangeHandler(e)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                    <div className="site-settings-form-section">
                        <p>Post Page Sidebar:</p>
                        <select name='postPageSidebar' value={state.postPageSidebar} onChange={e=>onChangeHandler(e)}>
                            <option value='true' >Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                </div>

                <button className='submitBtn' type='submit'>save settings</button>
            </form>
        </AdminLayout>
    );
};

settings.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let identity;
    const identityData = await getSetting('identity');
    identity = identityData.data.setting ? identityData.data.setting.data : {}

    return { name: 'test',identity }
}
export default settings;