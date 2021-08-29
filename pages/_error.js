import React from 'react';
import Link from "next/link";
import styled from "styled-components";

const ErrorStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: var(--background-color);

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
                {responseCode ? `error ${responseCode} occurred on server`: 'An error occurred on client'}
                {statusCode ? `error ${statusCode} occurred on server`: 'An error occurred on client'}
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

export default Error


