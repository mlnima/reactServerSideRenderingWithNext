import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import {fetchAdminDeleteForm, fetchAdminForm} from "@store_toolkit/adminReducers/adminPanelFormsReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

let StyledDiv = styled.div`
  .form-data-container {
    border-radius: 5px;
    padding: 5px;
    background-color: #333;
    margin: 30px 0;

    .form-field-data {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: white;
      padding: 5px;

      h3 {
        margin-right: 20px;
      }
    }
  }
`

const formPage = () => {
    const {pathname, query,push} = useRouter()
    const dispatch = useAppDispatch()
    const formData = useSelector(({adminPanelForms}: StoreTypes) => adminPanelForms.form)

    useEffect(() => {
        dispatch(fetchAdminForm(query.formId as string))
    }, [pathname]);

    const onDeleteHandler = ()=>{
        dispatch(fetchAdminDeleteForm(query.formId  as string))
        push('/admin/assets?assetsType=forms').finally()
    }

    return (
        <StyledDiv>
            <h1>{formData?.formName}</h1>
            <span>{formData?.date}</span>
            <div className='form-data-container'>
                {(formData?.data ? Object.keys(formData?.data) : []).map(fieldData => {
                    return (
                        <div className='form-field-data'>
                            <h3>{fieldData} :</h3>
                            <p>{formData?.data?.[fieldData]}</p>
                        </div>
                    )
                })}
            </div>
            <button onClick={onDeleteHandler}>Delete</button>
        </StyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

formPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default formPage;
