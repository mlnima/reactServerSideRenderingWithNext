import Link from "next/link";
import styled from "styled-components";
import useTranslation from 'next-translate/useTranslation'
import React from "react";

const Custom500StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: var(--primary-background-color,#000);
  grid-area: main;

  h1 {
    color: var(--primary-text-color,#fff);
  }

  .back-to-homepage {
    color: var(--primary-text-color,#fff);
    text-decoration: none;
  }
`

const Custom500 = () => {
    const {t} = useTranslation();
    return (
        <Custom500StyledDiv id={'not-found-page content'}>
            <div id={'primary'}>
                <h1>500 -{t(`common:Server Error`, {}, {fallback: 'Server Error'})}</h1>
                <Link href="/" className='back-to-homepage'>
                    <h2>{t(`common:Go To Homepage`, {}, {fallback: 'Go To Homepage'})}</h2>
                </Link>
            </div>
        </Custom500StyledDiv>
    );
};


export default Custom500;

