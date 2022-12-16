import styled from "styled-components";
import Link from "next/link";
import {FC} from "react";

const CardTitleStyle = styled.header`
  margin-top: 4px;
  padding: 0 4px;
  box-sizing: border-box;
  height: 2.2em;

  a{
    color: var(--secondary-text-color, #ccc);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 1.1;
  }

  @media only screen and (min-width: 768px) {
    padding: 0 ;
    .card-header {
      padding: 0;
    }
  }
`

interface CardTitlePropTypes {
    title: string,
    url:string,
    targetLink?:string
}

const CardTitle: FC<CardTitlePropTypes> = ({title,url,targetLink}) => {

    return (
        <CardTitleStyle className={'title'}>
            <Link href={url} title={title} target={targetLink|| '_self'}>
                {title}
            </Link>
        </CardTitleStyle>
    );
};
export default CardTitle;
