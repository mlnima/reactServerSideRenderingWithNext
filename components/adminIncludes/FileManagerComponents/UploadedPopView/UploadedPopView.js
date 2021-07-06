import React, { useEffect, useState, useContext, useRef } from 'react';
import { fileTypeDetector } from '../../../../_variables/_variables';
import { readFile,deleteFile } from '../../../../_variables/_ajaxFilesVariables'
import styled from "styled-components";
// let StyledDiv = styled.div`
//   //position: fixed;
//   //top: 0;
//   //left: 0;
//   //right: 0;
//   //bottom: 0;
//   //background-color: rgba(0,0,0,.5);
//   //display: flex;
//   //justify-content: center;
//   //align-items: center;
//   //z-index: 15;
//   //.closeBtn{
//   //  position: fixed;
//   //  top:5%;
//   //  right: 5%;
//   //  color: white;
//   //  background-color: transparent;
//   //  border: none;
//   //  font-weight: bold;
//   //  font-size: xx-large;
//   //}
//   .gallery-pop-view-content{
//     //background-color: #9fa3a8;
//     //display: flex;
//     //flex-direction: column;
//     //align-items: center;
//     //justify-content: center;
//     //border-radius: 10px;
//     .uploaded-pop-view-image{
//       width:90%;
//       max-width: 600px;
//       padding: 5px;
//     }
//     .uploaded-pop-view-text-content{
//       textarea{
//         min-width: 300px;
//         min-height: 200px;
//       }
//     }
//     //.uploaded-pop-view-url{
//     //  margin: 10px 0;
//     //  width: 90%;
//     //}
//   }
//
// `
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

    const onDeleteHandler = filePath=>{
        deleteFile(filePath)
        props.setState({
            ...props.state,
            clickedItem: '',
            path: props.state.prevPath,
            lastUpdate:Date.now()
        })
    }

    const WhatToRender = data => {
        switch ( data.fileType ) {
            case 'image':
                return (
                    <React.Fragment>
                        <style jsx>{`
                        .uploaded-pop-view-url{
                            margin: 10px 0;
                            width: 90%;
                        }
                        .uploaded-pop-view-image{
                          width:90%;
                           max-width: 450px;
                          padding: 5px;
                        } 
                   `}</style>
                        <img className='uploaded-pop-view-image' src={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </React.Fragment>
                )
                break
            case 'video':
                return (
                    <React.Fragment>
                        <style jsx>{`
                        .uploaded-pop-view-url{
                            margin: 10px 0;
                            width: 90%;
                        }
                        .uploaded-pop-view-image{
                          width:90%;
                          max-width: 450px;
                          padding: 5px;
                        } 
                   `}</style>
                        <video className='uploaded-pop-view-image' controls>
                            <source src={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                        </video>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </React.Fragment>
                )
            case 'document':
                return (
                    <React.Fragment>
                    <style jsx>{`
                        .uploaded-pop-view-url{
                            margin: 10px 0;
                            width: 90%;
                        }
                        .uploaded-pop-view-text-content>textarea{
                        width: 100%;
                    min-width : 70vw;
                    min-height : 70vh;
                        }
                    `}</style>
                        <div className='uploaded-pop-view-text-content'>
                            <textarea value={ props.state.file}/>
                        </div>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </React.Fragment>
                )
                break
            default:
                return (
                    <React.Fragment>
                        <style jsx>{`
    .uploaded-pop-view-url{
      margin: 10px 0;
      width: 90%;
    }
`}</style>
                        <input className='uploaded-pop-view-url' value={ '/' + props.state.clickedItem.replace('./', '') }/>
                        <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./', '') }/>
                    </React.Fragment>
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
            <style jsx>{`
                .uploaded-pop-view{
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0,0,0,.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 15;
                }
                .closeBtn{
                    position: fixed;
                    top:5%;
                    right: 5%;
                    color: white;
                    background-color: transparent;
                    border: none;
                    font-weight: bold;
                    font-size: xx-large;
                }
                .gallery-pop-view-content{
                    background-color: #9fa3a8;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    min-width : 80vw;
                    min-height : 80vh;
                }
            
            `}</style>
                <button className='closeBtn' onClick={ () => onCloseHandler() }>X</button>
                <div className='gallery-pop-view-content' style={ state.lightStyle }>
                    <WhatToRender fileType={ fileType }/>
                    <button onClick={()=>onDeleteHandler(props.state.clickedItem)}>Delete</button>
                </div>
            </div>
        );

    } else return null

};
export default UploadedPopView;
