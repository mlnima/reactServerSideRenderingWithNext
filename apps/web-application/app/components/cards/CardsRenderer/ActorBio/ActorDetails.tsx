import React, {useEffect, useState, useContext, useRef} from 'react';
import styled from "styled-components";

const ActorDetailsStyledDiv = styled.div`
  width: 98%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1%;

  .actor-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 5px 0;

    .actor-detail-name {
      margin: 0 5px;
      width: 90%;
    }
  ;

    .actor-detail-value {
      color: var(--primary-active-color);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: .5s;
      width: 90%;

      &:hover {
        white-space: pre-wrap;
      }
    ;
    }
  ;
  }
;
  @media only screen and (min-width: 768px) {
    .actor-detail {
      grid-template-columns: 1fr 1fr;
    }

  ;
  };
`

interface ActorDetailsPropTypes {
    additionalInfo: {
        name: string,
        value: string
    }[]
}

const ActorDetails = (props: ActorDetailsPropTypes) => {

    const renderDetails = props.additionalInfo.filter((detail) => !detail?.name?.includes('Views'))
        .map((detail,index) => {

            const convertNumberDate = (numberDate) => {
                if (numberDate?.length === 8) {
                    return `${numberDate.slice(0, 4)}/${numberDate.slice(4, 6)}/${numberDate.slice(6, 8)}`
                }
                return numberDate
            }

            const value = detail?.name === 'Born' ? convertNumberDate(detail?.value) :
                detail?.value


            return (
                <div className={'actor-detail'} key={index}>
                    <span className={'actor-detail-name'}>
                        {detail?.name.trim() + ':'}
                    </span>
                    {!!value && value?.includes('http') ?
                        <a href={value} className={'actor-detail-value'} target={'_blank'} title={detail?.name}>
                            External Link
                        </a> :
                        <span className={'actor-detail-value'}>{value}</span>
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
