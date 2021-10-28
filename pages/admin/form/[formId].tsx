import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFormData} from "../../../_variables/ajaxVariables";
import {useRouter} from "next/router";

import styled from "styled-components";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

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
    const router = useRouter()
    const [state, setState] = useState({
        formData: {
            data: {}
        }
    });


    useEffect(() => {
        const requestBody = {
            _id: router.query.formId,
        };
        getFormData(requestBody).then(res => {
            // @ts-ignore
            if (res?.data?.form) {
                setState({
                    ...state,
                    // @ts-ignore
                    formData: res?.data?.form
                })
            }
        })


    }, [router.pathname]);

    const renderData = (Object.keys(state.formData.data) || []).map(fieldData => {


        return (
            <div className='form-field-data'>
                <h3>{fieldData} :</h3>

                    {/*// @ts-ignore*/}
                <p>{state.formData.data[fieldData]}</p>
            </div>
        )
    })

    return (
        <StyledDiv>
            {/*// @ts-ignore*/}
            <h1>{state.formData.formName}</h1>
            {/*// @ts-ignore*/}
            <span>{state.formData.date}</span>
            <div className='form-data-container'>
                {renderData}
            </div>

        </StyledDiv>
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
// export const getServerSideProps = async ({req,query}) => {
//     // const domainName = req ? await getAbsolutePath(req) : '';
//     // // let formData;
//     // // let form;
//     // // const requestBody = {
//     // //     _id: query.id,
//     // // };
//     // // formData = await getSingleFormData(requestBody,domainName)
//     return {props: {formData: formData.data ? formData.data : {}, query}}
// }


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})


export default formPage;
