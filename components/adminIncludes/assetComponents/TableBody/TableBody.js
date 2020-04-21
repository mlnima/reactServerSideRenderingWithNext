import React, { useEffect, useState, useContext, useRef } from 'react';
import TableBodyItemSection from './TableBodyItem/TableBodyItemSection/TableBodyItemSection'
import TableBodyItem from './TableBodyItem/TableBodyItem'
import TableHeader from '../TableHeader/TableHeader'

const TableBody = props => {
    const [ state, setState ] = useState({
        items: []
    });

    const renderItems = props.finalPageData[props.query.assetsType].map(item=>{
            return (
                <TableBodyItem key={item._id} data={item} assetsType={props.query.assetsType} selectedItems={ props.selectedItems } setSelectedItems={ props.setSelectedItems }/>
            )
    })


    return (
        <div className='asset-page-table-body'>
            {renderItems}
        </div>
    );
};
export default TableBody;
