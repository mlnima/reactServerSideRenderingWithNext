import React, {FC} from "react";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import styled from "styled-components";

const Soft404StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: var(--main-background-color, #000);
  grid-area: main;

  h1 {
    color: var(--main-text-color, #fff);
  }

  .back-to-homepage {
    color: var(--main-active-color, #f90);
    text-decoration: none;
  }
`

interface Soft404PropTypes {

}

const Soft404: FC<Soft404PropTypes> = (props) => {
    const {t} = useTranslation(['common', 'customTranslation']);

    return (
        <Soft404StyledDiv>
            <h1>{t<string>(`Not Found`)}</h1>
            <Link href="/">
                <a className='back-to-homepage'>
                    <h2>{t<string>(`Go To Homepage`)}</h2>
                </a>
            </Link>
        </Soft404StyledDiv>
    )
};

export default Soft404
