import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

let StyledDiv = styled.div`
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: black;
  //border: solid 2px rgba(0, 0, 0, .1);
  display: flex;

  flex-direction: column;


  .field-index-control {
    display: flex;
    justify-content: space-between;
    width: 100%;


    button {
      //background-color: transparent;
      //color: white;
      //border: none;
      transition: .5s;

      &:hover {
        transform: scale(1.5);
      }
    }
  }

  .edit-form-fields {
    padding: 5px;
    display: flex;
    //align-items: center;
    justify-content: center;
    flex-direction: column;
    
    input {
      max-width: 90%;
    }
  }
`
const FieldPreview = props => {
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
        setFieldData(props.field)
    }, [props.field]);
    const onDeleteHandler = name => {
        const newData = props.widgetData.formData.formFields.filter(i => i.fieldName !== name)
        props.setWidgetData({
            ...props.widgetData,
            formData: {
                ...props.widgetData.formData,
                formFields: newData
            }

        })
    }
    const onEditHandler = e => {
        e.preventDefault()
        const findIndexOfTheField = props.widgetData.formData.formFields.findIndex(f => f.fieldName === props.field.fieldName)
        const updatedFields = [
            ...props.widgetData.formData.formFields.slice(0, findIndexOfTheField),
            fieldData,
            ...props.widgetData.formData.formFields.slice(findIndexOfTheField + 1),
        ];
        props.setWidgetData({
            ...props.widgetData,
            formData: {
                ...props.widgetData.formData,
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
        const updatedFieldData = {...props.field, fieldIndex: props.field.fieldIndex + value}
        const findIndexOfTheField = props.widgetData.formData.formFields.findIndex(f => f.filedId === props.field.filedId)
        const updatedFields = [
            ...props.widgetData.formData.formFields.slice(0, findIndexOfTheField),
            updatedFieldData,
            ...props.widgetData.formData.formFields.slice(findIndexOfTheField + 1),
        ];
        props.setWidgetData({
            ...props.widgetData,
            formData: {
                ...props.formData,
                formFields: updatedFields
            }
        })
    }

    return (
        <StyledDiv className='form-item-view' key={props.field.filedId}>
            <div className='field-index-control'>
                <button onClick={() => state.open ? setState({...state, open: false}) : setState({...state, open: true})} className={'btn btn-secondary'}>
                    <FontAwesomeIcon style={{transform: state.open ? 'rotate(90deg)' : 'rotate(0deg)', transition: '.5s all'}} icon={faBars} />
                </button>
                <p>{'ID : ' + props.field.filedId}</p>
                <p>{props.field.fieldType + ' : ' + props.field.fieldName}</p>
                <p>index:{props.field.fieldIndex}</p>
                <button onClick={() => fieldIndexPlus(-1)} className={'btn btn-secondary'} ><FontAwesomeIcon icon={faArrowUp} /></button>
                <button onClick={() => fieldIndexPlus(+1)} className={'btn btn-secondary'}><FontAwesomeIcon icon={faArrowDown} /></button>
                <button onClick={() => onDeleteHandler(props.field.fieldName)} className={'btn btn-secondary'}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            {state.open ?
                <div className='edit-form-fields'>
                    <form className='add-new-filed' onSubmit={e => onEditHandler(e)}>
                        <p>Filed Name :</p>
                        <input className={'form-control-input'} required={true} name='fieldName' value={fieldData.fieldName} onChange={e => onChangeHandler(e)}/>
                        <p>Place Holder :</p>
                        <input className={'form-control-input'} name='fieldPlaceHolder' value={fieldData.fieldPlaceHolder} onChange={e => onChangeHandler(e)}/>

                        <p>Required :</p>
                        <select className={'custom-select'} name='required' value={fieldData.required} onChange={e => onChangeHandler(e)}>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                        </select>
                        <p>Filed Type :</p>
                        <select className={'custom-select'} required={true} value={fieldData.fieldType} name='fieldType' onChange={e => onChangeHandler(e)}>
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
};
export default FieldPreview;
