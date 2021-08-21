import React, {useEffect, useState, useContext, useRef} from 'react';
import CardMetaData from "./CardMetaData";
import _ from "lodash";

const CardMetaRenderer = ({metaPreview,postElementSize}) => {

    return (
        <span className='card-meta'>
            <style jsx>{`
                .card-meta {
                  width: ${postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                  max-width: ${postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
                  box-sizing: border-box;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  margin: 0 2px;
                  padding: 5px 0;
                }
            `} </style>
                {(metaPreview || []).filter(meta => meta?.name?.length > 1).map(meta => {
                    return (
                        <CardMetaData meta={meta} key={_.uniqueId('meta_')}/>
                    )
                })}
            </span>
    );
};

export default CardMetaRenderer;
