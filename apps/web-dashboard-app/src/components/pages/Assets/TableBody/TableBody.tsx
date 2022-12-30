import {FC, useMemo} from 'react';
import TableBodyItem from './TableBodyItem/TableBodyItem'
import styled from "styled-components";
import {useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "@variables/paramsObjectGenerator";

let StyledDiv = styled.div`
  font-size: 13px;
`

interface TableBodyPropTypes {
    assetPageData: any,
    selectedItems: string[],
    setSelectedItems: any
}

const TableBody: FC<TableBodyPropTypes> = ({assetPageData, selectedItems, setSelectedItems}) => {
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(()=>paramsObjectGenerator(search),[search])

    const renderItems = (assetPageData[query.assetsType] || []).map((item:{_id:string,data:{}}) => {
        return (
            <TableBodyItem key={item._id}
                           data={item}
                           assetsType={query.assetsType}
                           selectedItems={selectedItems}
                           setSelectedItems={setSelectedItems}
            />
        )
    })

    return (
        <StyledDiv className='asset-page-table-body'>
            {renderItems}
        </StyledDiv>
    );
};
export default TableBody;
