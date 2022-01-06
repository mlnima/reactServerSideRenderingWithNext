import React, {useEffect, useState, useContext, useRef} from 'react';
import styled from "styled-components";
const ActorDetailsStyledDiv = styled.div`
  width: 98%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  padding: 1%;
  
  .actor-detail{
    display: grid;
    grid-template-columns: 1fr 1fr ;
    margin: 5px 0;
    .actor-detail-name{
      margin: 0 5px;
      width: 90%;
    };
    .actor-detail-value{
      color: var(--main-active-color);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: .5s;
      width: 90%;
      &:hover{
        white-space: pre-wrap;
      };
    };
  };
  @media only screen and (min-width: 768px){
    .actor-detail{
      grid-template-columns: 1fr 1fr ;
    };
  };
`
interface ActorDetailsPropTypes{
    additionalInfo:{
        name:string,
        value:string
    }[]
}
const ActorDetails = (props:ActorDetailsPropTypes) => {

    const renderDetails = props.additionalInfo.map(detail=>{
        return(
            <div className={'actor-detail'}>
                <span className={'actor-detail-name'}>
                    {detail?.name.trim() + ':'}
                </span>
                {detail?.value?.includes('http') ?
                    <a href={detail?.value}  className={'actor-detail-value'} target={'_blank'} title={detail?.name}>External Link </a>:
                    <span className={'actor-detail-value'}>{detail?.value}</span>
                }
            </div>
        )
    })

    return (
        <ActorDetailsStyledDiv className={'actor-data-details'}>
            {renderDetails}
        </ActorDetailsStyledDiv>
    );
};
export default ActorDetails;
