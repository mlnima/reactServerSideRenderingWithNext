import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";

const ErrorStyledDiv = styled.div`
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

const Error = ({responseCode,statusCode }) => {


    return (
        <ErrorStyledDiv className='error-page'>
            <h1 className='error-page-message'>
                {responseCode || statusCode ? `Error ${responseCode || statusCode} Occurred On Server`: 'An Error Occurred'}
            </h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>back to homepage</h2>
                </a>
            </Link>
        </ErrorStyledDiv>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default withTranslation(['common','customTranslation'])(Error)


