import React from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const LinkTypeWidgetModelFields = props => {
        return (
            <>
                <TextInputFieldForWidget element='input' inputTitle='Link To :' name='linkTo' type='text' value={props.linkTo} classNameValue='linkTo' placeHolder='linkTo'
                                         onChangeHandler={props.onChangeHandler} rendering={props.widgetData.type ==='linkTo'}/>
                <TextInputFieldForWidget
                    element='input'
                    inputTitle='Link To Text :'
                    name='linkToText'
                    type='text'
                    value={
                        props.widgetSettings.activeEditingLanguage === 'default' ? props.widgetData.linkToText :
                            props.widgetData?.translations[props.widgetSettings.activeEditingLanguage]?.linkToText || ''

                    }
                    classNameValue='linkToText'
                    placeHolder='Link To Text'
                    onChangeHandler={e=>props.onTextInputsDataChangeHandler(e)} rendering={props.widgetData.type ==='linkTo'}/>
                <div className='selectInputFieldForWidget widgetSection'>
                </div>
                <div className='selectInputFieldForWidget widgetSection'>
                <p>Link To Window Type:</p>
                <select className={'custom-select'}
                        name='linkToWindowType'
                        value={props.linkToWindowType}
                        onChange={e=>props.onChangeHandler(e)}
                >
                    <option >select</option>
                    <option value='_blank'>Open New Window</option>
                    <option value='_self'>Redirect To Link In The Same Window</option>
                </select>
                </div>
            </>
        );

};
export default LinkTypeWidgetModelFields;
