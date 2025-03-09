"use client";
import { FC, useMemo } from 'react';
import TableBodyItem from './TableBodyItem/TableBodyItem';
import styled from "styled-components";
import paramsObjectGenerator from "../paramsObjectGenerator";
import { useSearchParams } from 'next/navigation';

let StyledDiv = styled.div`
  font-size: 13px;
`;

interface TableBodyPropTypes {
  assetPageData: any;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void; // Type the setSelectedItems function
  currentQuery: { [key: string]: string };
  tableItemsType: string[];
}

const TableBody: FC<TableBodyPropTypes> = ({ assetPageData, selectedItems, setSelectedItems, currentQuery, tableItemsType }) => {
  const searchParams = useSearchParams()

  // Create a memoized query object using paramsObjectGenerator
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  // Render items based on the currentQuery.assetsType
  const renderItems = (assetPageData[query.assetsType] || []).map((item: { _id: string, data: {} }) => {
    return (
      <TableBodyItem
        key={item._id}
        data={item}
        assetsType={query.assetsType}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        tableItemsType={tableItemsType}
      />
    );
  });

  return (
    <StyledDiv className='asset-page-table-body'>
      {renderItems}
    </StyledDiv>
  );
};

export default TableBody;


// import {FC, useMemo} from 'react';
// import TableBodyItem from './TableBodyItem/TableBodyItem'
// import styled from "styled-components";
// import {useSearchParams} from "react-router-dom";
// import paramsObjectGenerator from "@variables/paramsObjectGenerator";
//
// let StyledDiv = styled.div`
//   font-size: 13px;
// `
//
// interface TableBodyPropTypes {
//     assetPageData: any,
//     selectedItems: string[],
//     setSelectedItems: any
//     currentQuery: { [key: string]: string };
//     tableItemsType: string[];
// }
//
// const TableBody: FC<TableBodyPropTypes> = ({assetPageData, selectedItems, setSelectedItems,tableItemsType,currentQuery}) => {
//     const [search, setSearch] = useSearchParams();
//     // const query = useMemo(()=>paramsObjectGenerator(search),[search])
//
//     const renderItems = (assetPageData[currentQuery.assetsType] || []).map((item:{_id:string,data:{}}) => {
//         return (
//             <TableBodyItem key={item._id}
//                            data={item}
//                            assetsType={currentQuery.assetsType}
//                            selectedItems={selectedItems}
//                            setSelectedItems={setSelectedItems}
//                            tableItemsType={tableItemsType}
//             />
//         )
//     })
//
//     return (
//         <StyledDiv className='asset-page-table-body'>
//             {renderItems}
//         </StyledDiv>
//     );
// };
// export default TableBody;
