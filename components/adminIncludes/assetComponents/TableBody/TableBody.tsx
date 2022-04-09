import {FC} from 'react';
import TableBodyItem from './TableBodyItem/TableBodyItem'
import {useRouter} from "next/router";
import styled from "styled-components";

let StyledDiv = styled.div`
  font-size: 13px;
`

interface TableBodyPropTypes {
    assetPageData: any,
    selectedItems: string[],
    setSelectedItems: any
}

const TableBody: FC<TableBodyPropTypes> = ({assetPageData, selectedItems, setSelectedItems}) => {

    const {query} = useRouter()

    const renderItems = (assetPageData[query.assetsType as string] || []).map((item:{_id:string,data:{}}) => {
        return (
            <TableBodyItem key={item._id}
                           data={item}
                           assetsType={query.assetsType as string}
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
