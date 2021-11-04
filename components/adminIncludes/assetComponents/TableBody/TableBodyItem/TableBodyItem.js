import React, {useEffect, useState, useContext, useRef} from 'react';
import TableBodyItemSection from './TableBodyItemSection/TableBodyItemSection'
import TableBodyItemOnHover from './TableBodyItemOnHover/TableBodyItemOnHover'
import styled from "styled-components";

let StyledDiv = styled.div`
  .asset-page-table-body-item-content {
    padding: 10px;
    border: .2px solid rgba(0, 0, 0, .1);
    border-bottom: none;
    //display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    //grid-gap: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 12px;
    .asset-page-table-body-item-content-select{
      
    }
  }

  .asset-page-table-body-item-hover-item {
    font-size: 13px !important;
    display: flex;
    align-items: center;
    height: 35px;
    width: 300px;
    border: .2px solid rgba(0, 0, 0, .1);
    border-top: none;
    cursor: pointer;

    span, a {
      text-decoration: none;
      border: none;
      color: var(--admin-light-blue-color);
      width: 50px;
      height: 20px;
      font-size: 13px;
      background-color: transparent;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    button {
      cursor: pointer;
    }
  }

  &:nth-child(even) {
    background-color: #fff;
  }


`;


const TableBodyItem = props => {
    const [state, setState] = useState({
        properties: [],
        isHover: false
    });

    useEffect(() => {
        if (props.assetsType === 'posts') {
            let properties = ['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'users') {
            let properties = ['username', 'email', 'role', 'createdAt', 'updatedAt']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'comments') {
            let properties = ['author', 'body', 'onDocument', 'email', 'createdAt', 'updatedAt']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'metas') {
            let properties = ['name', 'description', 'type', 'count',  'ImageUrl', 'createdAt', 'updatedAt']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'forms') {
            let properties = ['formName', 'widgetId', 'createdAt', 'updatedAt']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'pages') {
            let properties = ['pageName', 'status', 'sidebar', 'createdAt', 'updatedAt']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'orders') {
            let properties = ['buyer', 'status', 'type', 'isPaid', 'createdAt', 'updatedAt']
            setState({
                ...state,
                properties,
            })
        }
    }, [props]);

    const onMouseEnterHandler = () => {
        setState({
            ...state,
            isHover: true
        })
    }

    const onMouseOutHandler = () => {
        setState({
            ...state,
            isHover: false
        })
    }

    const onSelectChangeHandler = e => {
        e.target.checked ?
            props.setSelectedItems([...props.selectedItems, props.data._id]) :
            props.setSelectedItems(props.selectedItems.filter(i => i !== props.data._id))
    }

    const renderProperties = state.properties.map(property => {
        return (
            <TableBodyItemSection key={property} dataValue={props.data[property]} dataName={property}/>
        )
    })

    return (
        <>
            <StyledDiv className='asset-page-table-body-item' onMouseOver={() => onMouseEnterHandler()}
                       onMouseLeave={() => onMouseOutHandler()}>
                <div className='asset-page-table-body-item-content'>
                    <input className='asset-page-table-body-item-content-select' type='checkbox' className={'asset-table-check-box'} checked={props.selectedItems.includes(props.data._id)}
                           onChange={e => onSelectChangeHandler(e)}/>
                    {renderProperties}
                </div>
                <TableBodyItemOnHover isHover={state.isHover}
                                      assetsType={props.assetsType}
                                      _id={props.data._id}
                                      postType={props.data.postType}
                                      title={props.data.title}
                />
            </StyledDiv>
        </>

    );
};
export default TableBodyItem;
