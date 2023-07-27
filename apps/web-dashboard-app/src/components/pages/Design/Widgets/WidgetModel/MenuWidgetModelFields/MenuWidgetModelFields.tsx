import React, {FC, useState} from 'react';
import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";
import {uniqueId} from "lodash";
import MenuWidgetEditForm from "./MenuWidgetEditForm";
import styled from "styled-components";
import {WidgetData,IMenuItem} from "typescript-types";

const MenuWidgetModelFieldsStyledDiv = styled.div`
  .mobileNavigationLabel {
    padding: 0 25px;
  }
`

interface IProps{
    widgetSettings:{
        activeEditingLanguage:string
    },
    widgetData:WidgetData,
    setWidgetData:Function,

}

const MenuWidgetModelFields:FC<IProps> = ({widgetSettings,setWidgetData,widgetData}) => {
    const [formData, setFormData] = useState<IMenuItem>({
        name: '',
        target: '',
        as: '',
        parent:null,
        type: 'internal',
        itemIndex: 0,
        itemId: 0,
        subItems:[],
        translations: {},
    });

    const [state, setState] = useState({
        activeEditingLanguage: 'default'
    })

    const onChangeHandlerWithTranslate = (event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if (widgetSettings.activeEditingLanguage === 'default'){
            setFormData((prevFormData:IMenuItem)=>({
                ...prevFormData,
                [event.target.name]: event.target.value
            }))
        }else {
            setFormData((prevFormData:IMenuItem)=>({
                ...formData,
                translations: {
                    ...formData.translations,
                    [widgetSettings.activeEditingLanguage]: {
                        ...prevFormData.translations?.[widgetSettings?.activeEditingLanguage] ?? {},
                        [event.target.name]: event.target.value
                    }
                }
            }))
        }
    }

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setFormData((prevFormData)=>({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
    }


    const onAddHandler = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formData.parent) {
            setWidgetData((prevState:WidgetData)=>({
                ...prevState,
                menuItems: [
                    prevState?.menuItems || [],
                    {
                        ...formData,
                        itemIndex: formData.itemIndex ? formData.itemIndex : (widgetData?.menuItems?.length || 0),
                        itemId: uniqueId('id_') + prevState?.menuItems?.length || uniqueId('id_')
                    }
                ]
            }))
        } else {

            const findParentIndex = widgetData?.menuItems.findIndex((menuItem:IMenuItem) => menuItem.itemId === formData.parent)
            const parentData = widgetData?.menuItems.find((menuItem:IMenuItem) => menuItem.itemId === formData.parent)
            const updatedParentData = {
                ...(parentData || {}),
                //@ts-ignore
                subItems: [...((widgetData?.menuItems?.[findParentIndex] || {})?.subItems || []), {
                    ...formData,

                    itemId: uniqueId('sub_') + widgetData?.menuItems?.length || uniqueId('sub_'),
                    //@ts-ignore
                    itemIndex: parentData?.subItems?.length + 1 || 0,
                }]
            }

            const newMenuData = [
                ...widgetData.menuItems.slice(0, findParentIndex),
                updatedParentData,
                ...widgetData.menuItems.slice(findParentIndex + 1),
            ]

            setWidgetData({
                ...widgetData,
                menuItems: newMenuData
            })


        }

    }

    // const onMenuStyleChangeHandler = e => {
    //     setWidgetData({
    //         ...widgetData,
    //         mobileNavigation: e.target.value
    //     })
    // }

    const renderCurrentItems = ([...widgetData?.menuItems] || [])?.sort((a:IMenuItem, b:IMenuItem) => a.itemIndex > b.itemIndex ? 1 : -1).map(menuItem => {
        return (
            <MenuWidgetModelFieldsPreview key={uniqueId('id_')}
                                          data={menuItem}
                                          widgetData={widgetData}
                                          setWidgetData={setWidgetData}
                                          activeEditingLanguage={widgetSettings.activeEditingLanguage}
                                          parentsOption={widgetData.menuItems || []}
                                          state={state}
            />
        )
    })

    return (
        <MenuWidgetModelFieldsStyledDiv>
            <MenuWidgetEditForm
                setFormData={setFormData}
                onSubmitHandler={onAddHandler}
                onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                data={formData}
                state={state}
                parentsOption={widgetData.menuItems || []}
                activeEditingLanguage={widgetSettings.activeEditingLanguage}
                onDeleteHandler={() => null}
                mode='Add'
            />

            <div className='menu-items'>
                {renderCurrentItems}
            </div>
        </MenuWidgetModelFieldsStyledDiv>
    );

};
export default MenuWidgetModelFields;
