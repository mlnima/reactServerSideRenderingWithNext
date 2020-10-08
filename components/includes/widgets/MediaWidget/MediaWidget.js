import React, {useEffect, useState, useContext, useRef} from 'react';
import {Document, Page, pdfjs} from "react-pdf";
// import {pdfjs} from "react-pdf";
// import { Text, View, StyleSheet } from '@react-pdf/renderer';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import * as ReactPdfRenderer from '@react-pdf/renderer';
import MediaDocumentWidget from './MediaDocumentWidget/MediaDocumentWidget'
import './MediaWidget.scss';


const MediaWidget = props => {
    const pdfViewer = useRef(null)

    const [state, setState] = useState({
        extraClassName: '',

    });

    // const [docData,setDocData]=useState({
    //     maxPage:null
    // })

    useEffect(() => {
        props.mediaType === 'iframe' ?
            setState({
                ...state,
                extraClassName: 'media-widget-video-iframe'
            })
            :
            setState({
                ...state,
                extraClassName: ''
            })
    }, []);


    useEffect(() => {
        if (props.mediaType === 'document'){
            console.log(ReactPdfRenderer)
        }

    }, []);





    // const styles = StyleSheet.create({
    //     page: {
    //         flexDirection: 'row',
    //         backgroundColor: '#E4E4E4'
    //     },
    //     section: {
    //         margin: 10,
    //         padding: 10,
    //         flexGrow: 1
    //     }
    // });

    const WhatToRender = () => {

        if (props.mediaUrl && props.mediaType) {
            switch (props.mediaType) {
                case 'image':
                    return (
                        <img className='media-element' src={props.mediaUrl} alt={props.title || props.type}/>
                    )
                case 'video':
                    return (
                        <>
                            <video className='media-element' src={props.mediaUrl} controls/>
                        </>
                    )
                case 'document':


                    return (


                            <MediaDocumentWidget {...props}/>

                    )
                case 'iframe':
                    return (
                        <>
                            <iframe className='media-element' src={props.mediaUrl}/>
                        </>
                    )
                case 'audio':
                    return (
                        <>
                            <audio className='media-element' controls src={props.mediaUrl}/>
                        </>
                    )
                default :
                    return null

            }
        } else return null


    }

    return (
        <div className={'media-widget ' + state.extraClassName}>

            <WhatToRender/>
        </div>
    );
};
export default MediaWidget;
