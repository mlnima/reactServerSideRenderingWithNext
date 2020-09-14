import React, {useEffect, useState, useContext, useRef} from 'react';
import './MenuWidgetModelFields.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const MenuWidgetModelFields = props => {
    const [formData, setFormData] = useState({
        name: '',
        target: '',
        as: ''
    });

    const [menuItems, setMenuItems] = useState({})

    useEffect(() => {
        console.log(props)
    }, [props]);

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onAddHandler = e => {
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

    const onDeleteHandler = key =>{
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


    const onEditHandler = e => {
        e.preventDefault()
    }

    useEffect(() => {
        console.log(props.widgetData.data.menuItems)
    }, [props]);

    const renderCurrentItems = ( Object.keys(props.widgetData.data.menuItems) || []).map(menuItem=>{
        return(
            <form className='menu-item' onSubmit={e => onEditHandler(e)}>
                <h3>{props.widgetData.data.menuItems[menuItem].name} :</h3>
                <div className='menu-form-field'>
                    <p>Name:</p>
                    <input type="text" name='name' value={props.widgetData.data.menuItems[menuItem].name} onChange={onChangeHandler}/>
                </div>
                <div className='menu-form-field'>
                    <p>Target:</p>
                    <input type="text" name='target' value={props.widgetData.data.menuItems[menuItem].target} onChange={onChangeHandler}/>
                </div>
                <div className='menu-form-field'>
                    <p>As:</p>
                    <input type="text" name='as' value={props.widgetData.data.menuItems[menuItem].as} onChange={onChangeHandler}/>
                </div>
                <div className='menu-form-field'>
                    <p>Type:</p>
                    <select required={true} name='type' value={props.widgetData.data.menuItems[menuItem].type} onChange={onChangeHandler}>
                        <option value='internal'>Internal</option>
                        <option value='external'>External</option>
                    </select>
                </div>
                <div className='menu-form-field'>
                    <button type='submit'>Edit</button>
                    <button onClick={()=>onDeleteHandler(menuItem)}>delete</button>
                </div>

            </form>
        )
    })


    return (
        <>
            <div className='menu-form-field'>
                <p>Mobile Navigation:  <FontAwesomeIcon icon={faBars} className='navigation-mobile-btn-logo'  /></p>
                <select required={true} name='mobileNavigation' value={props.mobileNavigation} onChange={e=>props.onChangeHandler(e)}>
                    <option >Select</option>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                </select>
            </div>
            <form className='add-new-menu-item' onSubmit={e => onAddHandler(e)}>
                <div className='menu-form-field'>
                    <p>Name:</p>
                    <input required={true} type="text" name='name' onChange={onChangeHandler}/>
                </div>
                <div className='menu-form-field'>
                    <p>Target:</p>
                    <input required={true} type="text" name='target' onChange={onChangeHandler}/>
                </div>
                <div  className='menu-form-field'>
                    <p>As:</p>
                    <input required={true} type="text" name='as' onChange={onChangeHandler}/>
                </div>
                <div className='menu-form-field'>
                    <p>Type:</p>
                    <select required={true} name='type' onChange={onChangeHandler}>
                        <option value='internal'>Internal</option>
                        <option value='external'>External</option>
                    </select>
                </div>

                <div className='menu-form-field'>
                    <button type='submit'>Add</button>
                </div>
            </form>
            <div className='menu-items'>
                {renderCurrentItems}
            </div>
        </>
    );
};
export default MenuWidgetModelFields;
