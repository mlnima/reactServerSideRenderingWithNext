import styled from "styled-components";
import Link from "next/link";
import {FC} from "react";
import {capitalizeFirstLetter} from "custom-util";

const CardTitleStyle = styled.h3`
  margin: 4px;
  padding: 4px 0;
  box-sizing: border-box;


  a {
    color: var(--secondary-text-color, #ccc);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: normal;
  }

  @media only screen and (min-width: 768px) {
    padding: 0 ;
    line-height: 1;
  }
`

interface CardTitlePropTypes {
    title: string | undefined,
    url: string | undefined,
    targetLink?: string
}

const CardTitle: FC<CardTitlePropTypes> = ({title, url, targetLink}) => {

    return (
        <CardTitleStyle className={'title'}>
            <Link href={url || '#'} title={title} target={targetLink || '_self'}>
                { capitalizeFirstLetter(title)   }
            </Link>
        </CardTitleStyle>
    );
};
export default CardTitle;
