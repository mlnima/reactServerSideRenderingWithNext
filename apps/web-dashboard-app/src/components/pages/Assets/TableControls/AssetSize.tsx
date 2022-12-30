import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";

const AssetSizeStyledDiv = styled.select`
  width: 100px;
`

const AssetSize = () => {
    const [currentSize, setCurrentSize] = useState(20)
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(() => paramsObjectGenerator(search), [search])

    const range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]

    const {identity} = useSelector(({settings}: Store) => {
        return {
            identity: settings?.identity
        }
    })

    const onChangeHandler = (e: React.ChangeEvent<any>) => {
        setSearch({...query, size: e.target.value})
    }

    useEffect(() => {
        setCurrentSize(parseInt(query.size) || identity?.postsCountPerPage || 20 )
    }, [query]);

    return (
        //@ts-ignore
        <AssetSizeStyledDiv className={'custom-select'}
                            value={currentSize}
                            onChange={e => onChangeHandler(e)}>

            {range.map(unit => {
                return <option value={unit} key={unit}>{unit}</option>
            })}
        </AssetSizeStyledDiv>
    );
};
export default AssetSize;
