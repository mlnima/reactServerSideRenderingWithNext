import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import FormToolBar from "../../../components/adminIncludes/formPageComponents/FormToolBar/FormToolBar";
import FormEditor from "../../../components/adminIncludes/formPageComponents/FormEditor/FormEdittor";
import {getAbsolutePath} from "../../../_variables/_variables";
import {getSingleFormData} from "../../../_variables/ajaxVariables";
import {getMultipleSetting} from "../../../_variables/ajaxVariables";
import dataDecoder from "../../../server/tools/dataDecoder";
import {getPost} from "../../../_variables/ajaxPostsVariables";
import './form.scss'

const formPage = props => {
    const [state, setState] = useState({
        formData:{
            data:{}
        }
    });
    const [fields, setFields] = useState({});
    useEffect(() => {
        if(props.formData.form){
            setState({
                ...state,
                formData:props.formData.form
            })
        }

        console.log(props)
    }, [props]);

    const renderData = (Object.keys(state.formData.data)||[]).map(fieldData=>{

        return(
            <div className='form-field-data'>
                <h3>{fieldData} :</h3>
                <p>{state.formData.data[fieldData]}</p>
            </div>
        )
    })

    return (
        <AdminLayout>
            <h1>{state.formData.formName}</h1>
            <span>{state.formData.date}</span>
            <div className='form-data-container'>
                {renderData}
            </div>

        </AdminLayout>
    );
};

// formPage.getInitialProps = async ({query, req}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let formData;
//     let form;
//     const requestBody = {
//         _id: query.id,
//     };
//     formData = await getSingleFormData(requestBody,domainName)
//     return {formData:formData.data ?formData.data:{},query}
// };
export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let formData;
    let form;
    const requestBody = {
        _id: query.id,
    };
    formData = await getSingleFormData(requestBody,domainName)
    return {props: {formData: formData.data ? formData.data : {}, query}}
}

export default formPage;
