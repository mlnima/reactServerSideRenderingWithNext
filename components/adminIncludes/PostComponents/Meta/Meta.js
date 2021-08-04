import React, {useEffect, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
let StyledDiv = styled.div`
 .addNewTag{
    .addBtn{
      margin: 5px 0;
      &:hover{
        transform: scale(1.1);
        transition: .5s;
      }
    }
  }


  .items{
    display:flex;
    flex-wrap: wrap;
    .item{
      display:flex;
      align-items: center;
      margin: 1px 3px;
      font-size: x-small;
      padding: 0 5px;
      border-radius: 5px;
      button{
        outline: none;
        border: none;
        background-color: transparent;
        padding: 3px;
        margin: 0 3px;
        span{
          color: #0073aa;
        }
        &:hover{
          transform: scale(1.3);
          transition: .5s;
          color: white;
        }
      }

      &:hover{
        transform: scale(1.1);
        transition: .5s;
        background-color: red;
        color: black;
      }

    }
  }
`

const Meta = props => {
    let newItemsElement = useRef(null);
    const deleteItem = (e) => {
        props.onDeleteHandler(props.type,e.currentTarget.name)
    };

    //
    // useEffect(() => {

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
            <StyledDiv className='PostCategoriesTagsActors'>
                <form className="addNewTag" onSubmit={e => addNewItem(e)}>
                    <input ref={newItemsElement} type='text'/>
                    <button className='addBtn' type='submit'> <FontAwesomeIcon icon={faPlus} className='post-element-info-logo'/></button>
                </form>
                <span className='small-info'>Separate tags with commas</span>
                <div className="items">
                    {addedItems}
                </div>
            </StyledDiv>
        );
    }


};
export default Meta;