import React, { useEffect, useState, useContext, useRef } from 'react';
import { convertVariableNameToName } from '../../../../_variables/_variables'
import {useRouter} from "next/router";


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
            let items = [ 'username', 'email', 'role', 'reg_time' ]
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
        <div className='asset-page-table-header'>
            <input ref={ selectAllCheckBox } type='checkbox' onChange={ e => onSelectChangeHandler(e) }/>
            { renderHeaderItems }
        </div>
    );
};
export default TableHeader;
