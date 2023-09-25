import styled from "styled-components";
import React, {FC} from "react";
import {IMenuItem} from "typescript-types/dist/src/widgets/Widget";

const MenuWidgetEditFormStyledFrom = styled.form`
  width: 95%;
  margin: auto;
  .formId {
    font-size: small;
  }
  .menu-widget-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: auto;
    width: 90%;
  }
  .menu-widget-form-form-field {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 70%;
    }
  }
`

interface IProps{
    parentsOption:[],
    activeEditingLanguage:string,
    mode:string,
    onChangeHandler:Function,
    onChangeHandlerWithTranslate:Function,
    onSubmitHandler:Function,
    onDeleteHandler:Function,
    state:{
        activeEditingLanguage:string
    },
    data:IMenuItem
}
const MenuWidgetEditForm:FC<IProps> = (
    {
        parentsOption,
        activeEditingLanguage,
        onChangeHandlerWithTranslate,
        onSubmitHandler,
        onDeleteHandler,
        onChangeHandler,
        mode,
        data
    }) => {

    // const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    //     setFormData((prevFormData:IMenuItem)=>({
    //         ...prevFormData,
    //         [event.target.name]: event.target.value
    //     }))
    // }


    const renderItemsForParent = parentsOption.map((parentOption,index) => {
        return (
            //@ts-ignore
            <option value={parentOption.itemId} key={'id_' + index + parentOption.itemId}>
                {/*//@ts-ignore*/}
                {parentOption?.translations?.[activeEditingLanguage]?.name || parentOption.name}
            </option>
        )
    });

    return (

        <MenuWidgetEditFormStyledFrom className='menu-widget-form' onSubmit={e => onSubmitHandler(e)}>
            {mode === 'Edit' && <label className='formId'> ID : {data.itemId}</label>}
            {mode === 'Add' &&
                <div className='menu-widget-form-form-field'>
                    <p>Parent:</p>

                    <select className={'custom-select'} name='parent' value={data.parent} onChange={e => onChangeHandler(e)}>
                        <option>select</option>
                        {renderItemsForParent}
                    </select>
                </div>
            }
            <div className='menu-widget-form-form-field'>
                <p>Name:</p>
                <input className={'primaryInput'}
                       required={mode !== 'Edit'}
                       type="text"
                       name='name'
                       onChange={e => onChangeHandlerWithTranslate(e)}
                       value={activeEditingLanguage === 'default' ?
                           data.name :
                           //@ts-ignore
                           data.translations?.[activeEditingLanguage]?.name || ''
                       }
                />
            </div>

            <div className='menu-widget-form-form-field'>
                <p>Target:</p>
                <input className={'primaryInput'}
                       required={mode !== 'Edit'}
                       type="text" name='target' value={data.target || ''}
                       onChange={e => onChangeHandler(e)}/>
            </div>

            {/*<div className='menu-widget-form-form-field'>*/}
            {/*    <p>As:</p>*/}
            {/*    <input type="text" name='as' value={data.as ||''} onChange={e => onChangeHandler(e)}/>*/}
            {/*</div>*/}
            <div className='menu-widget-form-form-field'>
                <p>Item Index:</p>
                <input required={mode !== 'Edit'}
                       className={'primaryInput'}
                       type='number'
                       name='itemIndex'
                       value={data.itemIndex || ''}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Type:</p>
                <select required={mode !== 'Edit'}
                        className={'custom-select'}
                        name='type'
                        onChange={e => onChangeHandler(e)}
                        value={data.type || 'internal'}>
                    <option>Select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
            </div>

            <div className='menu-widget-form-form-field'>
                <button className={'btn btn-primary'} type='submit'>{mode}</button>
                {mode === 'Edit' &&
                    <button className={'btn btn-danger'} onClick={() => onDeleteHandler(data.itemId)}>
                        Delete
                    </button>
                }
            </div>

        </MenuWidgetEditFormStyledFrom>


    );
};
export default MenuWidgetEditForm;
