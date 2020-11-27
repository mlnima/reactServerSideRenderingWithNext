import React, {useEffect, useState, useContext, useRef} from 'react';
import './MetaContentForPostsPage.scss';
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


const MetaContentForPostsPage = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        titleStyle:{},
        descriptionStyle:{}
    });


    useEffect(() => {
        const titleTextAlign = props.contentData.translations ? props.contentData.translations[contextData.state.activeLanguage] ? props.contentData.translations[contextData.state.activeLanguage].name ?contextData.state.activeLanguage === 'fa' || contextData.state.activeLanguage === 'ar' ? 'right':'left':'left' : 'left' : 'left'

       //  setState({
       //     ...state,
       //     titleStyle:{
       //         textAlign:props.contentData.translations ? props.contentData.translations[contextData.state.activeLanguage] ? props.contentData.translations[contextData.state.activeLanguage].name ?contextData.state.activeLanguage === 'fa' || contextData.state.activeLanguage === 'ar' ? 'right':'left':'left' : 'left' : 'left'
       //     },
       //      descriptionStyle:{
       //          textAlign:props.contentData.translations ? props.contentData.translations[contextData.state.activeLanguage] ? props.contentData.translations[contextData.state.activeLanguage].description ?contextData.state.activeLanguage === 'fa' || contextData.state.activeLanguage === 'ar' ? 'right':'left':'left' : 'left' : 'left'
       //      }
       // })
    }, [props]);








    const ImageContentForMeta = () => {
        if (props.contentData.imageUrl) {
            return (
                <img src={props.contentData.imageUrl}/>
            )

        }  else return null
    }

    const ArrowAfterTitle = ()=>{
        // if (contextData.state.activeLanguage === 'fa' ||contextData.state.activeLanguage === 'ar'){
        //     return (
        //         <FontAwesomeIcon  className='arrow-meta-info' style={state.titleStyle} icon={faAngleLeft} />
        //     )
        // }else
            return(
            <FontAwesomeIcon  className='arrow-meta-info' style={state.titleStyle} icon={faAngleRight} />
        )
    }





    if (props.getPostsData.content !== 'all') {
        return (
            <div className='meta-content'>
                {/*<h1>{props.contentData.name}</h1>*/}
                <h1 style={state.titleStyle}>{props.contentData.translations ? props.contentData.translations[contextData.state.activeLanguage] ? props.contentData.translations[contextData.state.activeLanguage].name || props.contentData.name : props.contentData.name : props.contentData.name}</h1>
                <span style={state.titleStyle}> <ArrowAfterTitle/></span>
                <ImageContentForMeta/>
                <p style={state.descriptionStyle}>{props.contentData.translations ? props.contentData.translations[contextData.state.activeLanguage] ? props.contentData.translations[contextData.state.activeLanguage].description || props.contentData.description : props.contentData.description : props.contentData.description}</p>
            </div>
        );
    } else return null

};
export default MetaContentForPostsPage;
