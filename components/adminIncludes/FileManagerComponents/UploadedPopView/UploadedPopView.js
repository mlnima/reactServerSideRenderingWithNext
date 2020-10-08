import React, { useEffect, useState, useContext, useRef } from 'react';
import { fileTypeDetector } from '../../../../_variables/_variables';
import { readFile } from '../../../../_variables/_ajaxFilesVariables'

const UploadedPopView = props => {
    const [ state, setState ] = useState({
        darkStyle: {
            backgroundColor: 'black'
        },
        lightStyle: {
            backgroundColor: 'white'
        },
        fileData: ''
    });
    useEffect(() => {
    }, []);

    const onCloseHandler = () => {
        // props.setStateHandler('path', itemPath)
        //props.setStateHandler('clickedItem','')
        props.setState({
            ...props.state,
            clickedItem: '',
            path: props.state.prevPath
        })
    }

    const WhatToRender = data => {
        switch ( data.fileType ) {
            case 'image':
                return (
                    <>
                        <img className='uploaded-pop-view-image' src={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </>
                )
                break
            case 'video':
                return (
                    <>
                        <video className='uploaded-pop-view-image' controls>
                            <source src={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                        </video>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </>
                )
            case 'document':
                return (
                    <>
                        <div className='uploaded-pop-view-text-content'>
                            <textarea value={ props.state.file}/>
                        </div>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </>
                )
                break
            default:
                return (
                    <>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </>
                )
        }
    }

    useEffect(() => {
        console.log(state.fileData)
    }, [ state.fileData ]);

    if (props.clickedItem) {
        const fileType = fileTypeDetector(props.state.clickedItemName)
        // if (fileType === 'document') {
        //     readFile(window.location.origin + '/' + props.state.clickedItem.replace('./', '')).then(res => {
        //         setState({
        //             ...state,
        //             fileData: res.data.data
        //         })
        //     })
        // }
        return (
            <div className='uploaded-pop-view'>
                <button className='closeBtn' onClick={ () => onCloseHandler() }>X</button>
                <div className='gallery-pop-view-content' style={ state.lightStyle }>
                    <WhatToRender fileType={ fileType }/>
                </div>
            </div>
        );

    } else return null

};
export default UploadedPopView;
