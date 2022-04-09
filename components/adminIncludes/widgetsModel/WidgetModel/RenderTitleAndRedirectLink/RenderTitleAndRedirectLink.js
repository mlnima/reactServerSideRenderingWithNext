import React from 'react';

const RenderTitleAndRedirectLink = props => {

    if (props.rendering){
        return (
            <>
                <div className='textInputFieldForWidget widgetSection'>
                    <p>Title:</p>
                    <input  name='title' className='form-control-input' placeholder='Title' value={
                        props.widgetSettings.activeEditingLanguage === 'default' ?
                            props.widgetData.title :
                            props.widgetData.translations ?
                                props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                                    props.widgetData.translations[props.widgetSettings.activeEditingLanguage].title || '' :
                                    '' : ''
                    }
                            onChange={e => props.onTextInputsDataChangeHandler(e)}/>
                </div>
                <div className={'textInputFieldForWidget widgetSection'}>
                    <p>Redirect Link TextInput</p>
                    <input  className='form-control-input' name='redirectToTitle' placeholder='TextInput for Redirect Links'
                            value={
                                props.widgetSettings.activeEditingLanguage === 'default' ?
                                    props.widgetData.redirectToTitle :
                                    props.widgetData.translations ?
                                        props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                                            props.widgetData.translations[props.widgetSettings.activeEditingLanguage].redirectToTitle || '' :
                                            '' : ''
                            }
                            onChange={e => props.onTextInputsDataChangeHandler(e)}/>
                </div>
                <div className={'textInputFieldForWidget widgetSection'}>
                    <p>Redirect Link URL:</p>
                    <input  className='form-control-input' name='redirectLink' placeholder='Redirect'
                            value={props.widgetData.redirectLink}
                            onChange={e => props.onTextInputsDataChangeHandler(e)}/>
                </div>

                <div className='textInputFieldForWidget widgetSection'>
                    <p>Link to Widget Footer:</p>
                    <select className={'custom-select'} name='footerLink' value={props.widgetData.footerLink} onChange={e => props.onChangeHandlerForBoolean(e)}>
                        <option value='' >Select</option>
                        <option value='true'>true</option>
                        <option value='false'>false</option>
                    </select>
                </div>




            </>
        );
    }else return null


};
export default RenderTitleAndRedirectLink;
