import styled from "styled-components";
import {FC} from "react";

const CardTitleStyle = styled.header`
  text-align: center;
  margin-top: 2px;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  .card-header {
    color: var(--post-element-text-color, #ccc);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    //padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
    width: 100%;
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
