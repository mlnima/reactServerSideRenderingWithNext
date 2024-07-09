import React, { useEffect, FC, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import paramsObjectGenerator from '../../../../variables/paramsObjectGenerator';

const PostsByMetaStyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .25rem;

    p {
        margin: 0 10px;
        white-space: nowrap;
    }

    .primaryInput {
        //width: 260px;
    }

    .btn-navigation {
        //margin: 0 2px;
    }
`;

const PostsByMeta: FC = () => {
    const [metaId, setMetaId] = useState('');
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(() => paramsObjectGenerator(search), [search]);

    // const {query, pathname, push} = useRouter()

    const onSearchByMetaHandler = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (metaId?.trim()?.match(/^[0-9a-fA-F]{24}$/)) {
            const queryData = { ...query, metaId };
            delete queryData.page;
            delete queryData.keyword;
            setSearch({ ...queryData });
        }
    };
    const onDeleteMetaHandler = () => {
        if (metaId) {
            setMetaId('');
            const resetQueries = query;
            delete resetQueries.keyword;
            delete resetQueries.metaId;
            delete resetQueries.page;

            setSearch({ ...resetQueries });
            // push({
            //     pathname,
            //     query: resetQueries
            // }).finally()
        }
    };




    useEffect(() => {
        if (query.metaId) {
            setMetaId(query.metaId as string);
        }
    }, [query]);

    return (
        <PostsByMetaStyledForm className="assetControlItem" onSubmit={e => onSearchByMetaHandler(e)}>
            <p>Meta:</p>

            <input className={'primaryInput'}
                   type={'text'}
                   onChange={e => setMetaId(e.target.value)}
                   value={metaId} />

            <button className={'btn btn-navigation'}>Search</button>

            {metaId ? (
                <span className={'btn btn-navigation'} onClick={onDeleteMetaHandler}>
                    X
                </span>
            ) : null}
        </PostsByMetaStyledForm>
    );
};
export default PostsByMeta;
