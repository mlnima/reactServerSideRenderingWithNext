import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";

const Custom500StyledDiv = styled.div`
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

const Custom500 = () => {
    const {t} = useTranslation(['common', 'customTranslation']);
    return (
        <Custom500StyledDiv id='not-found-page' className='main'>
            <h1>500 - {t<string>(`Server Error`)}</h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>{t<string>(`Go To Homepage`)}</h2>
                </a>
            </Link>
        </Custom500StyledDiv>
    );
};
//
export const getStaticProps = wrapper.getServerSideProps(store =>
    async (context) => {
        return {
            props: {
                ...(await serverSideTranslations(
                    context.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCAL as string,
                    ['common', 'customTranslation']
                )),
            }
        }
    })

export default Custom500;

