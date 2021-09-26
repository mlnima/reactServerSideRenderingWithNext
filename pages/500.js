import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import {getFirstLoadDataStatic} from "../_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Custom500StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: var(--background-color,#000);
  grid-area: main;
  h1 {
    color: var(--main-text-color);
  }

  .back-to-homepage {
    color: var(--main-text-color);
    text-decoration: none;
  }
`
const Custom500 = () => {
    return (
        <Custom500StyledDiv id='not-found-page' className='main'>
            <h1>500 - Server Error</h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>Go To Homepage</h2>
                </a>
            </Link>
        </Custom500StyledDiv>
    );
};
export const getStaticProps  = async (context) => {
    const firstLoadData = await getFirstLoadDataStatic(['500'])

    return {
        props: {
            ...(await serverSideTranslations(context.locale || 'en', ['common'])),
            ...firstLoadData
        }
    }
}
export default withTranslation(['common'])(Custom500);
