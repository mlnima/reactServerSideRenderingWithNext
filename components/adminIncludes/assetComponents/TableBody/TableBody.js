import React from 'react';
import TableBodyItem from './TableBodyItem/TableBodyItem'
import {useRouter} from "next/router";

const TableBody = props => {
    const router = useRouter()
    const renderItems = (props.finalPageData[router.query.assetsType] || []).map(item => {
        return (
            <TableBodyItem key={ item._id } data={ item } assetsType={ router.query.assetsType } selectedItems={ props.selectedItems } setSelectedItems={ props.setSelectedItems }/>
        )
    })

    return (
        <div className='asset-page-table-body'>
            { renderItems }
        </div>
    );
};
export default TableBody;
