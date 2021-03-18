import React, {useEffect, useState} from 'react';
import {languagesOptions} from "../../../../../_variables/_variables";

const MenuWidgetModelFieldsPreview = props => {

    const [state, setState] = useState({
        open: false,
        activeEditingLanguage: 'default'
    });

    const [itemData, setItemData] = useState({
        name: '',
        target: '',
        as: '',
        type: '',
        itemIndex: 0,
        translations: {}
    });

    useEffect(() => {
        setItemData({
            ...itemData,
            ...props.data
        })
    }, [props.data]);

    const onEditHandler = e => {
        e.preventDefault()
        const findItemIndex = props.widgetData.menuItems.findIndex(i => i.itemId === itemData.itemId || i.name === itemData.name || i.target === itemData.target)
        const newData = [
            ...props.widgetData.menuItems.slice(0, findItemIndex),
            itemData,
            ...props.widgetData.menuItems.slice(findItemIndex + 1),
        ]
        props.setWidgetData({
            ...props.widgetData,
            menuItems: newData
        })
    }

    const onIndexChangeHandler = action => {
        const newDataToSet = {
            ...itemData,
            itemIndex: action ? parseInt(itemData.itemIndex) + 1 : parseInt(itemData.itemIndex) - 1,
            itemId: itemData.itemId ?? Math.floor(Math.random() *1000)
        }
        const findItemIndex = props.widgetData.menuItems.findIndex(i => i.itemId ? i.itemId === newDataToSet.itemId : i.name === newDataToSet.name)
        const newData = [
            ...props.widgetData.menuItems.slice(0, findItemIndex),
            newDataToSet,
            ...props.widgetData.menuItems.slice(findItemIndex + 1),
        ]
        props.setWidgetData({
            ...props.widgetData,
            menuItems: newData
        })
    }

    const onChangeHandlerWithTranslate = e => {
        state.activeEditingLanguage === 'default' ?
            setItemData({
                ...itemData,
                [e.target.name]: e.target.value
            }) : setItemData({
                ...itemData,
                translations: {
                    ...itemData.translations,
                    [state.activeEditingLanguage]: {
                        ...itemData.translations?.[state.activeEditingLanguage] ?? {},
                        [e.target.name]: e.target.value
                    }
                }
            })

    }

    const onChangeHandler = e => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        })
    }

    const onDeleteHandler = (name, itemId) => {
        const newMenuData = props.widgetData.menuItems.filter(i => i.itemId && itemId ? i.itemId !== itemId : i.name !== name)
        props.setWidgetData({
            ...props.widgetData,
            menuItems: newMenuData
        })
    }


    return (
        <div className='menu-item' key={props?.data?.itemId?.toString() + props.data.name ?? props.data.name}>
            <div className='menu-item-header'>
                <div className='menu-item-header-index-controller'>
                    <p>index: {itemData.itemIndex}</p>
                    <button onClick={() => onIndexChangeHandler(false)}>-</button>
                    <button onClick={() => onIndexChangeHandler(true)}>+</button>
                </div>

                <p>name: {itemData.name} </p>
                <p>ID: {itemData.itemId}</p>

                <button onClick={() => state.open ? setState({...state, open: false}) : setState({...state, open: true})}>{state.open ? 'close' : 'open'}</button>

            </div>
            {state.open ?
                <form  className='menu-item-form' onSubmit={e => onEditHandler(e)}>

                    <div className='menu-form-field'>
                        <p>Translations:</p>
                        <select name='activeEditingLanguage' onChange={e => setState({...state, activeEditingLanguage: e.target.value})}>
                            <option value='default'>{process.env.REACT_APP_DEFAULT_LOCAL ?? 'default'}</option>
                            {languagesOptions}
                        </select>
                    </div>
                    <div className='menu-form-field'>
                        <p>Name:</p>
                        <input type="text" name='name' onChange={e => onChangeHandlerWithTranslate(e)}
                               value={state.activeEditingLanguage === 'default' ? itemData.name : itemData.translations?.[state.activeEditingLanguage]?.name || ''}
                        />
                    </div>
                    <div className='menu-form-field'>
                        <p>Target:</p>
                        <input type="text" name='target' value={itemData.target} onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className='menu-form-field'>
                        <p>As:</p>
                        <input type="text" name='as' value={itemData.as} onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className='menu-form-field'>
                        <p>Item Index:</p>
                        <input type="number" name='itemIndex' value={itemData.itemIndex} onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className='menu-form-field'>
                        <p>Type:</p>
                        <select required={true} name='type' value={itemData.type} onChange={e => onChangeHandler(e)}>
                            <option>Select</option>
                            <option value='internal'>Internal</option>
                            <option value='external'>External</option>
                        </select>
                    </div>
                    <div className='menu-form-field'>
                        <button type='submit'>Edit</button>
                        <button onClick={() => onDeleteHandler(itemData.name, itemData.itemId)}>delete</button>
                    </div>

                </form>
                : null}


        </div>
    );
};
export default MenuWidgetModelFieldsPreview;
