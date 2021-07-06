import {useState,useEffect} from "react";
import _ from "lodash";

const EditSubMenuForm = props => {

    const [state, setState] = useState({});
    const [subItemData, setSubItemData] = useState({
        name: '',
        target: '',
        as: '',
        type: '',
        itemIndex: 0,
        translations: {}
    });

    useEffect(() => {
        setSubItemData({
            ...subItemData,
            ...props.data
        })
    }, []);



    const onChangeHandler = e => {
        setSubItemData({
            ...subItemData,
            [e.target.name]: e.target.value
        })
    }

    const onChangeHandlerWithTranslate = e => {
        props.activeEditingLanguage === 'default' ?
            setSubItemData({
                ...subItemData,
                [e.target.name]: e.target.value
            }) : setSubItemData({
                ...subItemData,
                translations: {
                    ...subItemData.translations,
                    [props.activeEditingLanguage]: {
                        ...subItemData.translations?.[props.activeEditingLanguage] ?? {},
                        [e.target.name]: e.target.value
                    }
                }
            })
    }

    const onEditHandler = e =>{
        e.preventDefault()
        const parentData = props.widgetData.menuItems.find(i=>i.itemId===props.parentId)
        const findParentIndex =  (props.widgetData.menuItems || []).findIndex(i=>i.itemId === parentData.itemId)
        const findSubItemIndex = parentData?.subItems.findIndex(i=>i.itemId===subItemData.itemId)

        const newParentData = {
            ...parentData,
            subItems : [
                ...(parentData.subItems ||[]).slice(0, findSubItemIndex),
                subItemData,
                ...(parentData.subItems ||[]).slice(findSubItemIndex + 1),
            ]
        }

        const newData = [
            ...props.widgetData.menuItems.slice(0, findParentIndex),
            newParentData,
            ...props.widgetData.menuItems.slice(findParentIndex + 1),
        ]

        props.setWidgetData({
            ...props.widgetData,
            menuItems: newData
        })

    }


    const onDeleteHandler = e=>{

        e.preventDefault()
        const parentData = props.widgetData.menuItems.find(i=>i.itemId===props.parentId)
        const findParentIndex =  (props.widgetData.menuItems || []).findIndex(i=>i.itemId === parentData.itemId)
        const findSubItemIndex = parentData?.subItems.findIndex(i=>i.itemId===subItemData.itemId)

        const newParentData = {
            ...parentData,
            subItems : (parentData.subItems ||[]).filter(i=>i.itemId!==subItemData.itemId)
        }

        const newData = [
            ...props.widgetData.menuItems.slice(0, findParentIndex),
            newParentData,
            ...props.widgetData.menuItems.slice(findParentIndex + 1),
        ]

        props.setWidgetData({
            ...props.widgetData,
            menuItems: newData
        })

        console.log(parentData)
        console.log(newParentData)
    }

    return (
        <form className='menu-widget-form' onSubmit={e => onEditHandler(e)}>

            <style jsx>{`
            .formId{
                font-size: small;
            }
            .menu-widget-form{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: auto;
                width: 90%;
                background-color: black;
                padding: 5px;
            }
            .menu-widget-form-form-field{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between ;
            }
        `}</style>
            <label className='formId'> ID : {props.data.itemId}</label>
            {/*<div className='menu-widget-form-form-field'>*/}
            {/*    <p>Parent:</p>*/}
            {/*    <select name='parent' value={props.data.parent} onChange={e => onChangeHandler(e)}>*/}
            {/*        <option>select</option>*/}
            {/*        /!*{renderItemsForParent}*!/*/}
            {/*    </select>*/}
            {/*</div>*/}

            <div className='menu-widget-form-form-field'>
                <p>Name:</p>
                <input required={props.mode !== 'Edit'} type="text" name='name' onChange={e => onChangeHandlerWithTranslate(e)}
                       value={props.activeEditingLanguage === 'default' ? subItemData.name : subItemData.translations?.[props.activeEditingLanguage]?.name || ''}
                />
            </div>

            <div className='menu-widget-form-form-field'>
                <p>Target:</p>
                <input required={props.mode !== 'Edit'} type="text" name='target' value={subItemData.target || ''} onChange={e => onChangeHandler(e)}/>
            </div>

            <div className='menu-widget-form-form-field'>
                <p>As:</p>
                <input type="text" name='as' value={subItemData.as || ''} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Item Index:</p>
                <input required={props.mode !== 'Edit'} type='number' name='itemIndex' value={subItemData.itemIndex || ''} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Type:</p>
                <select required={props.mode !== 'Edit'} name='type' onChange={e => onChangeHandler(e)} value={subItemData.type}>
                    <option>Select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
            </div>

            <div className='menu-widget-form-form-field'>
                <button type='submit'>Edit</button>
                <button onClick={e=>onDeleteHandler(e)}>Delete</button>
            </div>

        </form>
    );
};
export default EditSubMenuForm;
