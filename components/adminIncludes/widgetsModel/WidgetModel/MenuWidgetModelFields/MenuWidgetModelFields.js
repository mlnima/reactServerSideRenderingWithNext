import React, {useEffect, useState, useContext, useRef} from 'react';
import './MenuWidgetModelFields.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";

const MenuWidgetModelFields = props => {
    const [formData, setFormData] = useState({
        name: '',
        target: '',
        as: '',
        type:'internal',
        itemIndex:0
    });

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onAddHandler = e => {
        e.preventDefault()
       // const previousMenuData = props.widgetData.menuItems ? [...props.widgetData.menuItems] : []
        const previousMenuData = props?.widgetData?.menuItems || []
        props.setWidgetData({
            ...props.widgetData,
            menuItems:[...previousMenuData, {...formData,itemIndex:previousMenuData.length}]
        })
    }

    const renderCurrentItems = (  props.widgetData.menuItems || []).map(menuItem=>{
        return(
          <MenuWidgetModelFieldsPreview key={(  props.widgetData.menuItems || []).indexOf(menuItem)} name={menuItem.name} data={menuItem} {...props}/>
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
                    <select required={true} name='type' onChange={onChangeHandler} value={formData.type}>
                        <option >Select</option>
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

//.menu-widget{
//     .navigation-mobile-button{
//         .navigation-mobile-button-logo{
//             color: white;
//         }
//     }
//     .menu-widget-items{
//         .menu-widget-item{
//             a{
//                 color:white;
//             }
//         }
//     }
// }