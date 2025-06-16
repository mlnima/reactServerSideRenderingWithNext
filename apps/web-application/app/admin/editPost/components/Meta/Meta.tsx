'use client';

import React, { FC, SyntheticEvent, useRef } from 'react';
import { uniqArrayBy } from '@repo/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { IMeta, IPost } from '@repo/typescript-types';
import './Meta.scss'

interface PropType {
  type: 'categories' | 'tags' | 'actors';
  post: IPost;
  setPost: React.Dispatch<React.SetStateAction<IPost | null>>;
}

const Meta: FC<PropType> = ({ post, type, setPost }) => {
  let newItemsElement = useRef(null);

  const deleteItem = (e : any) => {
    if (post?.[type]) {
      setPost((prevState) => ({
        ...prevState,
        // @ts-expect-error: it's fine
        [type]: post[type].filter((item: IMeta) => item.name !== e.currentTarget.name),
      }));
    }
  };

  const addNewItem = (e:any) => {
    e.preventDefault();
    if (!newItemsElement.current) return;
    // @ts-expect-error: it's fine
    const metasToAdd = newItemsElement.current.value.includes(',') ? newItemsElement.current.value.split(',') : [newItemsElement.current.value];
    const newItemsToSchemaForm = metasToAdd.map((newItem: string) => {
      return {
        name: newItem.trim().toLowerCase(),
        type: type,
      };
    });
    const previousMetaData = post?.[type] || [];
    const uniqItems = uniqArrayBy([...previousMetaData, ...newItemsToSchemaForm], 'name');

    setPost((prevState) => ({
      ...prevState,
      [type]: uniqItems,
    }));

    setTimeout(() => {
      if (newItemsElement?.current) {
        // @ts-expect-error: it's fine
        newItemsElement.current.value = '';
      }


    }, 100);
  };

  const addedItems = (post?.[type] || []).map((item, index) => {
    return (
      <button key={index} name={item?.name} onClick={(e) => deleteItem(e)} className="btn btn-danger">
        {item?.name}
        <FontAwesomeIcon icon={faXmark} className={'meta-icon'} />
      </button>
    );
  });

  return (
    <div className="postMetaEditor">
      <form className="add-new-meta" onSubmit={e => addNewItem(e)}>
        <input className={'primaryInput'} ref={newItemsElement} type="text" />
        <button className={'btn btn-success'} type="submit">
          <FontAwesomeIcon icon={faPlus} className={'add-new-meta-icon'} />
        </button>
      </form>
      <span className="small-info">Separate tags with commas</span>
      <div className="items">
        {addedItems}
      </div>
    </div>
  );
};

export default Meta;

// // @ts-nocheck
// import React, {FC, useRef} from 'react';
// import styled from "styled-components";
// import { useSelector} from "react-redux";
// import { editPostAction} from "@store/reducers/postsReducer";
// import {uniqArrayBy} from "@repo/utils";
// import {DashboardStore, Store} from "@repo/typescript-types";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {useAppDispatch} from "@store/hooks";


// import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
// import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
//
// const MetaStyledDiv = styled.div`
//     width: 100%;
//   .add-new-meta {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     button{
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }
//   }
//   .small-info {
//     font-size: var(--font-sizes-s);
//   }
//   .items {
//     display: flex;
//     flex-wrap: wrap;
//     .btn-danger{
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       padding: .2rem;
//       margin: 3px;
//       svg{
//         margin-left:  10px;
//       }
//     }
//   }
// `
// interface PropType{
//     type:string
// }
//
// const Meta:FC<PropType> = props => {
//     let newItemsElement = useRef(null);
//     const post = useSelector(({posts}:DashboardStore) => posts.post);
//     const dispatch = useAppDispatch()
//
//
//     const deleteItem = (e) => {
//         //@ts-ignore
//         dispatch(editPostAction({[type]: post?.[type].filter(item=>item.name !== e.currentTarget.name)}))
//
//
//         // onDeleteHandler(type, e.currentTarget.name)
//     };
//
//     const addNewItem = e => {
//         e.preventDefault()
//         const metasToAdd = newItemsElement.current.value.includes(',') ?
//                            newItemsElement.current.value.split(',') :
//                            [newItemsElement.current.value]
//         const newItemsToSchemaForm = metasToAdd.map((newItem) => {
//             const newItemData = {
//                 name: newItem.trim().toLowerCase(),
//                 type: type
//             }
//             return newItemData
//         })
//
//         const previousMetaData = post?.[type] || [];
//         // const uniqItems = uniqBy([...previousMetaData, ...newItemsToSchemaForm], (e) => {
//         //     return e.name;
//         // })
//         const uniqItems = uniqArrayBy([...previousMetaData, ...newItemsToSchemaForm],'name')
//
//         dispatch(editPostAction({
//             [type]: uniqItems
//         }))
//
//         // onPostMetaChangeHandler(type, newItemsToSchemaForm)
//         setTimeout(() => {
//             newItemsElement.current.value = ''
//         }, 100)
//     };
//
//     const addedItems = (post?.[type] || []).map((item,index )=> {
//         return (
//             <button key={index} name={item?.name} onClick={(e) => deleteItem(e)} className='btn btn-danger'>
//                 {item?.name}
//                 <FontAwesomeIcon icon={faXmark} className={'meta-icon'}/>
//             </button>
//         )
//     });
//
//
//     return (
//         <MetaStyledDiv className='post-meta-editor'>
//             <form className="add-new-meta" onSubmit={e => addNewItem(e)}>
//                 <input className={'primaryInput'} ref={newItemsElement} type='text'/>
//                 <button className={'btn btn-success'} type='submit'>
//                     <FontAwesomeIcon icon={faPlus} className={'add-new-meta-icon'}/>
//                 </button>
//             </form>
//             <span className='small-info'>Separate tags with commas</span>
//             <div className="items">
//                 {addedItems}
//             </div>
//         </MetaStyledDiv>
//     );
//
//
// };
// export default Meta;