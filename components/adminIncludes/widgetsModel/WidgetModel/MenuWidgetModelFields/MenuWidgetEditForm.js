import {uniqueId} from "lodash";
import styled from "styled-components";

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
    input{
      width: 70%;
    }
  }
`
const MenuWidgetEditForm = props => {

    const renderItemsForParent = props.parentsOption.map(parentOption => {
        return (
            <option value={parentOption.itemId} key={uniqueId('id_')}>{parentOption?.translations?.[props.activeEditingLanguage]?.name || parentOption.name}</option>
        )
    });

    return (

        <MenuWidgetEditFormStyledFrom className='menu-widget-form' onSubmit={e => props.onSubmitHandler(e)}>
            {props.mode === 'Edit' ?
                <label className='formId'> ID : {props.data.itemId}</label>
                : null
            }
            {props.mode === 'Add' ?
                <div className='menu-widget-form-form-field'>
                    <p>Parent:</p>
                    <select     className={'custom-select'} name='parent' value={props.data.parent} onChange={e => props.onChangeHandler(e)}>
                        <option>select</option>
                        {renderItemsForParent}
                    </select>
                </div>
                : null
            }
            <div className='menu-widget-form-form-field'>
                <p>Name:</p>
                <input className={'form-control-input'}
                       required={props.mode !== 'Edit'}
                       type="text" name='name'
                       onChange={e => props.onChangeHandlerWithTranslate(e)}
                       value={props.activeEditingLanguage === 'default' ?
                              props.data.name :
                              props.data.translations?.[props.activeEditingLanguage]?.name || ''
                       }
                />
            </div>

            <div className='menu-widget-form-form-field'>
                <p>Target:</p>
                <input className={'form-control-input'}
                       required={props.mode !== 'Edit'}
                       type="text" name='target' value={props.data.target || ''}
                       onChange={e => props.onChangeHandler(e)}
                />
            </div>

            {/*<div className='menu-widget-form-form-field'>*/}
            {/*    <p>As:</p>*/}
            {/*    <input type="text" name='as' value={props.data.as ||''} onChange={e => props.onChangeHandler(e)}/>*/}
            {/*</div>*/}
            <div className='menu-widget-form-form-field'>
                <p>Item Index:</p>
                <input required={props.mode !== 'Edit'}
                       className={'form-control-input'}
                       type='number'
                       name='itemIndex'
                       value={props.data.itemIndex || ''}
                       onChange={e => props.onChangeHandler(e)}
                />
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Type:</p>
                <select required={props.mode !== 'Edit'}
                        className={'custom-select'}
                        name='type'
                        onChange={e => props.onChangeHandler(e)}
                        value={props.data.type}
                >
                    <option>Select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
            </div>

            <div className='menu-widget-form-form-field'>
                <button className={'btn btn-primary'} type='submit'>{props.mode}</button>
                {props.mode === 'Edit' ?
                    <button className={'btn btn-danger'} onClick={() => props.onDeleteHandler(props.data.itemId)}>Delete</button>
                    : null
                }
            </div>

        </MenuWidgetEditFormStyledFrom>


    );
};
export default MenuWidgetEditForm;
