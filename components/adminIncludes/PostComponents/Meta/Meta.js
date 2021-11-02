import React, {useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {useSelector} from "react-redux";
const MetaStyledDiv = styled.div`
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
    .btn-danger{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .2rem;
      margin: 3px;
      svg{
        margin-left:  10px;
      }
    }
  }
`

const Meta = props => {
    let newItemsElement = useRef(null);
    const post = useSelector((store) => store?.adminPanelPosts.post);

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
        }, 100)
    };

    const addedItems = (post?.[props.type] || []).map((item,index )=> {
        return (
            <button key={index} name={item?.name} onClick={(e) => deleteItem(e)} className='btn btn-danger'>
                {item?.name}
                <FontAwesomeIcon style={{width: '16px', height: '16px'}} icon={faTimes} />
            </button>
        )
    });


    return (
        <MetaStyledDiv className='post-meta-editor'>
            <form className="add-new-meta" onSubmit={e => addNewItem(e)}>
                <input className={'form-control-input'} ref={newItemsElement} type='text'/>
                <button className={'btn btn-success'} type='submit'><FontAwesomeIcon style={{width: '16px', height: '16px'}} icon={faPlus} className='post-element-info-logo'/></button>
            </form>
            <span className='small-info'>Separate tags with commas</span>
            <div className="items">
                {addedItems}
            </div>
        </MetaStyledDiv>
    );


};
export default Meta;