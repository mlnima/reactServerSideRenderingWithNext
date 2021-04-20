import React, { useEffect, useState, useContext, useRef } from 'react';
import AssetStatusNavigation from './AssetStatusNavigation'
import withRouter from 'next/dist/client/with-router'
import AssetSearch from './AssetSearch'
import AssetBulkActionAndAssetTypeSelector from './AssetBulkActionAndAssetTypeSelector/AssetBulkActionAndAssetTypeSelector'
import AssetPagination from './AssetPagination'
import AssetSize from "./AssetSize";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;


  @media only screen and (min-width: 768px) {
    display: grid;
    //grid-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

  }
`;
const TableControls = props => {
    return (
        <StyledDiv className='asset-page-table-head'>
            <AssetStatusNavigation { ...props }/>
            <AssetSearch/>
            <AssetBulkActionAndAssetTypeSelector { ...props }/>
            <AssetPagination { ...props }/>
            <AssetSize/>
        </StyledDiv>
    );
};
export default withRouter(TableControls);
