import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
// import {getFirstLoadDataStatic} from "../_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "../store/store";

const Custom500StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: var(--main-background-color,#000);
  grid-area: main;
  
  h1 {
    color: var(--main-text-color);
  }

  .back-to-homepage {
    color: var(--main-text-color);
    text-decoration: none;
  }
`

const Custom500 = (props:any) => {
    return (
        <Custom500StyledDiv id='not-found-page' className='main'>
            <h1>500 - {props.t(`Server Error`)}</h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>{props.t(`Go To Homepage`)}</h2>
                </a>
            </Link>
        </Custom500StyledDiv>
    );
};
//
export const getStaticProps = wrapper.getServerSideProps(store=>
    async (context) => {
    // const firstLoadData = await getFirstLoadDataStatic(['500'],store)

    return {
        props: {
            ...(await serverSideTranslations(context.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCAL as string, ['common','customTranslation'])),
            // ...firstLoadData
        }
    }
})

export default withTranslation(['common','customTranslation'])(Custom500);
// export default Custom500;
