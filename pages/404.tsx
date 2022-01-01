import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "../store/store";

const Custom404StyledDiv = styled.div`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 50vh;
          background-color: var(--main-background-color, #000);
          grid-area: main;
        
          h1 {
            color: var(--main-text-color,#fff);
          }
        
          .back-to-homepage {
            color: var(--main-text-color,#fff);
            text-decoration: none;
          }
`

const Custom404 = (props) => {
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

export const getStaticProps = wrapper.getServerSideProps(store =>
    async (context) => {
        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common'])),
            }
        }
    }
)

export default withTranslation(['common', 'customTranslation'])(Custom404);

