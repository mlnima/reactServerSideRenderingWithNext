import React, {FC,useState} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";

let StyledForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 300px;

  .form-control-input {
    width: 160px;
  }

  .btn-navigation {
    margin: 0 2px;
  }
`;

const AssetSearch: FC = () => {

    const {query, pathname, push} = useRouter()
    const [keyword, setKeyword] = useState(null)

    const onSubmitHandler = e => {
        e.preventDefault()
        if (keyword) {
            const queryData = {
                ...query,
                keyword,
            }
            // @ts-ignore
            delete queryData.page
            // @ts-ignore
            delete queryData.metaId
            push({
                pathname: pathname,
                query: queryData
            }).finally()
        }
    }

    const onDeleteKeywordHandler = () => {
        if (keyword) {
            setKeyword('')
            const  resetQueries = query
            delete resetQueries.keyword
            delete resetQueries.metaId
            delete resetQueries.page

            push({
                pathname: pathname,
                query: resetQueries
            }).finally()
        }
    }

    return (

        <StyledForm className={'asset-page-search'} onSubmit={e => onSubmitHandler(e)}>

            <input className={'form-control-input'}
                   value={keyword}
                   type={'text'}
                   onChange={e => setKeyword(e.target.value)}
            />

            <button className={'btn btn-navigation'}>Search</button>

            {keyword ?
                <span className={'btn btn-navigation'} onClick={onDeleteKeywordHandler}>X</span>
                : null
            }

        </StyledForm>
    );
};
export default AssetSearch;
