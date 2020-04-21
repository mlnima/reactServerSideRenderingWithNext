import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link'

const RenderArraySection = props => {

    const renderArrItem = (props.data||[]).map(item => {
        return (
            <Link key={item} href="/">
                <a className='asset-page-item-array-section-item'>{ item }</a>
            </Link>
        )
    })

    return (
        <div className='asset-page-item-array-section'>
            {renderArrItem}
        </div>
    );
};
export default RenderArraySection;
