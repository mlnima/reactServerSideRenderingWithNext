import React from 'react';
import styled from "styled-components";


const LearnTypeCardTitleStyledH3 = styled.h3`
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--post-element-text-color, #ccc);
  margin: 2px 0;
 
  &:hover{
    display: inline-block;
    white-space: normal;
    color: var(--main-active-color,#fff);
  }
  @media only screen and (min-width: 768px) {

    font-size: 14px;
  }
`

interface LearnTypeCardTitlePropTypes {
    title:string,
}

const LearnTypeCardTitle = ({title}:LearnTypeCardTitlePropTypes) =>{

    return (
            <LearnTypeCardTitleStyledH3 className={'card-title'}>
                {title}
            </LearnTypeCardTitleStyledH3>
    )
}

export default LearnTypeCardTitle