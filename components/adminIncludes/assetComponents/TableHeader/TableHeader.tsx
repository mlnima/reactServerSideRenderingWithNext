import {useEffect, useState, useRef, FC} from 'react';
import convertVariableNameToName from "../../../../_variables/util/convertVariableNameToName";
import {useRouter} from "next/router";
import styled from "styled-components";

const TableHeaderStyledDiv = styled.div`
  padding: 10px;
  background-color: var(--admin-color-0);
  margin: 5px 0 0 0;
  border: .2px solid rgba(0, 0, 0, .1);
  font-size: 13px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  .asset-page-table-header-item {
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
    text-align: center;
  }
`

interface TableHeaderPropType{
    selectedItems:any[]
    setSelectedItems:any,
    assetPageData:{}
}

const TableHeader : FC<TableHeaderPropType> = props => {
    
    const selectAllCheckBox = useRef(null)
    const {query} = useRouter()
    
    const [state, setState] = useState({
        items: []
    });
    
    useEffect(() => {
        if (query.assetsType === 'posts') {
            let items = ['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt']
            setState({
                ...state,
                items,
            })
        } else if (query.assetsType === 'users') {
            let items = ['username', 'email', 'role', 'createdAt', 'updatedAt']
            setState({
                ...state,
                items,
            })
        } else if (query.assetsType === 'comments') {
            let items = ['author', 'body', 'onDocument', 'email', 'createdAt', 'updatedAt']
            setState({
                ...state,
                items,
            })
        } else if (query.assetsType === 'metas') {
            let items = ['name', 'description', 'type', 'count', 'image', 'createdAt', 'updatedAt']
            setState({
                ...state,
                items,
            })
        } else if (query.assetsType === 'forms') {
            let items = ['formName', 'widgetId', 'createdAt', 'updatedAt']
            setState({
                ...state,
                items,
            })
        } else if (query.assetsType === 'pages') {
            let items = ['pageName', 'status', 'sidebar', 'createdAt', 'updatedAt']
            setState({
                ...state,
                items,
            })
        } else if (query.assetsType === 'orders') {
            let items = ['buyer', 'status', 'type', 'isPaid', 'createdAt', 'updatedAt']
            setState({
                ...state,
                items,
            })
        }

    }, [query.page, query.assetsType]);

    useEffect(() => {
        if (props.selectedItems.length === 0) {
            selectAllCheckBox.current.checked = false
        }

    }, [props.selectedItems]);

    const onSelectChangeHandler = e => {
        e.target.checked ?
            props.setSelectedItems(props.assetPageData[query.assetsType as string].map(i => i._id)) :
            props.setSelectedItems([])
    }

    const renderHeaderItems = state.items.map(item => {
        return (
            <p key={item} className='asset-page-table-header-item'>
                {convertVariableNameToName(item)}
            </p>
        )
    })

    return (
        <TableHeaderStyledDiv className='asset-page-table-header'>

            <input ref={selectAllCheckBox} type='checkbox' className={'asset-table-check-box'} onChange={e => onSelectChangeHandler(e)}/>
            {renderHeaderItems}

        </TableHeaderStyledDiv>
    );
};
export default TableHeader;
