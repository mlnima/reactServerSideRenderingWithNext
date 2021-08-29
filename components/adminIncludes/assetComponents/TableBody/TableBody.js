import React from 'react';
import TableBodyItem from './TableBodyItem/TableBodyItem'
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledDiv = styled.div`
  font-size: 13px;
  //display: flex;
  //align-items: center;
  //flex-wrap: wrap;
`
const TableBody = props => {
    const router = useRouter()
    const renderItems = (props.finalPageData[router.query.assetsType] || []).map(item => {
        return (
            <TableBodyItem key={ item._id } data={ item } assetsType={ router.query.assetsType } selectedItems={ props.selectedItems } setSelectedItems={ props.setSelectedItems }/>
        )
    })

    return (
        <StyledDiv className='asset-page-table-body'>
            { renderItems }
        </StyledDiv>
    );
};
export default TableBody;
