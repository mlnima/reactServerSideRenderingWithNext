import React, { useEffect, useState, useContext, useRef } from 'react';
import { clickPathGenerator } from '../../../../_variables/_variables';
import './FileManagerArea.scss';
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import { fileTypeDetector } from '../../../../_variables/_variables'
import BarsSvg from '../../../../static/images/fontawesome/bars-solid.svg'
import JsLogoSvg from '../../../../static/images/fontawesome/js-square-brands.svg'
import SliderSvg from '../../../../static/images/fontawesome/sliders-h-solid.svg'
import FolderSvg from '../../../../static/images/fontawesome/folder-solid.svg'
import SassSvg from '../../../../static/images/fontawesome/sass-brands.svg'
import FileSvg from '../../../../static/images/fontawesome/file-solid.svg'

const FileManagerArea = props => {
    const contextData = useContext(AppContext);

    // useEffect(() => {
    //     console.log(props)
    // }, [ props ]);

    const classGenerator = fileName => {
        let nextClass = '';
        if (props.data.clickedItem === clickPathGenerator(fileName, props.data.path)) {
            nextClass = ' clickedItem'
        } else {
            nextClass = ' unClickedItem'
        }
    };

    const logoDetector = fileName => {
        if (fileName.includes('.js')) {
            return JsLogoSvg
        } else if (fileName.includes('.env')) {
            return SliderSvg
        } else if (!fileName.includes('.')) {
            return FolderSvg
        } else if (fileName.includes('.scss')) {
            return SassSvg
        } else return FileSvg
    }

    const WhatToRender = data => {
        const itemType = fileTypeDetector(data.fileName)
        if (itemType === 'image') {
            return (
                <img className='file-manager-image-item' src={ props.data.path.replace('.', '') + '/' + data.fileName }/>
            )
        } else if (itemType === 'video'){
            return (
                <video className='file-manager-image-item'>
                    <source src={ props.data.path.replace('.', '') + '/' + data.fileName }/>
                </video>
            )
        } else {
            return (
                <button className={ [ classGenerator(data.fileName) ] } key={ data.fileName } name={ data.fileName } onClick={ (e) => onClickHandler(e) }>
                    <img className='fontawesomeSvgLarge' src={ logoDetector(data.fileName) } alt=""/>
                </button>
            )
        }
    }




    const onClickHandler = e => {
        let clickedItem = props.data.clickedItem;
        let filePath = clickPathGenerator(e.currentTarget.name, props.data.path);
        if (props.data.clickedItem === filePath) {
            props.setStateHandler('clickedItem', '')
        } else {
            props.setStateHandler('clickedItem', filePath)
            props.setStateHandler('path', filePath)
        }
    };

    let renderDir = props.data.files.map(item => {
        // fileTypeDetector(item)
        return (
            <div key={ item } className='dirItem'>
                <WhatToRender key={item} fileName={ item }/>
                <p> { item }</p>
            </div>
        )
    });

    return (
        <div className='FileManagerArea'>
            { renderDir }
        </div>
    );
};
export default withRouter(FileManagerArea);

// <buttonref={() => selectedItem.current[props.data.files.indexOf(item)]}
// className={[fileLogoDetector(item)]} key={item} name={item} onClick={(e) => onClickHandler(e)}
// onDoubleClick={(e) => onDoubleClickHandler(e)} onContextMenu={(e) => onContextMenuHandler(e)}/>