import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import {getFirstLoadDataStatic} from "../_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../store/store";

const Custom404StyledDiv = styled.div`
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
const Custom404 = (props: ClientPagesTypes) => {

    return (
        <Custom404StyledDiv id='not-found-page main' className='main'>
            <h1>404 - {props.t(`Not Found`)}</h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>{props.t(`Go To Homepage`)}</h2>
                </a>
            </Link>
        </Custom404StyledDiv>
    );
};

export const getStaticProps = wrapper.getServerSideProps(store=>
    async (context) => {
        const firstLoadData = await getFirstLoadDataStatic(['404'],store)

        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common'])),
                ...firstLoadData
            }
        }
    }
)


export default withTranslation(['common','customTranslation'])(Custom404);
