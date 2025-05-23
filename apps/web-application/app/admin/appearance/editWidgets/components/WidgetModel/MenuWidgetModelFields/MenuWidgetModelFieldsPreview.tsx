// @ts-nocheck
'use client'
import React, {FC, useEffect, useState} from 'react';
import MenuWidgetEditForm from "./MenuWidgetEditForm";
import EditSubMenuForm from "./subMenuComponenets/EditSubMenuForm";
import './MenuWidgetModelFieldsPreview.scss'


interface IProps{
    data:any,
    widgetData:any
    activeEditingLanguage:string
    setWidgetData:any
    parentsOption:any
}

const MenuWidgetModelFieldsPreview:FC<IProps> = props => {

    const [state, setState] = useState({
        open: false,
        activeEditingLanguage: 'default'
    });

    const [itemData, setItemData] = useState({
        name: '',
        target: '',
        as: '',
        type: '',
        itemIndex: 0,
        translations: {}
    });

    useEffect(() => {
        setItemData({
            ...itemData,
            ...props.data
        })
    }, [props.data]);

    const onEditHandler = e => {
        e.preventDefault()
        const findItemIndex = props.widgetData.menuItems.findIndex(i => i.itemId === itemData.itemId)
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

    const onIndexChangeHandler = action => {
        const newDataToSet = {
            ...itemData,
            itemIndex: action ? parseInt(itemData.itemIndex) + 1 : parseInt(itemData.itemIndex) - 1,
            itemId: itemData.itemId
        }
        const findItemIndex = props.widgetData.menuItems.findIndex(i => i.itemId ? i.itemId === newDataToSet.itemId : i.name === newDataToSet.name)
        const newData = [
            ...props.widgetData.menuItems.slice(0, findItemIndex),
            newDataToSet,
            ...props.widgetData.menuItems.slice(findItemIndex + 1),
        ]
        props.setWidgetData({
            ...props.widgetData,
            menuItems: newData
        })
    }

    const onChangeHandlerWithTranslate = e => {
        props.activeEditingLanguage === 'default' ?
            setItemData({
                ...itemData,
                [e.target.name]: e.target.value
            }) : setItemData({
                ...itemData,
                translations: {
                    ...itemData.translations,
                    [props.activeEditingLanguage]: {
                        ...itemData.translations?.[props.activeEditingLanguage] ?? {},
                        [e.target.name]: e.target.value
                    }
                }
            })

    }

    const onChangeHandler = e => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        })
    }

    const onDeleteHandler = itemId => {
        const newMenuData = props.widgetData.menuItems.filter(i => i.itemId !== itemId)
        props.setWidgetData({
            ...props.widgetData,
            menuItems: newMenuData
        })
    }
    const onDeleteSubItemsHandler = subId => {
        const newMenuData = props.widgetData.menuItems.filter(i => i.itemId !== subId)
        // props.setWidgetData({
        //     ...props.widgetData,
        //     menuItems: newMenuData
        // })
    }


    // const renderSubMenus = (itemData?.subItems || []).map(subItem=>{
    //     return(
    //         <MenuWidgetSubMenuModelFieldsPreview
    //             key={_.uniqueId('MenuWidgetSubMenuModelFieldsPreview_')}
    //             data={subItem}
    //             activeEditingLanguage={props.activeEditingLanguage}
    //             parentsOption={props.parentsOption}
    //             //onEditHandler={onEditHandler}
    //             parentData={itemData}
    //             setParentData={setItemData}
    //             onDeleteHandler={onDeleteSubItemsHandler}
    //         />
    //     )
    // })
    const renderSubMenus = (itemData?.subItems || []).map(subItem => {
        return (
            <EditSubMenuForm
                key={`${itemData.name}${itemData.itemId}${itemData.itemIndex}`}
                parentId={itemData.itemId}
                data={subItem}
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onEditHandler}
                onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                onDeleteHandler={props.onDeleteHandler}
                widgetData={props.widgetData}
                setWidgetData={props.setWidgetData}
                activeEditingLanguage={props.activeEditingLanguage}
                parentsOption={props.parentsOption}
                state={state}
                mode='Edit'
            />
        )
    })


    const onOpenHandler = () => {
        state.open ?
            setState({...state, open: false}) :
            setState({...state, open: true})
    }
    return (
        <div className='MenuWidgetModelFieldsPreview' key={props?.data?.itemId?.toString() + props.data.name ?? props.data.name}>
            <div className='menu-item-header'>
                <div className='menu-item-header-index-controller'>
                    <p>index: {itemData.itemIndex}</p>
                    <button onClick={() => onIndexChangeHandler(false)}>-</button>
                    <button onClick={() => onIndexChangeHandler(true)}>+</button>
                </div>

                {/*<p>name: {itemData.parent ? props.widgetData.menuItems.find(i => i.name === itemData.parent).name + ' > ' + itemData.name : itemData.name} </p>*/}
                <p>name: {itemData?.translations[props.activeEditingLanguage]?.name || itemData.name} </p>
                <p>ID: {itemData.itemId}</p>

                <button onClick={onOpenHandler}>
                    {state.open ? 'close' : 'open'}
                </button>

            </div>

            {state.open ?
                <>
                    <MenuWidgetEditForm
                        onChangeHandler={onChangeHandler}
                        onSubmitHandler={onEditHandler}
                        onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                        data={itemData}
                        setData={setItemData}
                        state={state}
                        parentsOption={props.parentsOption}
                        activeEditingLanguage={props.activeEditingLanguage}
                        onDeleteHandler={onDeleteHandler}
                        mode='Edit'
                    />
                    {renderSubMenus}
                </>
                : null}


        </div>
    );
};
export default MenuWidgetModelFieldsPreview;


// {state.open ?
//     <form  className='menu-item-form' onSubmit={e => onEditHandler(e)}>
//
//         <div className='menu-form-field'>
//             <p>Translations:</p>
//             <select name='activeEditingLanguage' onChange={e => setState({...state, activeEditingLanguage: e.target.value})}>
//                 <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'default'}</option>
//                 {languagesOptions}
//             </select>
//         </div>
//         <div className='menu-form-field'>
//             <p>Name:</p>
//             <input type="text" name='name' onChange={e => onChangeHandlerWithTranslate(e)}
//                    value={state.activeEditingLanguage === 'default' ? itemData.name : itemData.translations?.[state.activeEditingLanguage]?.name || ''}
//             />
//         </div>
//         <div className='menu-form-field'>
//             <p>Target:</p>
//             <input type="text" name='target' value={itemData.target} onChange={e => onChangeHandler(e)}/>
//         </div>
//         <div className='menu-form-field'>
//             <p>As:</p>
//             <input type="text" name='as' value={itemData.as} onChange={e => onChangeHandler(e)}/>
//         </div>
//         <div className='menu-form-field'>
//             <p>Item Index:</p>
//             <input type="number" name='itemIndex' value={itemData.itemIndex} onChange={e => onChangeHandler(e)}/>
//         </div>
//         <div className='menu-form-field'>
//             <p>Type:</p>
//             <select required={true} name='type' value={itemData.type} onChange={e => onChangeHandler(e)}>
//                 <option>Select</option>
//                 <option value='internal'>Internal</option>
//                 <option value='external'>External</option>
//             </select>
//         </div>
//         <div className='menu-form-field'>
//             <button type='submit'>Edit</button>
//             <button onClick={() => onDeleteHandler(itemData.name, itemData.itemId)}>delete</button>
//         </div>
//
//     </form>
//     : null}