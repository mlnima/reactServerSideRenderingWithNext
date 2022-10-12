import {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import {WidgetData} from "@_typeScriptTypes/widgets/Widget";

let StyledDiv = styled.div`
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: black;
  display: flex;
  flex-direction: column;
  
  .field-index-control {
    display: flex;
    justify-content: space-between;
    width: 100%;

    button {
      transition: .5s;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .edit-form-fields {
    padding: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    input {
      max-width: 90%;
    }
  }
`

interface FieldPreviewPropTypes{
    widgetData:WidgetData,
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
            const updatedFieldData = {...field, fieldIndex: field.fieldIndex + value}
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
            <StyledDiv className='form-item-view' key={field.filedId}>
                <div className='field-index-control'>
                    <button
                        onClick={() => state.open ? setState({...state, open: false}) : setState({
                            ...state,
                            open: true
                        })}
                        className={'btn btn-secondary'}>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/sliders-solid.svg'}
                                     size={20}
                                     color={'var(--secondary-button-link-text-color, #fff)'}/>

                    </button>
                    <p>{'ID : ' + field.filedId}</p>
                    {/*//@ts-ignore*/}
                    <p>{field.fieldType + ' : ' + field.fieldName}</p>
                    <p>index:{field.fieldIndex}</p>
                    <button onClick={() => fieldIndexPlus(-1)} className={'btn btn-secondary'}>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/sort-up-solid.svg'}
                                     size={20}
                                     color={'var(--secondary-button-link-text-color, #fff)'}/>
                    </button>
                    <button onClick={() => fieldIndexPlus(+1)} className={'btn btn-secondary'}>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/sort-down-solid.svg'}
                                     size={20}
                                     color={'var(--secondary-button-link-text-color, #fff)'}/>
                    </button>
                    <button onClick={() => onDeleteHandler(field.fieldName)} className={'btn btn-secondary'}>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/trash-can-solid.svg'}
                                     size={20}
                                     color={'var(--secondary-button-link-text-color, #fff)'}/>
                    </button>

                </div>
                {state.open ?
                    <div className='edit-form-fields'>
                        <form className='add-new-filed' onSubmit={e => onEditHandler(e)}>
                            <p>Filed Name :</p>
                            <input className={'form-control-input'} required={true} name='fieldName'
                                   value={fieldData.fieldName} onChange={e => onChangeHandler(e)}/>
                            <p>Place Holder :</p>
                            <input className={'form-control-input'} name='fieldPlaceHolder'
                                   value={fieldData.fieldPlaceHolder} onChange={e => onChangeHandler(e)}/>

                            <p>Required :</p>
                            {/*//@ts-ignore*/}
                            <select className={'custom-select'} name='required' value={fieldData.required}
                                    onChange={e => onChangeHandler(e)}>
                                <option value='true'>True</option>
                                <option value='false'>False</option>
                            </select>
                            <p>Filed Type :</p>
                            <select className={'custom-select'} required={true} value={fieldData.fieldType}
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
            </StyledDiv>
        );
    }
;
export default FieldPreview;
