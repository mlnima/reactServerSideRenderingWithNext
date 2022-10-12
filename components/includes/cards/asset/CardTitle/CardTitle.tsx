import styled from "styled-components";
import {FC} from "react";

const CardTitleStyle = styled.header`
  text-align: center;
  margin-top: 2px;
  padding: 0 10px;
  box-sizing: border-box;
  .card-header {
    color: var(--post-element-text-color, #ccc);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    //transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
    box-sizing: border-box;
   
 
  }
  @media only screen and (min-width: 768px) {
    padding: 0 ;
    .card-header {
      padding: 0 ;
    }
  }
`

interface CardTitlePropTypes{
    title:string,
}

const  CardTitle :FC<CardTitlePropTypes> = ({title}) => {
    return (
        <CardTitleStyle className={'entry-header'}>
            <span className={'card-header'}>{title}</span>
        </CardTitleStyle>
    );
};
export default CardTitle;
