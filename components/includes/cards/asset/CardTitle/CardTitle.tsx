import styled from "styled-components";
import {FC} from "react";

const CardTitleStyle = styled.header`
  text-align: center;
  margin-top: 2px;

  .card-header {
    color: var(--post-element-text-color, #ccc);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`

interface CardTitlePropTypes{
    title:string,
}

const CardTitle :FC<CardTitlePropTypes> = ({title}) => {
    return (
        <CardTitleStyle className={'entry-header'}>
            <span className={'card-header'}>{title}</span>
        </CardTitleStyle>
    );
};
export default CardTitle;
