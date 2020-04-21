import React, { useEffect, useState, useContext, useRef } from 'react';
import RenderArraySection from './RenderArraySection'

const TableBodyItemSection = props => {

if (props.dataName ==='_id' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
} else if(props.dataName ==='postedDate' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
} else if(props.dataName ==='status' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
} else if(props.dataName ==='author' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
} else if(props.dataName ==='authorID' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
}else if(props.dataName ==='email' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
}else if(props.dataName ==='onDocument' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
}else if(props.dataName ==='body' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
}else if(props.dataName ==='title' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )
}else if(props.dataName ==='tags' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <RenderArraySection data={props.dataValue}/>
        </div>
    )
}else if(props.dataName ==='categories' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <RenderArraySection data={props.dataValue}/>
        </div>
    )
}else if(props.dataName ==='actors' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <RenderArraySection data={props.dataValue}/>
        </div>
    )
}else if(props.dataName ==='mainThumbnail' ){
    return (
        <div className='asset-page-table-body-item-section'>
            <img src={props.dataValue}/>
        </div>
    )
}else  return (
        <div className='asset-page-table-body-item-section'>
            <p>{ props.dataValue }</p>
        </div>
    )

};
export default TableBodyItemSection;
