import React, {FC, useMemo, useState} from 'react';
import styled from "styled-components";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";


let StyledForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 300px;

  .primaryInput {
    width: 160px;
  }

  .btn-navigation {
    margin: 0 2px;
  }
`;

const AssetSearch: FC = () => {

    const [keyword, setKeyword] = useState('')
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(()=>paramsObjectGenerator(search),[search])

    const onSubmitHandler = (e:React.FormEvent) => {
        const queryData = { ...query, keyword };
        delete queryData.page;

        e.preventDefault()
        setSearch({...queryData})
    }

    const onDeleteKeywordHandler = () => {
        if (keyword) {
            setKeyword('')
            const  resetQueries = query
            delete resetQueries.keyword
            delete resetQueries.metaId
            delete resetQueries.page
            setSearch({...resetQueries})
        }
    }

    return (

        <StyledForm className={'assetControlItem'} onSubmit={e => onSubmitHandler(e)}>

            <input className={'primaryInput'}
                   value={keyword}
                   type={'text'}
                   onChange={e => setKeyword(e.target.value)}
            />
            <button className={'btn btn-navigation'}>Search</button>
            {keyword ? <span className={'btn btn-navigation'} onClick={onDeleteKeywordHandler}>X</span> : null}
        </StyledForm>
    );
};
export default AssetSearch;
