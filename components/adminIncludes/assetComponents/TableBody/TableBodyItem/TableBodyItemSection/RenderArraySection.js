import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link'

const RenderArraySection = props => {

    const renderArrItem = (props.data||[]).map(item => {
        return (
            <Link key={_.uniqueId('id_')} href="/" >
                <a className='asset-page-item-array-section-item'>{ item.name }</a>
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
