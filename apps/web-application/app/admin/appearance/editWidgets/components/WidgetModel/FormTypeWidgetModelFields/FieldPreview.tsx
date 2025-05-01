// @ts-nocheck
'use client';
import React, {FC, useEffect, useState} from 'react';
import {IWidgetData} from "@repo/typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons/faSliders";
import {faSortUp} from "@fortawesome/free-solid-svg-icons/faSortUp";
import {faSortDown} from "@fortawesome/free-solid-svg-icons/faSortDown";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import './FieldPreview.scss'

interface FieldPreviewPropTypes{
    widgetData:IWidgetData,
    setWidgetData:Function,
    field:{
        fieldName:string,
        filedId:number,
        fieldIndex:number,
        required:boolean
    }
}

const FieldPreview :FC<FieldPreviewPropTypes>= ({setWidgetData,widgetData,field}) => {
        const [state, setState] = useState({
            open: false
        });
        const [fieldData, setFieldData] = useState({
            fieldName: '',
            fieldPlaceHolder: '',
            required: true,
            fieldType: 'text',
        });

        useEffect(() => {
            //@ts-ignore
            setFieldData(field)
        }, [field]);

        const onDeleteHandler = name => {
            const newData = widgetData?.uniqueData?.formFields?.filter(i => i.fieldName !== name)
            //@ts-ignore
            setWidgetData({
                ...widgetData,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
                    formFields: newData
                }
            })
        }
        const onEditHandler = e => {
            e.preventDefault()
            const findIndexOfTheField = widgetData?.uniqueData?.formFields?.findIndex(f => f.fieldName === field.fieldName)
            const updatedFields = [
                ...widgetData?.uniqueData?.formFields?.slice(0, findIndexOfTheField),
                fieldData,
                ...widgetData?.uniqueData?.formFields?.slice(findIndexOfTheField + 1),
            ];
            //@ts-ignore
            setWidgetData({
                ...widgetData,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
                    formFields: updatedFields
                }
            })
        }

        const onChangeHandler = (e) => {
            setFieldData({
                ...fieldData,
                [e.target.name]: e.target.value
            })
        }

        const fieldIndexPlus = value => {
            //@ts-ignore
            const updatedFieldData = {...field, fieldIndex: parseInt(field.fieldIndex) + value}
            //@ts-ignore
            const findIndexOfTheField = widgetData?.uniqueData.formFields.findIndex(f => f.filedId === field.filedId)
            const updatedFields = [
                //@ts-ignore
                ...widgetData?.uniqueData.formFields.slice(0, findIndexOfTheField),
                updatedFieldData,
                //@ts-ignore
                ...widgetData?.uniqueData.formFields.slice(findIndexOfTheField + 1),
            ];
            //@ts-ignore
            setWidgetData({
                ...widgetData,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
                    formFields: updatedFields
                }
            })
        }

        return (
            <div className='fieldPreview' key={field.filedId}>
                <div className='field-index-control'>
                    <button
                        onClick={() => state.open ? setState({...state, open: false}) : setState({
                            ...state,
                            open: true
                        })}
                        className={'btn btn-secondary'}>
                        <FontAwesomeIcon icon={faSliders} className={'meta-icon'}/>

                    </button>
                    <p>{'ID : ' + field.filedId}</p>
                    {/*//@ts-ignore*/}
                    <p>{field.fieldType + ' : ' + field.fieldName}</p>
                    <p>index:{field.fieldIndex}</p>
                    <button onClick={() => fieldIndexPlus(-1)} className={'btn btn-secondary'}>
                        <FontAwesomeIcon icon={faSortUp} className={'meta-icon'}/>
                    </button>
                    <button onClick={() => fieldIndexPlus(+1)} className={'btn btn-secondary'}>
                        <FontAwesomeIcon icon={faSortDown} className={'meta-icon'}/>
                    </button>
                    <button onClick={() => onDeleteHandler(field.fieldName)} className={'btn btn-secondary'}>
                        <FontAwesomeIcon icon={faTrashCan} className={'meta-icon'}/>
                    </button>

                </div>
                {state.open ?
                    <div className='edit-form-fields'>
                        <form className='add-new-filed' onSubmit={e => onEditHandler(e)}>
                            <p>Filed Name :</p>
                            <input className={'primaryInput'} required={true} name='fieldName'
                                   value={fieldData.fieldName} onChange={e => onChangeHandler(e)}/>
                            <p>Place Holder :</p>
                            <input className={'primaryInput'} name='fieldPlaceHolder'
                                   value={fieldData.fieldPlaceHolder} onChange={e => onChangeHandler(e)}/>

                            <p>Required :</p>
                            {/*//@ts-ignore*/}
                            <select className={'primarySelect'} name='required' value={fieldData.required}
                                    onChange={e => onChangeHandler(e)}>
                                <option value='true'>True</option>
                                <option value='false'>False</option>
                            </select>
                            <p>Filed Type :</p>
                            <select className={'primarySelect'} required={true} value={fieldData.fieldType}
                                    name='fieldType'
                                    onChange={e => onChangeHandler(e)}>
                                <option>Select</option>
                                <option value='textarea'>Text Area</option>
                                <option value='text'>Text</option>
                                {/*<option value='button'>Number</option>*/}
                                <option value='email'>Email</option>
                                <option value='checkbox'>CheckBox</option>
                                <option value='color'>Color</option>
                                <option value='date'>date</option>
                                <option value='email'>email</option>
                                <option value='number'>number</option>
                                <option value='radio'>radio</option>
                                <option value='range'>range</option>
                                <option value='tel'>tel</option>
                                <option value='time'>time</option>
                                <option value='url'>url</option>
                            </select>
                            <button className={'btn btn-primary'} type='submit'>Edit</button>
                        </form>
                    </div>
                    : null
                }

                {/*<RenderEditMode/>*/}
            </div>
        );
    }
;
export default FieldPreview;
