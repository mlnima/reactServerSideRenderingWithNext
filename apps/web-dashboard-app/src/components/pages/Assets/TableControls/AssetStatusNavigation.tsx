import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { convertVariableNameToName } from '@repo/shared-util';
import styled from 'styled-components';
import postStatuses from '@repo/data-structures/dist/src/postStatuses';
import userStatus from '@repo/data-structures/dist/src/userStatus';
// import { useAppSelector } from '@store/hooks';
import { useSelector } from 'react-redux';

const AssetStatusNavigationStyledDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .btn-navigation {
        margin: 0 2px;
    }
`;

const AssetStatusNavigation: FC = () => {
    const [currentQuery, setCurrentQuery] = useState<any>({});
    const [search, setSearch] = useSearchParams();

    const getQueries = (searchParams: URLSearchParams) => {
        const params: {
            [key: string]: string;
        } = {};
        //@ts-ignore
        for (let [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        return params;
    };

    useEffect(() => {
        setCurrentQuery(getQueries(search));
    }, [search]);

    const statusesCount = useSelector(({ posts }) => posts.statusesCount);

    const postsStatus =
        currentQuery.assetsType === 'posts' || currentQuery.assetsType === 'metas'
            ? ['all', ...postStatuses]
            : currentQuery.assetsType === 'users'
              ? ['all', ...userStatus]
              : [];

    const renderStatus = postsStatus.map((type: string) => {
        const onNavigate = () => {
            setSearch({ ...currentQuery, status: type }, { replace: true });
        };

        return (
            <button className={'btn btn-navigation'} key={type} onClick={onNavigate}>
                {convertVariableNameToName(type)}
                {statusesCount?.[type] ? ` (${statusesCount?.[type]}) ` : ''}
            </button>
        );
    });

    return <AssetStatusNavigationStyledDiv className="assetControlItem">{renderStatus}</AssetStatusNavigationStyledDiv>;
};
export default AssetStatusNavigation;
