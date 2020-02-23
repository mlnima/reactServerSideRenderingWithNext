import React, { useEffect, useState, useContext } from 'react';

const Iframe = props => {
    if (props.iframeCode) {
        return (

            <div className='video-player'>
                <meta itemProp="name" content={ props.meta.title }/>
                <meta itemProp="description" content={ props.meta.description }/>
                <meta itemProp="duration" content={props.meta.duration}/>
                <meta itemProp="thumbnailUrl" content={props.meta.thumbnailUrl}/>
                <meta itemProp="embedURL" content={props.meta.embedURL}/>
                <meta itemProp="uploadDate" content={props.meta.uploadDate}/>
                <div className="responsive-player">
                    <iframe src={ props.iframeCode } frameBorder="0" width='640' height='360' scrolling="no"/>
                </div>

            </div>

        );
    } else return null

};
export default Iframe;