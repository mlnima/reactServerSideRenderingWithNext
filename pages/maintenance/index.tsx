import React from 'react';
import styled from "styled-components";
import {getFirstLoadDataStatic} from "../../_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "../../store/store";

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

export const getStaticProps = wrapper.getServerSideProps(store=>
    async (context) => {
    const firstLoadData = await getFirstLoadDataStatic(['maintenance'],store)
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData
        }
    }
})
export default maintenance;
