import React, { useEffect, useState, useContext,useRef } from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import { updateSetting,getSetting } from "../../../../_variables/ajaxVariables";
import FA from "react-fontawesome";

const settings = props => {
    const keywordsInput = useRef(null)
    const [ state, setState ] = useState({
        siteAddress:'',
        protocol:'',
        title: '',
        themeColor: '',
        description: '',
        keywords: [],
        logoText:'',
        headLine:'',
        homePageH1:'',
        homePagePagination:false,
        postsCountPerPage:30

    });
    useEffect(() => {

        console.log(state)
    }, [state]);


    useEffect(()=>{
     getSetting('identity').then(res=>{
         if (res.data.setting){
             setState({
                 ...state,
                 ...res.data.setting.data
             })
         }else {
             setState({
                 ...state,
                 title: 'website title',
                 themeColor: '#000',
                 description: 'website description',
                 Keywords: ['keywords']
             })
         }
     })
    },[ ]);

    const onSubmitHandler = e => {
        e.preventDefault()
        updateSetting('identity', state)
    };
    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]:e.target.value
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
                <div className="site-settings-form-section">
                    <p>Site Address (URL)</p>
                    <input name='siteAddress' value={state.siteAddress} onChange={e=>onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Protocol</p>
                    <select name='protocol' value={state.protocol} onChange={e=>onChangeHandler(e)}>
                        <option>Http</option>
                        <option>Https</option>
                    </select>
                </div>

                <div className="site-settings-form-section">
                    <p>Logo Text</p>
                    <input name='logoText' value={state.logoText} onChange={e=>onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Head Line</p>
                    <input name='headLine' value={state.headLine} onChange={e=>onChangeHandler(e)}/>
                </div>

                <div className="site-settings-form-section">
                    <p>Site Title</p>
                    <input name='title' value={state.title} onChange={e=>onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Description</p>
                    <textarea name='description' value={state.description} onChange={e=>onChangeHandler(e)} />
                </div>
                <div className="site-settings-form-section">
                    <p>Home Page H1</p>
                    <textarea name='homePageH1' value={state.homePageH1} onChange={e=>onChangeHandler(e)} />
                </div>
                <div className="site-settings-form-section keywords">
                    <p>Keywords</p>
                    <input ref={keywordsInput} name='keywords'  />
                    <button type='button' onClick={()=>addKeyword()}>add</button>
                    <span>Separate tags with commas</span>

                    <div className="items">
                        {keywords}
                    </div>
                </div>
                <div className="site-settings-form-section">
                    <p>Theme Color</p>
                    <input name='themeColor' value={state.themeColor}  onChange={e=>onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Posts Per Page</p>
                    <input type='number' name='postsCountPerPage' value={state.postsCountPerPage}  onChange={e=>onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Home Page Pagination</p>
                   <select name='homePagePagination' value={state.homePagePagination} onChange={e=>onChangeHandler(e)}>
                       <option value={true}>Yes</option>
                       <option value={false}>No</option>
                   </select>
                </div>
                <button className='submitBtn' type='submit'>save settings</button>
            </form>
        </AdminLayout>
    );
};

settings.getInitialProps = async ({ pathname, query, req, res, err }) => {
    return { name: 'test' }
}
export default settings;