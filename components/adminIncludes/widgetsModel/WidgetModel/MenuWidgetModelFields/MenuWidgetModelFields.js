import {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";
import {uniqueId} from "lodash";
import MenuWidgetEditForm from "./MenuWidgetEditForm";

import styled from "styled-components";
const MenuWidgetModelFieldsStyledDiv = styled.div`
  .mobileNavigationLabel{
    padding: 0 25px;
  }
`
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



    const onAddHandler = e => {
        e.preventDefault()
        if (!formData.parent){
            props.setWidgetData({
                ...props.widgetData,
                menuItems: [
                    ...props?.widgetData?.menuItems || [],
                    {
                        ...formData,
                        itemIndex:formData.itemIndex ? parseInt(formData.itemIndex) : (props?.widgetData?.menuItems?.length ||0),
                        itemId : uniqueId('id_') + props?.widgetData?.menuItems?.length  || uniqueId('id_')
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
                    itemId : uniqueId('sub_') + props?.widgetData?.menuItems?.length  || uniqueId('sub_'),
                    itemIndex:parentData?.subItems?.length +1 || 0,
                }]
            }

            const newMenuData = [
                ...props.widgetData.menuItems.slice(0, findParentIndex),
                updatedParentData,
                ...props.widgetData.menuItems.slice(findParentIndex + 1),
            ]

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
            <MenuWidgetModelFieldsPreview key={uniqueId('id_')}
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
            <MenuWidgetModelFieldsStyledDiv>
                <MenuWidgetEditForm
                    onChangeHandler={onChangeHandler}
                    onSubmitHandler={onAddHandler}
                    onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                    data={formData}
                    setData={setFormData}
                    state={state}
                    parentsOption={props.widgetData.menuItems || []}
                    activeEditingLanguage={props.widgetSettings.activeEditingLanguage}
                    onDeleteHandler={()=>null}
                    mode='Add'
                />

                <div className='menu-items'>
                    {renderCurrentItems}
                </div>
            </MenuWidgetModelFieldsStyledDiv>
        );
    } else return null

};
export default MenuWidgetModelFields;

