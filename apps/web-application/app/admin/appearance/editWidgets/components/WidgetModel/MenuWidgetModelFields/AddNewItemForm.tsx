'use client';
import React, {FC} from "react";
import {IMenuItem} from "@repo/typescript-types";

interface IProps {
    parentsOption: IMenuItem[],
    activeEditingLanguage: string,
    onChangeHandler: Function,
    onChangeHandlerWithTranslate: Function,
    onSubmitHandler: Function,
    state: {
        activeEditingLanguage: string
    },
    data: IMenuItem
}

const MenuWidgetEditForm: FC<IProps> = (
    {
        parentsOption,
        activeEditingLanguage,
        onChangeHandlerWithTranslate,
        onSubmitHandler,
        onChangeHandler,
        data
    }) => {

    const renderItemsForParent = parentsOption.map((parentOption, index) => {
        return (

            <option value={parentOption.itemId} key={'id_' + index + parentOption.itemId}>
                {parentOption?.translations?.[activeEditingLanguage]?.name || parentOption.name}
            </option>
        )
    });


    return (
        <form className='AddNewItemForm' onSubmit={e => onSubmitHandler(e)}>
           <h3> Add New Item</h3>
            <div className='menu-widget-form-form-field'>
                <p>Parent:</p>

                <select className={'primarySelect'} name='parent' value={data.parent}
                        onChange={e => onChangeHandler(e)}>
                    <option>select</option>
                    {renderItemsForParent}
                </select>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Name:</p>
                <input className={'primaryInput'}
                       required={true}
                       type="text"
                       name='name'
                       onChange={e => onChangeHandlerWithTranslate(e)}
                       value={activeEditingLanguage === 'default' ?
                           data.name :
                           data.translations?.[activeEditingLanguage]?.name || ''
                       }
                />
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Icon:</p>
                <input className={'primaryInput'}
                       type="text"
                       name='icon'
                       onChange={e => onChangeHandler(e)}
                       value={data.icon }
                />
            </div>

            <div className='menu-widget-form-form-field'>
                <p>Target:</p>
                <input className={'primaryInput'}
                       required={true}
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
                <button className={'btn btn-primary'} type='submit'>Add</button>
            </div>

        </form>


    );
};
export default MenuWidgetEditForm;
