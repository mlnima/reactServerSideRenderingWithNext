import {FC, useEffect, useMemo} from 'react';
import { Link, useLocation, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { convertVariableNameToName } from '@repo/shared-util';
import styled from 'styled-components';
import paramsObjectGenerator from '@variables/paramsObjectGenerator';
import postStatuses from '@repo/data-structures/dist/src/postStatuses';
import userStatus from '@repo/data-structures/dist/src/userStatus';
import { useAppSelector } from '@store/hooks';

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
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(() => paramsObjectGenerator(search), [search]);
    const statusesCount = useAppSelector(({ posts }) => posts?.statusesCount);
    const postsStatus =
        query.assetsType === 'posts' || query.assetsType === 'metas'
            ? ['all', ...postStatuses]
            : query.assetsType === 'users'
              ? ['all', ...userStatus]
              : [];


    useEffect(() => {
        console.log('statusesCount=> ',statusesCount);
    }, [statusesCount]);

    const renderStatus = postsStatus.map((type: string) => {
        const onNavigate = () => {
            setSearch({ ...query, status: type }, { replace: true });
        };

        return (
            <button className={'btn btn-navigation'} key={type} onClick={onNavigate}>
                {convertVariableNameToName(type)}
                {/*//@ts-ignore*/}
                {` (${statusesCount?.[type] || 0}) `}
            </button>
        );
    });

    return <AssetStatusNavigationStyledDiv className="assetControlItem">{renderStatus}</AssetStatusNavigationStyledDiv>;
};
export default AssetStatusNavigation;
