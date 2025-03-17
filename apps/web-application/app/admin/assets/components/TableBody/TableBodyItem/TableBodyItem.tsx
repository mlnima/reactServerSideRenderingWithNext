"use client";
import {ChangeEvent, FC, useEffect} from 'react';
import TableBodyItemSection from './TableBodyItemSection/TableBodyItemSection';
import TableBodyItemDirectAction from './TableBodyItemDirectAction/TableBodyItemDirectAction';
import styled from 'styled-components';

let StyledDiv = styled.div`
    .asset-page-table-body-item-content {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        font-size: 12px;
    }

    .asset-page-table-body-item-hover-item {
        font-size: 13px !important;
        display: flex;
        align-items: center;
        height: 35px;
        width: 300px;
        cursor: pointer;

        span,
        a {
            padding: 6px 3px;
            margin: 6px 3px;
            font-size: 12px;
        }

        button {
            cursor: pointer;
        }
    }

    &:nth-child(even) {
        background-color: var(--secondary-background-color, #181818);
    }
`;

interface TableBodyItemPropType {
    data: {
        _id: string;
        postType?: string;
        title?: string;
    };
    selectedItems: string[];
    setSelectedItems: any;
    tableItemsType: string[];
}

const TableBodyItem: FC<TableBodyItemPropType> = ({
    data,
    selectedItems,
    setSelectedItems,
    tableItemsType,
}) => {

    const onSelectChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? setSelectedItems([...selectedItems, data._id])
            : setSelectedItems(selectedItems.filter(i => i !== data._id));
    };

    const renderProperties = tableItemsType.map((property: string) => {

        // if (typeof property != 'string'){
        //   console.log(`property=> `,property, typeof property)
        // }
      // @ts-expect-error: check later
        return <TableBodyItemSection key={property} dataValue={data?.[property]} dataName={property} />;
    });

    return (
        <StyledDiv className="asset-page-table-body-item">
            <div className="asset-page-table-body-item-content">
                <input
                    className="asset-page-table-body-item-content-select asset-table-check-box"
                    type="checkbox"
                    checked={selectedItems.includes(data._id)}
                    onChange={e => onSelectChangeHandler(e)}
                />
                {renderProperties}
            </div>
            <TableBodyItemDirectAction
                _id={data._id}
                postType={data?.postType}
                title={data.title}
            />
        </StyledDiv>
    );
};
export default TableBodyItem;
