import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";

const Styled = styled.div`
  width: 100px;
  select{
    width: 100%;
  }

`

const AssetSize = () => {
    const [currentSize, setCurrentSize] = useState(20)
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(() => paramsObjectGenerator(search), [search])

    const range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]

    const {initialSettings} = useSelector(({settings}: Store) => settings)

    const onChangeHandler = (e: React.ChangeEvent<any>) => {
        setSearch({...query, size: e.target.value})
    }

    useEffect(() => {
        setCurrentSize(parseInt(query.size) || initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20 )
    }, [query]);

    return (
        //@ts-ignore
        <Styled>
            <select className={'primarySelect'}
                    value={currentSize}
                    onChange={e => onChangeHandler(e)}>

                {range.map(unit => {
                    return <option value={unit} key={unit}>{unit}</option>
                })}
            </select>
        </Styled>

    );
};
export default AssetSize;
