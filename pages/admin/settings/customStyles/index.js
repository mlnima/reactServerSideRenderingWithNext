import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import './customStyles.scss'
import {AppContext} from "../../../../context/AppContext";

const customStyles = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        customStyles:''
    });

    useEffect(() => {
         if (contextData.siteDesign.customStyles){
             setState({
                 ...state,
                 customStyles:contextData.siteDesign.customStyles
             })
         }
    }, [contextData.siteDesign]);


    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSaveHandler = ()=>{
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        contextData.functions.updateSetting('design',{...contextData.siteDesign,customStyles:state.customStyles}).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }).catch(err => {
            console.log(err)
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    }



    return (
        <AdminLayout>
            <div className='custom-style-admin-page'>
                <textarea value={state.customStyles} name='customStyles' onChange={e=>onChangeHandler(e)}/>
                <button className='saveBtn' onClick={onSaveHandler}>Save</button>
            </div>
        </AdminLayout>
    );
};
export default customStyles;
