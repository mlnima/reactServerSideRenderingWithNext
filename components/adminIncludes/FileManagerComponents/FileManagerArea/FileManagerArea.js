import React, { useEffect, useState, useContext, useRef } from 'react';
import { clickPathGenerator } from '../../../../_variables/_variables';
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import { fileTypeDetector } from '../../../../_variables/_variables'
import BarsSvg from '../../../../static/images/fontawesome/bars-solid.svg'
import JsLogoSvg from '../../../../static/images/fontawesome/js-square-brands.svg'
import SliderSvg from '../../../../static/images/fontawesome/sliders-h-solid.svg'
import FolderSvg from '../../../../static/images/fontawesome/folder-solid.svg'
import SassSvg from '../../../../static/images/fontawesome/sass-brands.svg'
import FileSvg from '../../../../static/images/fontawesome/file-solid.svg'
import styled from "styled-components";
let StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 10px;
  background-color: white;
  padding: 20px 20px 200px 20px;
  border-radius: 20px;

  .dirItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .file-manager-image-item {
      width: 100px;
      object-fit: cover;
    }

    button {
      width: 100px;
      height: 100px;
      background-color: gray;
      border: none;
      outline: none;
      font-size: xxx-large;
      transition: .4s;
      border-radius: 10px;

      &:hover {
        transform: scale(1.2);
      }
    }

    p {
      font-size: small;
      overflow: hidden;
    }

    .clickedItem {
      background-color: rgba(0, 100, 255, 0.8);
      color: white;
    }

    .unClickedItem {
      background-color: transparent;
    }
  }
`
const FileManagerArea = props => {
    const contextData = useContext(AppContext);

    // useEffect(() => {
    //     console.log(props)
    // }, [ props ]);

    const classGenerator = fileName => {
        let nextClass = '';
        if (props.data.clickedItem === clickPathGenerator(fileName, props.state.path)) {
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
                <img className='file-manager-image-item' src={ props.state.path.replace('.', '') + '/' + data.fileName }/>
            )
        } else if (itemType === 'video'){
            return (
                <video className='file-manager-image-item'>
                    <source src={ props.state.path.replace('.', '') + '/' + data.fileName }/>
                </video>
            )
        } else {
            return (
                <button className={ [ classGenerator(data.fileName) ] } key={ data.fileName } name={ data.fileName }  >
                    <img className='fontawesomeSvgLarge' src={ logoDetector(data.fileName) } alt=""/>
                </button>
            )
        }
    }

    const onClickHandler = item => {
        let itemPath = clickPathGenerator(item, props.state.path);
        props.setState({
            ...props.state,
            prevPath:props.state.path,
            path:itemPath,
            clickedItemName:item
        })
    };


    let renderDir = props.state.files.map(item => {
        return (
            <div key={ item } className='dirItem' onClick={()=>onClickHandler(item)}>
                <WhatToRender key={item} fileName={ item }/>
                <p> { item }</p>
            </div>
        )
    });

    return (
        <StyledDiv className='FileManagerArea'>
            { renderDir }
        </StyledDiv>
    );
};
export default withRouter(FileManagerArea);

