import React, {useEffect, useRef, useState} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";


const Meta = props => {
    let newItemsElement = useRef(null);
    const [metas, setMetas] = useState([])


    useEffect(() => {
        if (props?.postData?.[props.type]){
            setMetas(props?.postData?.[props.type])
        }
    }, [props]);

    const deleteItem = (e) => {
        props.onDeleteHandler(props.type, e.currentTarget.name)
    };

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
        setTimeout(() => {
            newItemsElement.current.value = ''
        }, 500)

    };

    const addedItems = metas.map(item => {
        return (
            <div key={item?.name + Date.now()} className='item'>
                <style jsx>{`
                  .item {
                    display: flex;
                    align-items: center;
                    margin: 1px 3px;
                    font-size: x-small;
                    padding: 0 5px;
                    border-radius: 5px;

                    button {
                      outline: none;
                      border: none;
                      margin: 0 3px;
                      width: 16px;
                      height: 16px;

                      span {
                        color: #0073aa;
                      }

                      &:hover {
                        color: white;
                        background-color: red;
                        margin: 0 2px;
                      }
                    }

                  }
                `}</style>
                <p>{item?.name}</p>
                <button name={item?.name} onClick={(e) => deleteItem(e)}><FontAwesomeIcon style={{width: '16px', height: '16px'}} icon={faTimes} className='post-element-info-logo'/>
                </button>
            </div>
        )
    });


    if (props.postData.postType !== 'video' && props.type === 'actors') {
        return null
    } else {
        return (
            <div className='post-meta-editor'>
                <style jsx>{`
                  .post-meta-editor {
                    .add-new-meta {
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;

                    }

                    .small-info {
                      font-size: 12px;
                    }

                    .items {
                      display: flex;
                      flex-wrap: wrap;
                    }
                  }
                `}</style>
                <form className="add-new-meta" onSubmit={e => addNewItem(e)}>
                    <input ref={newItemsElement} type='text'/>
                    <button className='add-meta-button' type='submit'><FontAwesomeIcon style={{width: '16px', height: '16px'}} icon={faPlus} className='post-element-info-logo'/></button>
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