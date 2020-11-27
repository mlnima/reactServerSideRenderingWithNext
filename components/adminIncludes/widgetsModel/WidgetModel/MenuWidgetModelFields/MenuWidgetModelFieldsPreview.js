import React, {useEffect, useState, useContext, useRef} from 'react';

const MenuWidgetModelFieldsPreview = props => {
    const [state, setState] = useState({
        open: false
    });

    const [itemData, setItemData] = useState({
        name: '',
        target: '',
        as: '',
        type: ''
    });
    useEffect(() => {
        console.log(props)
    }, [props]);
    const onEditHandler = e => {
        e.preventDefault()
        const findItemIndex = props.widgetData.menuItems.findIndex(i => i.itemIndex === itemData.itemIndex)
        console.log(findItemIndex)
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

    useEffect(() => {
        setItemData({
            ...itemData,
            ...props.data
        })
        console.log(props)
    }, [props.data]);


    const onChangeHandler = (e) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        })
    }


    const onDeleteHandler = name => {
        const newMenuData = props.widgetData.data.menuItems.filter(i => i.name !== name)
        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                menuItems: newMenuData
            }
        })
    }


    return (

        <form className='menu-item' onSubmit={e => onEditHandler(e)}>
            <h3>{props.name} :</h3>
            <div className='menu-form-field'>
                <p>Name:</p>
                <input type="text" name='name' value={itemData.name} onChange={onChangeHandler}/>
            </div>
            <div className='menu-form-field'>
                <p>Target:</p>
                <input type="text" name='target' value={itemData.target} onChange={onChangeHandler}/>
            </div>
            <div className='menu-form-field'>
                <p>As:</p>
                <input type="text" name='as' value={itemData.as} onChange={onChangeHandler}/>
            </div>
            <div className='menu-form-field'>
                <p>Type:</p>
                <select required={true} name='type' value={itemData.type} onChange={onChangeHandler}>
                    <option>Select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
            </div>
            <div className='menu-form-field'>
                <button type='submit'>Edit</button>
                <button onClick={() => onDeleteHandler(itemData.name)}>delete</button>
            </div>

        </form>

    );
};
export default MenuWidgetModelFieldsPreview;
