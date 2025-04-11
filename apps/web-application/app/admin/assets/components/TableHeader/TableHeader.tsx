'use client';
import React, { useEffect, useRef, FC } from 'react';
import { convertVariableNameToName } from '@repo/utils';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';

const TableHeaderStyledDiv = styled.div`
    padding: 10px;
    background-color: var(--secondary-background-color, #181818);
    margin: 5px 0 0 0;
    border: 0.2px solid rgba(0, 0, 0, 0.1);
    font-size: 13px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    .assetPageTableHeaderItem {
        margin: 5px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
        text-align: center;
    }
`;

interface TableHeaderPropType {
  selectedItems: any[],
  setSelectedItems: any,
  assetPageData: any,
  tableItemsType: string[],
  selectAllAssetsHandler:Function
}

const TableHeader: FC<TableHeaderPropType> = (
  {
    selectedItems,
    tableItemsType,
    selectAllAssetsHandler
  }) => {
  const selectAllCheckBox = useRef(null);

  useEffect(() => {
    if (selectedItems?.length === 0) {
      //@ts-ignore
      selectAllCheckBox.current.checked = false;
    }
  }, [selectedItems]);

  return (
    <TableHeaderStyledDiv className="asset-page-table-header">
      <input
        ref={selectAllCheckBox}
        type="checkbox"
        className={'asset-table-check-box'}
        onChange={e => selectAllAssetsHandler(e)}
      />
      {tableItemsType.map((item: any) => {
        return (
          <p key={item} className="assetPageTableHeaderItem">
            {convertVariableNameToName(item)}

          </p>
        );
      })}
    </TableHeaderStyledDiv>
  );
};
export default TableHeader;
