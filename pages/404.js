import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";

const Custom404StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: var(--background-color);
  grid-area: main;

  h1 {
    color: var(--main-text-color);
  }

  .back-to-homepage {
    color: var(--main-text-color);
    text-decoration: none;
  }
`
const Custom404 = props => {

    return (
        <Custom404StyledDiv id='not-found-page'>
            <h1>404 - {props.t(`Not Found`)}</h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>{props.t(`Go To Homepage`)}</h2>
                </a>
            </Link>
        </Custom404StyledDiv>
    );
};

export default withTranslation(['common'])(Custom404);
