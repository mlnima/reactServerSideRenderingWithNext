import {useEffect} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {adminDeleteForm, adminGetForm} from "@store/adminActions/adminPanelFormsActions";

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
    const dispatch = useDispatch()
    const formData = useSelector(({adminPanelForms}: StoreTypes) => adminPanelForms.form)

    useEffect(() => {
        dispatch(adminGetForm(query.formId))
    }, [pathname]);

    const onDeleteHandler = ()=>{
        dispatch(adminDeleteForm(query.formId))
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

export default formPage;
