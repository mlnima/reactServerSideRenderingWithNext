import React, {useContext} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import {AppContext} from "../../../../context/AppContext";

const StyleSection = props => {
    const contextData = useContext(AppContext);
    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='style-section'>
            <h1>{props.title}</h1>
            <textarea name={props.name} value={contextData.siteDesign[props.name] || ''} className='style-section-editor' onChange={e=>onChangeHandler(e)}/>
            <SaveDesignChangesBtn/>
        </div>
    );
};
export default StyleSection;
