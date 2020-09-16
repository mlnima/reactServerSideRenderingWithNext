import React, {useEffect, useState, useContext, useRef} from 'react';

const MenuWidgetModelFieldsPreview = props => {
    const [state, setState] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        target: '',
        as: ''
    });

    const onEditHandler = e => {
        e.preventDefault()
        const previousMenuData = props.widgetData.data.menuItems ? {...props.widgetData.data.menuItems} : {}
        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                menuItems: {
                    ...previousMenuData,
                    [formData.name]: {
                        ...formData
                    }
                }
            }
        })
    }

    useEffect(() => {
        setFormData({
            ...formData,
            ...props.data
        })
    }, [props.data]);


    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const onDeleteHandler = key => {
        const menuData = props.widgetData.data.menuItems ? {...props.widgetData.data.menuItems} : {}
        delete menuData[key]
        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                menuItems: {
                    ...menuData,
                }
            }
        })
    }


    return (

        <form className='menu-item' onSubmit={e => onEditHandler(e)}>
            <h3>{props.name} :</h3>
            <div className='menu-form-field'>
                <p>Name:</p>
                <input type="text" name='name' value={formData.name} onChange={onChangeHandler}/>
            </div>
            <div className='menu-form-field'>
                <p>Target:</p>
                <input type="text" name='target' value={formData.target} onChange={onChangeHandler}/>
            </div>
            <div className='menu-form-field'>
                <p>As:</p>
                <input type="text" name='as' value={formData.as} onChange={onChangeHandler}/>
            </div>
            <div className='menu-form-field'>
                <p>Type:</p>
                <select required={true} name='type' value={formData.type} onChange={onChangeHandler}>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
            </div>
            <div className='menu-form-field'>
                <button type='submit'>Edit</button>
                <button onClick={() => onDeleteHandler(formData.name)}>delete</button>
            </div>

        </form>

    );
};
export default MenuWidgetModelFieldsPreview;
