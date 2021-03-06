import React from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const LinkTypeWidgetModelFields = props => {

    if (props.rendering){
        return (
            <>
                <TextInputFieldForWidget element='input' inputTitle='Link To :' name='linkTo' type='text' value={props.linkTo} classNameValue='linkTo' placeHolder='linkTo'
                                         onChangeHandler={props.onChangeHandler} rendering={props.widgetData.type ==='linkTo'}/>
                <TextInputFieldForWidget element='input' inputTitle='Link To As :' name='linkToAs' type='text' value={props.linkToAs} classNameValue='linkToAs' placeHolder='Link To As'
                                         onChangeHandler={props.onChangeHandler} rendering={props.widgetData.type ==='linkTo'}/>
                {/*<TextInputFieldForWidget element='input' inputTitle='Link To Text :' name='linkToText' type='text' value={props.linkToText} classNameValue='linkToText' placeHolder='Link To Text'*/}
                {/*                         onChangeHandler={props.onTextInputsDataChangeHandler}/>*/}
                <TextInputFieldForWidget
                    element='input'
                    inputTitle='Link To Text :'
                    name='linkToText'
                    type='text'
                    // value={
                    //     props.widgetSettings.activeEditingLanguage === 'default' ? props.widgetData.linkToText :
                    //         props.widgetData.translations ?
                    //             props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                    //                 props.widgetData.translations[props.widgetSettings.activeEditingLanguage].linkToText || '' :
                    //                 '' : ''
                    //
                    // }


                    // switch to chaining operator
                    value={
                        props.widgetSettings.activeEditingLanguage === 'default' ? props.widgetData.linkToText :
                            props.widgetData?.translations[props.widgetSettings.activeEditingLanguage]?.linkToText || ''

                    }
                    classNameValue='linkToText'
                    placeHolder='Link To Text'
                    onChangeHandler={e=>props.onTextInputsDataChangeHandler(e)} rendering={props.widgetData.type ==='linkTo'}/>
                <div className='selectInputFieldForWidget widgetSection'>
                <p>Link Type :</p>
                <select name='linkToType' value={props.linkToType} onChange={e=>props.onChangeHandler(e)}>
                    <option >select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
                </div>
                <div className='selectInputFieldForWidget widgetSection'>
                <p>Link To Window Type:</p>
                <select name='linkToWindowType' value={props.linkToWindowType} onChange={e=>props.onChangeHandler(e)}>
                    <option >select</option>
                    <option value='_blank'>Open New Window</option>
                    <option value='_self'>Redirect To Link In The Same Window</option>
                </select>
                </div>
            </>
        );
    }else return null


};
export default LinkTypeWidgetModelFields;
