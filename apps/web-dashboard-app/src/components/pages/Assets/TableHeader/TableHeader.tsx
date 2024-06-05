import React, {useEffect, useRef, FC, useMemo} from 'react';
import {convertVariableNameToName} from "shared-util";
import styled from "styled-components";
import tableItemProperties from "../tableBodyItemProperties";
import {useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";

const TableHeaderStyledDiv = styled.div`
  padding: 10px;
  background-color: var(--secondary-background-color,#181818);
  margin: 5px 0 0 0;
  border: .2px solid rgba(0, 0, 0, .1);
  font-size: 13px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  .asset-page-table-header-item {
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
    text-align: center;
  }
`

interface TableHeaderPropType{
    selectedItems:any[]
    setSelectedItems:any,
    assetPageData:any
}

const TableHeader : FC<TableHeaderPropType> = props => {
    
    const selectAllCheckBox = useRef(null)
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(()=>paramsObjectGenerator(search),[search])

    const items = useMemo(()=>{
        //@ts-ignore
        return query?.assetsType ? tableItemProperties?.[query?.assetsType as string] : []
    },[query.page, query.assetsType])

    useEffect(() => {
        if (props.selectedItems?.length === 0) {
            //@ts-ignore
            selectAllCheckBox.current.checked = false
        }
    }, [props.selectedItems]);

    const onSelectChangeHandler = (e:React.ChangeEvent<any>) => {
        e.target.checked ?

            props.setSelectedItems(props.assetPageData[query.assetsType as string].map((i:{_id:string}) => i._id)) :
            props.setSelectedItems([])
    }

    const renderHeaderItems = items.map((item:any) => {
        return (
            <p key={item} className='asset-page-table-header-item'>
                {convertVariableNameToName(item)}
            </p>
        )
    })

    return (
        <TableHeaderStyledDiv className='asset-page-table-header'>

            <input ref={selectAllCheckBox} type='checkbox' className={'asset-table-check-box'} onChange={e => onSelectChangeHandler(e)}/>
            {renderHeaderItems}

        </TableHeaderStyledDiv>
    );
};
export default TableHeader;
