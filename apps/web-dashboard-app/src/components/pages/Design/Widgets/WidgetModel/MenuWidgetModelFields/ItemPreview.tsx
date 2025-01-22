import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import EditItemForm from "@components/pages/Design/Widgets/WidgetModel/MenuWidgetModelFields/EditItemForm";
import {IMenuItem, WidgetData} from "@repo/typescript-types";
import {inputValueSimplifier} from "@repo/utils";

const Styles = styled.div`
  background-color: rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  margin: 2px 0;
  .menu-item-header {
    display: flex;
    gap: 2px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    button{
      background-color: var(--secondary-background-color,#181818);
      color: var(--secondary-text-color,#ccc);
      border: none;
    }
    .menu-item-header-index-controller {
      display: flex;
      justify-content: center;
      align-items: center;
      button {

       
        font-size: large;
        width: 30px;
        height: 30px;
        padding: 0;
        &:hover{
          border: 1px solid black;
          box-shadow: 2px 5px black;
        }
        &:active{
          box-shadow: 1px 2px black;
          border-top: none;
          border-left: none;
        }
      }
    }
  }
`

interface IProps{
    data:any,
    widgetData:WidgetData
    activeEditingLanguage:string
    setWidgetData:any
    parentsOption:any
}

const ItemPreview:FC<IProps> = 
    ({
         data,
         widgetData,
         activeEditingLanguage,
         setWidgetData,
         parentsOption
        
     }) => {

    const [state, setState] = useState({
        open: false,
        activeEditingLanguage: 'default'
    });

    const [itemData, setItemData] = useState({
        name: '',
        target: '',
        type: '',
        itemIndex: 0,
        itemId: 0,
        parent: undefined,
        translations: {}
    });

    useEffect(() => {
        setItemData({
            ...itemData,
            ...data
        })
    }, [data]);

    const onEditHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const findItemIndex = widgetData.menuItems.findIndex((i:IMenuItem) => i.itemId === itemData.itemId)
        const newData = [
            ...widgetData.menuItems.slice(0, findItemIndex),
            itemData,
            ...widgetData.menuItems.slice(findItemIndex + 1),
        ]
        setWidgetData({
            ...widgetData,
            menuItems: newData
        })
    }

    const onIndexChangeHandler = (action:boolean) => {
        const newDataToSet = {
            ...itemData,
            itemIndex: action ? itemData.itemIndex + 1 : itemData.itemIndex - 1,
            itemId: itemData.itemId ?? Math.floor(Math.random() * 1000)
        }
        const findItemIndex = widgetData.menuItems.findIndex(
            (i:IMenuItem) => i.itemId ? i.itemId === newDataToSet.itemId : i.name === newDataToSet.name
        )
        const newData = [
            ...widgetData.menuItems.slice(0, findItemIndex),
            newDataToSet,
            ...widgetData.menuItems.slice(findItemIndex + 1),
        ]
        setWidgetData({
            ...widgetData,
            menuItems: newData
        })
    }

    const onChangeHandlerWithTranslate = (e:React.ChangeEvent<HTMLInputElement>) => {
        activeEditingLanguage === 'default' ?
            setItemData({
                ...itemData,
                [e.target.name]: e.target.value
            }) : setItemData({
                ...itemData,
                translations: {
                    ...(itemData?.translations || {}),
                    [activeEditingLanguage]: {
                        //@ts-ignore
                        ...(itemData?.translations?.[activeEditingLanguage] || {}),
                        [e.target.name]: e.target.value
                    }
                }
            })

    }

    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = inputValueSimplifier(e)
        setItemData({
            ...itemData,
            [e.target.name]:value
        })
    }

    const onDeleteHandler = (itemId:number) => {
        const newMenuData = widgetData.menuItems.filter((i:IMenuItem) => i.itemId !== itemId)
        setWidgetData({
            ...widgetData,
            menuItems: newMenuData
        })
    }



    const onOpenHandler = () => {
        state.open ?
            setState({...state, open: false}) :
            setState({...state, open: true})
    }

    return (
        <Styles className='menu-item' key={data?.itemId?.toString() + data.name ?? data.name}>
            <div className='menu-item-header'>
                <div className='menu-item-header-index-controller'>
                    <p>index: {itemData.itemIndex}</p>
                    <button onClick={() => onIndexChangeHandler(false)}>-</button>
                    <button onClick={() => onIndexChangeHandler(true)}>+</button>
                </div>

                {/*<p>name: {itemData.parent ? widgetData.menuItems.find(i => i.name === itemData.parent).name + ' > ' + itemData.name : itemData.name} </p>*/}
                {/*//@ts-ignore*/}
                <p>name: {itemData?.translations?.[activeEditingLanguage]?.name || itemData.name} </p>
                <p>ID: {itemData.itemId}</p>

                <button onClick={onOpenHandler}>
                    {state.open ? 'close' : 'open'}
                </button>

            </div>

            {state.open ?
                <>
                    <EditItemForm
                        onChangeHandler={onChangeHandler}
                        onSubmitHandler={onEditHandler}
                        onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                        data={itemData}
                        // setData={setItemData}
                        state={state}
                        parentsOption={parentsOption}
                        activeEditingLanguage={activeEditingLanguage}
                        onDeleteHandler={onDeleteHandler}
                        mode='Edit'
                    />

                </>
                : null}


        </Styles>
    );
};
export default ItemPreview;

// {/*{renderSubMenus}*/}

// const onDeleteSubItemsHandler = subId => {
//     const newMenuData = widgetData.menuItems.filter((i:IMenuItem) => i.itemId !== subId)
//     // setWidgetData({
//     //     ...widgetData,
//     //     menuItems: newMenuData
//     // })
// }
//

// const renderSubMenus = (itemData?.subItems || []).map(subItem=>{
//     return(
//         <MenuWidgetSubMenuModelFieldsPreview
//             key={_.uniqueId('MenuWidgetSubMenuModelFieldsPreview_')}
//             data={subItem}
//             activeEditingLanguage={activeEditingLanguage}
//             parentsOption={parentsOption}
//             //onEditHandler={onEditHandler}
//             parentData={itemData}
//             setParentData={setItemData}
//             onDeleteHandler={onDeleteSubItemsHandler}
//         />
//     )
// })
// const renderSubMenus = (itemData?.subItems || []).map(subItem => {
//     return (
//         <EditSubMenuForm
//             key={`${itemData.name}${itemData.itemId}${itemData.itemIndex}`}
//             parentId={itemData.itemId}
//             data={subItem}
//             onChangeHandler={onChangeHandler}
//             onSubmitHandler={onEditHandler}
//             onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
//             onDeleteHandler={onDeleteHandler}
//             widgetData={widgetData}
//             setWidgetData={setWidgetData}
//             activeEditingLanguage={activeEditingLanguage}
//             parentsOption={parentsOption}
//             state={state}
//             mode='Edit'
//         />
//     )
// })