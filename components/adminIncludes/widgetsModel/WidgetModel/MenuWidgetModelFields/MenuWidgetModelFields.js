import React, {useEffect, useState, useContext, useRef} from 'react';
import './MenuWidgetModelFields.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";
import {languagesOptions} from "../../../../../_variables/_variables";

const MenuWidgetModelFields = props => {
    const [formData, setFormData] = useState({
        name: '',
        target: '',
        as: '',
        type: 'internal',
        itemIndex: 0,
        itemId: 0,
        translations: {}
    });

    const [state, setState] = useState({
        activeEditingLanguage: 'default'
    })


    const onChangeHandlerWithTranslate = (e) => {
        state.activeEditingLanguage === 'default' ?
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            }) : setFormData({
                ...formData,
                translations: {
                    ...formData.translations,
                    [state.activeEditingLanguage]: {
                        ...formData.translations?.[state.activeEditingLanguage] ?? {},
                        [e.target.name]: e.target.value
                    }
                }
            })
    }

    const onChangeHandler = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // useEffect(() => {
    //     console.log(props.widgetData)
    // }, [props]);

    const onAddHandler = e => {
        e.preventDefault()
        const itemIndex = formData.itemIndex ? parseInt(formData.itemIndex) : parseInt(props?.widgetData?.menuItems.length);
        const itemId = parseInt(props?.widgetData?.menuItems.length)
        props.setWidgetData({
            ...props.widgetData,
            menuItems: [
                ...props?.widgetData?.menuItems || [],
                {...formData,
                    itemIndex,
                    itemId
                }
             ]
        })
    }

    const onMenuStyleChangeHandler = e =>{
        props.setWidgetData({
            ...props.widgetData,
            mobileNavigation: e.target.value
        })
    }



    const renderCurrentItems = (props?.widgetData?.menuItems?.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || []).map(menuItem => {
        return (
            <MenuWidgetModelFieldsPreview key={menuItem?.itemId?.toString() + menuItem.name ?? menuItem.name} data={menuItem} widgetData={props.widgetData} setWidgetData={props.setWidgetData}/>
        )
    })

    if (props.rendering) {
        return (
            <div>
                <div className='menu-form-field'>
                    <p>Mobile Navigation: <FontAwesomeIcon icon={faBars} className='navigation-mobile-btn-logo'/></p>
                    <select required={true} name='mobileNavigation' value={props.mobileNavigation} onChange={e => onMenuStyleChangeHandler(e)}>
                        <option>Select</option>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                    </select>
                </div>
                <form className='add-new-menu-item' onSubmit={e => onAddHandler(e)}>
                    <div className='menu-form-field'>
                        <p>Translations:</p>
                        <select name='activeEditingLanguage' onChange={e => setState({...state, activeEditingLanguage: e.target.value})}>
                            <option value='default'>{process.env.REACT_APP_DEFAULT_LOCAL ?? 'default'}</option>
                            {languagesOptions}
                        </select>
                    </div>
                    <div className='menu-form-field'>
                        <p>Name:</p>
                        <input required={true} type="text" name='name' onChange={onChangeHandlerWithTranslate}
                               value={state.activeEditingLanguage === 'default' ? formData.name : formData.translations?.[state.activeEditingLanguage]?.name || ''}
                        />
                    </div>
                    <div className='menu-form-field'>
                        <p>Target:</p>
                        <input required={true} type="text" name='target' onChange={e=>onChangeHandler(e)}/>
                    </div>

                    <div className='menu-form-field'>
                        <p>As:</p>
                        <input required={true} type="text" name='as' onChange={e=>onChangeHandler(e)}/>
                    </div>
                    <div className='menu-form-field'>
                        <p>Item Index:</p>
                        <input required={true} type='number' name='itemIndex' onChange={e=>onChangeHandler(e)}/>
                    </div>
                    <div className='menu-form-field'>
                        <p>Type:</p>
                        <select required={true} name='type' onChange={e=>onChangeHandler(e)} value={formData.type}>
                            <option>Select</option>
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
            </div>
        );
    } else return null

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