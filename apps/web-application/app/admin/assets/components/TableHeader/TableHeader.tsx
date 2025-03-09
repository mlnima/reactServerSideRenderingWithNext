import React, { useEffect, useRef, FC } from 'react';
import { convertVariableNameToName } from '@repo/utils';
import styled from 'styled-components';

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

    .assetPageTableHeaderItem{
        margin: 5px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
        text-align: center;
    }
`;

interface TableHeaderPropType {
    selectedItems: any[];
    setSelectedItems: any;
    assetPageData: any;
    currentQuery: { [key: string]: string };
    tableItemsType: string[];
}

const TableHeader: FC<TableHeaderPropType> = ({
    currentQuery,
    selectedItems,
    setSelectedItems,
    assetPageData,
    tableItemsType,
}) => {
    const selectAllCheckBox = useRef(null);

    useEffect(() => {
        if (selectedItems?.length === 0) {
            //@ts-ignore
            selectAllCheckBox.current.checked = false;
        }
    }, [selectedItems]);

    const onSelectChangeHandler = (e: React.ChangeEvent<any>) => {
        e.target.checked
            ? setSelectedItems(assetPageData[currentQuery.assetsType as string].map((i: { _id: string }) => i._id))
            : setSelectedItems([]);
    };

    return (
        <TableHeaderStyledDiv className="asset-page-table-header">
            <input
                ref={selectAllCheckBox}
                type="checkbox"
                className={'asset-table-check-box'}
                onChange={e => onSelectChangeHandler(e)}
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
