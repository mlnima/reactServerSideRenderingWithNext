import React from 'react';
import styled from "styled-components";


const LearnTypeCardTitleStyledH3 = styled.h3`

  //white-space: nowrap;
  //text-overflow: ellipsis;
  //overflow: hidden;
  color: var(--post-element-text-color, #ccc);
  margin: 2px 0;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  &:hover{
    display: inline-block;
    white-space: normal;
    color: var(--main-active-color,#fff);
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