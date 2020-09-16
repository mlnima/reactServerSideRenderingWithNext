import React, {useEffect, useState, useContext, useRef} from 'react';
import './MenuWidgetModelFields.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";

const MenuWidgetModelFields = props => {
    const [formData, setFormData] = useState({
        name: '',
        target: '',
        as: ''
    });

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

    useEffect(() => {
        console.log(props.widgetData.data.menuItems)
    }, [props]);

    const renderCurrentItems = ( props.widgetData.data.menuItems ? Object.keys(props.widgetData.data.menuItems) : []).map(menuItem=>{
        return(
          <MenuWidgetModelFieldsPreview name={menuItem} data={props.widgetData.data.menuItems[menuItem]} {...props}/>
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
