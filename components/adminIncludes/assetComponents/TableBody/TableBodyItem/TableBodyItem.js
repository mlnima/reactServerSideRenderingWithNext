import React, {useEffect, useState, useContext, useRef} from 'react';
import TableBodyItemSection from './TableBodyItemSection/TableBodyItemSection'
import TableBodyItemOnHover from './TableBodyItemOnHover/TableBodyItemOnHover'

const TableBodyItem = props => {
    const [state, setState] = useState({
        properties: [],
        isHover: false
    });

    useEffect(() => {
        if (props.assetsType === 'posts') {
            let properties = ['title', 'author', 'status', 'tags', 'categories', 'lastModify', 'mainThumbnail']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'users') {
            let properties = ['username', 'email', 'role', 'reg_time']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'comments') {
            let properties = ['author', 'body', 'onDocument', 'email']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'metas') {
            let properties = ['name', 'description', 'type', 'count', 'noImageUrl', 'ImageUrl']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'forms') {
            let properties = ['formName', 'date','widgetId']
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'pages') {
            let properties = [ 'pageName', 'status','sidebar' ]
            setState({
                ...state,
                properties,
            })
        } else if (props.assetsType === 'orders') {
            let properties = [ 'buyer', 'status','type','isPaid' ]
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
            <div className='asset-page-table-body-item' onMouseOver={() => onMouseEnterHandler()}
                 onMouseLeave={() => onMouseOutHandler()}>
                <div className='asset-page-table-body-item-content'>
                    <input type='checkbox' checked={props.selectedItems.includes(props.data._id)}
                           onChange={e => onSelectChangeHandler(e)}/>
                    {renderProperties}
                </div>
                <TableBodyItemOnHover isHover={state.isHover} assetsType={props.assetsType} _id={props.data._id}
                                      title={props.data.title}/>
            </div>

        </>
    );
};
export default TableBodyItem;
