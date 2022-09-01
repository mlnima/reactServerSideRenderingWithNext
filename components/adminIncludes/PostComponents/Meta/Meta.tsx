import React, {FC, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useSelector} from "react-redux";
import {adminEditPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
// import {uniqBy} from "lodash";
import {_uniqBy} from "@_variables/util/arrayUtils/_uniqBy";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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
interface MetaPropType{
    type:string
}

const Meta:FC<MetaPropType> = props => {
    let newItemsElement = useRef(null);
    const post = useSelector((store:Store) => store?.adminPanelPosts.post);
    const dispatch = useAdminDispatch()


    const deleteItem = (e) => {
        dispatch(adminEditPost({[props.type]: post?.[props.type].filter(item=>item.name !== e.currentTarget.name)}))


        // props.onDeleteHandler(props.type, e.currentTarget.name)
    };

    const addNewItem = e => {
        e.preventDefault()
        const metasToAdd = newItemsElement.current.value.includes(',') ?
                           newItemsElement.current.value.split(',') :
                           [newItemsElement.current.value]
        const newItemsToSchemaForm = metasToAdd.map(newItem => {
            const newItemData = {
                name: newItem.trim().toLowerCase(),
                type: props.type
            }
            return newItemData
        })

        const previousMetaData = post?.[props.type] || [];
        // const uniqItems = uniqBy([...previousMetaData, ...newItemsToSchemaForm], (e) => {
        //     return e.name;
        // })
        const uniqItems = _uniqBy([...previousMetaData, ...newItemsToSchemaForm],'name')

        dispatch(adminEditPost({
            [props.type]: uniqItems
        }))

        // props.onPostMetaChangeHandler(props.type, newItemsToSchemaForm)
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