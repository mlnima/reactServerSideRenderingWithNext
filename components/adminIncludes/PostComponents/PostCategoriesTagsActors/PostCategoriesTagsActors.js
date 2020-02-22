import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from "../../../../context/AppContext";
import FA from "react-fontawesome";

const PostCategoriesTagsActors = props => {
    const contextData = useContext(AppContext);
    const [ items, setItems ] = useState([]);
    let newItemsElement = useRef(null);


    const deleteItem = (e) => {
        contextData.dispatchEditingPostData({
            ...contextData.editingPostData,
            [props.type]: contextData.editingPostData[props.type].filter(i=> {return i!== e.currentTarget.name}),
        })
    };

    const addNewItem = () => {
        console.log(newItemsElement.current.value.includes(',') )
        if (newItemsElement.current.value.includes(',')) {
            let newItems = newItemsElement.current.value.split(',');
            contextData.dispatchEditingPostData(editingPostData => ({
                ...editingPostData,
                [props.type]: [ ...contextData.editingPostData[props.type], ...newItems ]
            }))
        } else {
            // let newItems = contextData.editingPostData[props.type].push(newItemsElement.current.value);
            //     newItems = [...contextData.editingPostData[props.type],newItemsElement.current.value];
            // console.log( contextData.editingPostData[props.type],newItems)
                contextData.dispatchEditingPostData({
                    ...contextData.editingPostData,
                    [props.type]:  [...contextData.editingPostData[props.type],newItemsElement.current.value]
                })
        }
    };

    const addedItems = contextData.editingPostData[props.type].map(item => {
        let icon = props.type === 'tags' ? 'tags'
            : props.type === 'actors' ? 'star'
                : props.type === 'categories' ? 'folder'
                    : '';

        return (
            <div key={ item }  className='item'>
                <p>{ item }</p>

                <button name={ item } onClick={ (e) => deleteItem(e) } ><FA className='fontawesomeMedium' name='times'/></button>
            </div>
        )
    });

    return (
        <div className='PostCategoriesTagsActors'>
            <div className="addNewTag">
                <input ref={ newItemsElement } type='text'/>
                <button onClick={ () => addNewItem() }> Add</button>
            </div>
            <span>Separate tags with commas</span>
            <div className="items">
                { addedItems }
            </div>
        </div>
    );
};
export default PostCategoriesTagsActors;