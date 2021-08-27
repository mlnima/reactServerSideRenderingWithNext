import React, {useEffect, useState, useContext, useRef} from 'react';
import CardMetaData from "./CardMetaData";
import _ from "lodash";
import styled from "styled-components";
const CardMetaDataStyledSpan = styled.span`
  width: ${props=>props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
  max-width: ${props=>props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 2px;
  padding: 5px 0;
`
const CardMetaRenderer = ({metaPreview,postElementSize}) => {

    return (
        <CardMetaDataStyledSpan className='card-meta' postElementSize={postElementSize}>
                {(metaPreview || []).filter(meta => meta?.name?.length > 1).map(meta => {
                    return (
                        <CardMetaData meta={meta} key={_.uniqueId('meta_')}/>
                    )
                })}
            </CardMetaDataStyledSpan>
    );
};

export default CardMetaRenderer;
