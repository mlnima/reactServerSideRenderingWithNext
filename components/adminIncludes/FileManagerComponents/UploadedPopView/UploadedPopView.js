import React, { useEffect, useState, useContext, useRef } from 'react';
import './UploadedPopView.scss'
import { fileTypeDetector } from '../../../../_variables/_variables'

const UploadedPopView = props => {
    const [ state, setState ] = useState({
        darkStyle:{
            backgroundColor:'black'
        },
        lightStyle:{
            backgroundColor:'white'
        },

    });
    useEffect(() => {
    }, []);

    const onCloseHandler = () => {
        // props.setStateHandler('path', itemPath)
        //props.setStateHandler('clickedItem','')
        props.setState({
            ...props.state,
            clickedItem:'',
            path:props.state.prevPath
        })
    }


    const WhatToRender = data =>{
        switch (data.fileType ) {
            case 'image':
               return (
                      <>
                         <img className='uploaded-pop-view-image' src={ window.location.origin + '/' + props.state.clickedItem.replace('./','')}/>
                         <input className='uploaded-pop-view-url' value={'/' + props.state.clickedItem.replace('./','')}/>
                         <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./','')}/>

                       </>
               )
                break
            case 'video':
               return (
                      <>
                          <video className='uploaded-pop-view-image' controls>
                              <source src={ window.location.origin + '/' + props.state.clickedItem.replace('./','')}/>
                          </video>
                         <input className='uploaded-pop-view-url' value={'/' + props.state.clickedItem.replace('./','')}/>
                         <input className='uploaded-pop-view-url' value={ window.location.origin + '/' + props.state.clickedItem.replace('./','')}/>
                       </>
               )
                break
            default:
                return null
        }
    }



    if (props.clickedItem) {
        const fileType = fileTypeDetector(props.state.clickedItemName)

        return (
            <div className='uploaded-pop-view'>
                <button className='closeBtn' onClick={()=>onCloseHandler()}>X</button>
                <div className='gallery-pop-view-content'  style={state.lightStyle} >
                    <WhatToRender fileType={fileType}/>
                </div>
            </div>
        );

    } else return null

};
export default UploadedPopView;
