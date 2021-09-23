import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";

const Custom500StyledDiv = styled.div`
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
const Custom500 = () => {

    return (
        <Custom500StyledDiv id='not-found-page'>
            <h1>500 - Server Error</h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>Go To Homepage</h2>
                </a>
            </Link>
        </Custom500StyledDiv>
    );
};

export default withTranslation(['common','customTranslation'])(Custom500);