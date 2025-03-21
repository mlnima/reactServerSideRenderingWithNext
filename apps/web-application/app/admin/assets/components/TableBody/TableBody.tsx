'use client';
import { FC } from 'react';
import TableBodyItem from './TableBodyItem/TableBodyItem';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';

let StyledDiv = styled.div`
    font-size: 13px;
`;

interface TableBodyPropTypes {
  assetPageData: any;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void; // Type the setSelectedItems function
  tableItemsType: string[];
}

const TableBody: FC<TableBodyPropTypes> = (
  {
    assetPageData,
    selectedItems,
    setSelectedItems,
    tableItemsType,
  }) => {
  const searchParams = useSearchParams();

  const renderItems = (assetPageData[searchParams.get('assetsType') || 'posts'] || []).map((item: {
    _id: string,
    data: {}
  }) => {
    return (
      <TableBodyItem
        key={item._id}
        data={item}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        tableItemsType={tableItemsType}
      />
    );
  });

  return (
    <StyledDiv className="asset-page-table-body">
      {renderItems}
    </StyledDiv>
  );
};

export default TableBody;

