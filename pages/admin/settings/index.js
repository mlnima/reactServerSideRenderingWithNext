import React, { useEffect, useState, useContext,useRef } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import { updateSetting,getSetting } from "../../../_variables/ajaxVariables";
import FA from "react-fontawesome";

const settings = props => {
    const keywordsInput = useRef(null)
    const [ state, setState ] = useState({
        title: '',
        themeColor: '',
        description: '',
        keywords: []

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

    const onNewKeywordHandler = ()=>{

    }

    return (
        <AdminLayout>
            <form id='site-settings-form' onSubmit={ e => onSubmitHandler(e) }>
                <div className="site-settings-form-section">
                    <p>Title</p>
                    <input name='title' value={state.title} onChange={e=>onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Theme Color</p>
                    <input name='themeColor' value={state.themeColor}  onChange={e=>onChangeHandler(e)}/>
                </div>

                <div className="site-settings-form-section">
                    <p>Description</p>
                    <textArea name='description' value={state.description} onChange={e=>onChangeHandler(e)}/>
                </div>
                <div className="site-settings-form-section">
                    <p>Keywords</p>
                    <input ref={keywordsInput} name='keywords'  />
                    <span>Separate tags with commas</span>
                    <button type='button' onClick={()=>addKeyword()}>add</button>
                    <div className="items">
                        {keywords}
                    </div>
                </div>
                <button type='submit'>save settings</button>
            </form>
        </AdminLayout>
    );
};

settings.getInitialProps = async ({ pathname, query, req, res, err }) => {
    return { name: 'test' }
}
export default settings;