import { useEffect, useState, useRef } from 'react';
import { convertVariableNameToName } from '../../../../_variables/_variables'
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledDiv = styled.div`
  padding: 10px;
  background-color: var(--admin-color-0);
  margin: 5px 0 0 0;
  border: .2px solid rgba(0,0,0,.1);
  font-size: 13px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
  .asset-page-table-header-item{
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
`;

const TableHeader = props => {
    const selectAllCheckBox = useRef(null)
    const router = useRouter()
    const [ state, setState ] = useState({
        items: []
    });


    useEffect(() => {
        if (router.query.assetsType === 'posts') {
            let items = [ 'title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail' ]
            setState({
                ...state,
                items,
            })
        } else if (router.query.assetsType === 'users') {
            let items = [ 'username', 'email', 'role', 'createdAt' ]
            setState({
                ...state,
                items,
            })
        } else if (router.query.assetsType === 'comments') {
            let items = [ 'author', 'body', 'onDocument', 'email' ]
            setState({
                ...state,
                items,
            })
        } else if (router.query.assetsType === 'metas') {
            let items = [ 'name', 'description', 'type','count','image' ]
            setState({
                ...state,
                items,
            })
        } else if (router.query.assetsType === 'forms') {
            let items = [ 'formName', 'createdDate','formWidgetId' ]
            setState({
                ...state,
                items,
            })
        } else if (router.query.assetsType === 'pages') {
            let items = [ 'pageName', 'status','sidebar' ]
            setState({
                ...state,
                items,
            })
        } else if (router.query.assetsType === 'orders') {
            let items = [ 'buyer', 'status','type','isPaid' ]
            setState({
                ...state,
                items,
            })
        }

    }, [ router.query.page, router.query.assetsType ]);

    useEffect(() => {
        if (props.selectedItems.length === 0) {
            selectAllCheckBox.current.checked = false
        }

    }, [ props.selectedItems ]);

    const onSelectChangeHandler = e => {
        e.target.checked ?
            props.setSelectedItems(props.finalPageData[router.query.assetsType].map(i => i._id)) :
            props.setSelectedItems([])
    }

    const renderHeaderItems = state.items.map(item => {
        return (
            <p key={ item } className='asset-page-table-header-item'>{ convertVariableNameToName(item) }</p>
        )
    })

    return (
        <StyledDiv className='asset-page-table-header'>
            <input ref={ selectAllCheckBox } type='checkbox' onChange={ e => onSelectChangeHandler(e) }/>
            { renderHeaderItems }
        </StyledDiv>
    );
};
export default TableHeader;
