import React from 'react';
import styled from "styled-components";
import {GetServerSideProps,GetStaticProps} from "next";
import {GetServerSidePropsContext} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {getFirstLoadData,getFirstLoadDataStatic} from "../../_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
let StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const maintenance = () => {

    return (
        <StyledDiv id='maintenance-page'>
            <h1> Under Maintenance</h1>
            <p>please visit our site later</p>

        </StyledDiv>
    );
};
// @ts-ignore
export const getStaticProps  = async (context) => {
    const firstLoadData = await getFirstLoadDataStatic([])
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            ...firstLoadData
        }
    }
}
export default maintenance;
