import React, {useEffect, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";


const Meta = props => {
    let newItemsElement = useRef(null);
    const deleteItem = (e) => {
        props.onDeleteHandler(props.type,e.currentTarget.name)
    };

    //
    // useEffect(() => {
    //     console.log(props)
    // }, []);

    const addNewItem = e => {
        e.preventDefault()
        if (newItemsElement.current.value.includes(',')) {
            let newItems = newItemsElement.current.value.split(',');
            const newItemsToSchemaForm = newItems.map(newItem => {
                const newItemData = {
                    name: newItem.trim(),
                    type: props.type
                }
                return newItemData
            })

            const addedItemFromType = [...newItemsToSchemaForm]
            props.onPostMetaChangeHandler(props.type, addedItemFromType)
        } else if (newItemsElement.current.value) {
            const newItemData = {
                name: newItemsElement.current.value.trim(),
                type: props.type
            }

            const addedItemFromType = [newItemData]
            props.onPostMetaChangeHandler(props.type, addedItemFromType)
        }

    };

    const addedItems = props.postData[props.type].map(item => {
        return (
            <div key={item.name + Date.now()} className='item'>
                <p>{item.name}</p>
                <button name={item.name} onClick={(e) => deleteItem(e)}><FontAwesomeIcon icon={faTimes} className='post-element-info-logo'/>
                </button>
            </div>
        )
    });


    if (props.postData.postType !== 'video' && props.type === 'actors') {
        return null
    } else {
        return (
            <div className='PostCategoriesTagsActors'>
                <form className="addNewTag" onSubmit={e => addNewItem(e)}>
                    <input ref={newItemsElement} type='text'/>
                    <button className='addBtn' type='submit'> <FontAwesomeIcon icon={faPlus} className='post-element-info-logo'/></button>
                </form>
                <span className='small-info'>Separate tags with commas</span>
                <div className="items">
                    {addedItems}
                </div>
            </div>
        );
    }


};
export default Meta;