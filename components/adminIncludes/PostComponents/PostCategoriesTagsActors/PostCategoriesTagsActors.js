import React, { useEffect, useRef } from 'react';
import { AppContext } from "../../../../context/AppContext";
import FA from "react-fontawesome";

const PostCategoriesTagsActors = props => {
    let newItemsElement = useRef(null);
    useEffect(() => {
        console.log(props)
    }, [ props ]);

    const deleteItem = (e) => {
        const deletedItemFromType = props.postData[props.type].filter(i => {
            return i !== e.currentTarget.name
        })
        props.onPostMetaChangeHandler(props.type, deletedItemFromType)
    };

    const addNewItem = e => {
        e.preventDefault()
        if (newItemsElement.current.value.includes(',')) {
            let newItems = newItemsElement.current.value.split(',');
            const addedItemFromType = [ ...props.postData[props.type], ...newItems.map(item=>item.trim()) ]
            props.onPostMetaChangeHandler(props.type, addedItemFromType)
        } else {
            const addedItemFromType = [ ...props.postData[props.type], newItemsElement.current.value.trim() ]
            props.onPostMetaChangeHandler(props.type, addedItemFromType)
        }
    };

    const addedItems = props.postData[props.type].map(item => {
        let icon = props.type === 'tags' ? 'tags'
            : props.type === 'actors' ? 'star'
                : props.type === 'categories' ? 'folder'
                    : '';
        return (
            <div key={ item } className='item'>
                <p>{ item }</p>

                <button name={ item } onClick={ (e) => deleteItem(e) }><FA className='fontawesomeMedium' name='times'/></button>
            </div>
        )
    });

    return (
        <div className='PostCategoriesTagsActors'>
            <form className="addNewTag" onSubmit={e => addNewItem(e)}>
                <input ref={ newItemsElement } type='text'/>
                <button className='addBtn' type='submit'> Add</button>
            </form>
            <span className='small-info'>Separate tags with commas</span>
            <div className="items">
                { addedItems }
            </div>
        </div>
    );
};
export default PostCategoriesTagsActors;