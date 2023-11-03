import styled from "styled-components";
import React, {FC} from "react";
import {IMenuItem} from "typescript-types";

const Styles = styled.form`
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
const EditItemForm:FC<IProps> = (
    {
        // parentsOption,
        activeEditingLanguage,
        onChangeHandlerWithTranslate,
        onSubmitHandler,
        onDeleteHandler,
        onChangeHandler,
        mode,
        data
    }) => {



    return (

        <Styles className='menu-widget-form' onSubmit={e => onSubmitHandler(e)}>
            <label className='formId'> ID : {data.itemId}</label>

            <div className='menu-widget-form-form-field'>
                <p>Name:</p>
                <input className={'primaryInput'}
                       required={true}
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
                <p>Icon:</p>
                <input className={'primaryInput'}
                       required={false}
                       type="text"
                       name='icon'
                       onChange={e => onChangeHandler(e)}
                       value={data.icon}
                />
            </div>

            <div className='menu-widget-form-form-field'>
                <p>Target:</p>
                <input className={'primaryInput'}
                       required={false}
                       type="text"
                       name='target'
                       value={data.target || ''}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Item Index:</p>
                <input required={true}
                       className={'primaryInput'}
                       type='number'
                       name='itemIndex'
                       value={data.itemIndex || ''}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Type:</p>
                <select required={true}
                        className={'primarySelect'}
                        name='type'
                        onChange={e => onChangeHandler(e)}
                        value={data.type || 'internal'}>
                    <option>Select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
            </div>

            <div className='menu-widget-form-form-field'>
                <button className={'btn btn-primary'} type='submit'>Edit</button>
                <button className={'btn btn-danger'} onClick={() => onDeleteHandler(data.itemId)}>
                    Delete
                </button>
            </div>

        </Styles>


    );
};
export default EditItemForm;


// const renderItemsForParent = parentsOption.map((parentOption,index) => {
//     return (
//         <option value={parentOption.itemId} key={'id_' + index + parentOption.itemId}>
//             {parentOption?.translations?.[activeEditingLanguage]?.name || parentOption.name}
//         </option>
//     )
// });

// {/*{mode === 'Add' &&*/}
// {/*    <div className='menu-widget-form-form-field'>*/}
// {/*        <p>Parent:</p>*/}
//
// {/*        <select className={'primarySelect'} name='parent' value={data.parent} onChange={e => onChangeHandler(e)}>*/}
// {/*            <option>select</option>*/}
// {/*            {renderItemsForParent}*/}
// {/*        </select>*/}
// {/*    </div>*/}
// {/*}*/}