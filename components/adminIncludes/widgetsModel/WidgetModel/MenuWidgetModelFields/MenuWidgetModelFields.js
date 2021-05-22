import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";
import _ from "lodash";
import MenuWidgetEditForm from "./MenuWidgetEditForm";

const MenuWidgetModelFields = props => {
    const [formData, setFormData] = useState({
        name: '',
        target: '',
        as: '',
        type: 'internal',
        itemIndex: 0,
        itemId: 0,
        translations: {},
    });

    const [state, setState] = useState({
        activeEditingLanguage: 'default'
    })



    // const renderItemsForParent = (props.widgetData.menuItems || []).map(menuItem=>{
    //     return(
    //         <option value={menuItem.itemId} key={_.uniqueId('id_')} >{menuItem.name}</option>
    //     )
    // });

    const onChangeHandlerWithTranslate = (e) => {
        props.widgetSettings.activeEditingLanguage === 'default' ?
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            }) : setFormData({
                ...formData,
                translations: {
                    ...formData.translations,
                    [props.widgetSettings.activeEditingLanguage]: {
                        ...formData.translations?.[props.widgetSettings.activeEditingLanguage] ?? {},
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
    //     console.log(props.widgetSettings.activeEditingLanguage)
    // }, [props]);

///page?pageName=testPage
///page/testPage


    const onAddHandler = e => {
        e.preventDefault()
        if (!formData.parent){
            props.setWidgetData({
                ...props.widgetData,
                menuItems: [
                    ...props?.widgetData?.menuItems || [],
                    {
                        ...formData,
                        itemIndex:formData.itemIndex ? parseInt(formData.itemIndex) : (props?.widgetData?.menuItems.length ||0),
                        itemId : _.uniqueId('id_') + props?.widgetData?.menuItems.length  || _.uniqueId('id_')
                    }
                ]
            })
        }else{

            const findParentIndex = props?.widgetData?.menuItems.findIndex(menuItem=>menuItem.itemId === formData.parent)
            const parentData = props?.widgetData?.menuItems.find(menuItem=>menuItem.itemId === formData.parent)
            const updatedParentData = {
                ...(parentData || {}),
                subItems:[...((props?.widgetData?.menuItems?.[findParentIndex] || {})?.subItems||[]), {
                    ...formData,
                    itemId : _.uniqueId('sub_') + props?.widgetData?.menuItems.length  || _.uniqueId('sub_'),
                    itemIndex:parentData?.subItems?.length +1 || 0,
                }]
            }
            // console.log(findParentIndex)
            // console.log(parentData)
            // console.log(updatedParentData)
            // console.log(updatedParentData)
            const newMenuData = [
                ...props.widgetData.menuItems.slice(0, findParentIndex),
                updatedParentData,
                ...props.widgetData.menuItems.slice(findParentIndex + 1),
            ]
            // console.log(newMenuData)
            props.setWidgetData({
                ...props.widgetData,
                menuItems: newMenuData
            })


        }

    }

    const onMenuStyleChangeHandler = e => {
        props.setWidgetData({
            ...props.widgetData,
            mobileNavigation: e.target.value
        })
    }

    const renderCurrentItems = (props?.widgetData?.menuItems?.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || []).map(menuItem => {
        return (
            <MenuWidgetModelFieldsPreview key={_.uniqueId('id_')}
                                          data={menuItem}
                                          widgetData={props.widgetData}
                                          setWidgetData={props.setWidgetData}

                                          activeEditingLanguage={props.widgetSettings.activeEditingLanguage}
                                          parentsOption={props.widgetData.menuItems || []}
                                          state={state}
            />
        )
    })

    if (props.rendering) {
        return (
            <div>
                <div className='menu-form-field'>
                    <p>Mobile Navigation: <FontAwesomeIcon icon={faBars} className='navigation-mobile-btn-logo' style={{width:'30px',height:'30px'}}/></p>
                    <select required={true} name='mobileNavigation' value={props.mobileNavigation} onChange={e => onMenuStyleChangeHandler(e)}>
                        <option>Select</option>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                    </select>
                </div>
                <MenuWidgetEditForm
                    onChangeHandler={onChangeHandler}
                    onSubmitHandler={onAddHandler}
                    onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}

                    data={formData}
                    setData={setFormData}
                    state={state}
                    parentsOption={props.widgetData.menuItems || []}
                    activeEditingLanguage={props.widgetSettings.activeEditingLanguage}
                    mode='Add'
                />

                <div className='menu-items'>
                    {renderCurrentItems}
                </div>
            </div>
        );
    } else return null

};
export default MenuWidgetModelFields;

// <form className='add-new-menu-item' onSubmit={e => onAddHandler(e)}>
//     <div className='menu-form-field'>
//         <p>Translations:</p>
//         <select name='activeEditingLanguage' onChange={e => setState({...state, activeEditingLanguage: e.target.value})}>
//             <option value='default'>{process.env.REACT_APP_DEFAULT_LOCAL ?? 'default'}</option>
//             {languagesOptions}
//         </select>
//     </div>
//     <div className='menu-form-field'>
//         <p>Parent:</p>
//         <select name='parent' value={formData.parent} onChange={e => onChangeHandler(e)}>
//             <option>select</option>
//             {renderItemsForParent}
//         </select>
//     </div>
//     <div className='menu-form-field'>
//         <p>Name:</p>
//         <input required={true} type="text" name='name' onChange={onChangeHandlerWithTranslate}
//                value={state.activeEditingLanguage === 'default' ? formData.name : formData.translations?.[state.activeEditingLanguage]?.name || ''}
//         />
//     </div>
//     <div className='menu-form-field'>
//         <p>Target:</p>
//         <input required={true} type="text" name='target' onChange={e => onChangeHandler(e)}/>
//     </div>
//
//     <div className='menu-form-field'>
//         <p>As:</p>
//         <input type="text" name='as' onChange={e => onChangeHandler(e)}/>
//     </div>
//     <div className='menu-form-field'>
//         <p>Item Index:</p>
//         <input required={true} type='number' name='itemIndex' onChange={e => onChangeHandler(e)}/>
//     </div>
//     <div className='menu-form-field'>
//         <p>Type:</p>
//         <select required={true} name='type' onChange={e => onChangeHandler(e)} value={formData.type}>
//             <option>Select</option>
//             <option value='internal'>Internal</option>
//             <option value='external'>External</option>
//         </select>
//     </div>
//
//     <div className='menu-form-field'>
//         <button type='submit'>Add</button>
//     </div>
// </form>