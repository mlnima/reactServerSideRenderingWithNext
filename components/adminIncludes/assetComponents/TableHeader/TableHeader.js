import React, { useEffect, useState, useContext, useRef } from 'react';
import { convertVariableNameToName } from '../../../../_variables/_variables'
import withRouter from 'next/dist/client/with-router';

const TableHeader = props => {
    const selectAllCheckBox = useRef(null)
    const [ state, setState ] = useState({
        items: []
    });

    useEffect(() => {
        if (props.query.assetsType === 'posts') {
            let items = [ 'title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail' ]
            setState({
                ...state,
                items,
            })
        } else if (props.query.assetsType === 'users') {
            let items = [ 'username', 'email', 'role', 'reg_time' ]
            setState({
                ...state,
                items,
            })
        } else if (props.query.assetsType === 'comments') {
            let items = [ 'author', 'body', 'onDocument', 'email' ]
            setState({
                ...state,
                items,
            })
        }

    }, [ props.query.page,props.query.assetsType ]);

    useEffect(() => {
        if (props.selectedItems.length===0){
            selectAllCheckBox.current.checked = false
        }

    }, [ props.selectedItems]);

    const onSelectChangeHandler = e => {
        e.target.checked ?
            props.setSelectedItems(props.finalPageData[props.query.assetsType].map(i => i._id)) :
            props.setSelectedItems([])
    }

    const renderHeaderItems = state.items.map(item => {
        return (
            <p key={ item } className='asset-page-table-header-item'>{ convertVariableNameToName(item) }</p>
        )
    })

    return (
        <div className='asset-page-table-header'>
            <input ref={ selectAllCheckBox } type='checkbox' onChange={ e => onSelectChangeHandler(e) }/>
            { renderHeaderItems }
        </div>
    );
};
export default withRouter(TableHeader);
