import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { convertVariableNameToName } from '@repo/utils';
import styled from 'styled-components';
import { postStatuses, userStatus } from '@repo/data-structures';
import { useSelector } from 'react-redux';
import { Store } from '@repo/typescript-types';

const AssetStatusNavigationStyledDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .btn-navigation {
        margin: 0 2px;
    }
`;

interface IProps {
    currentQuery: { [key: string]: string };
}

const AssetStatusNavigation: FC<IProps> = ({ currentQuery }) => {
    const [search, setSearch] = useSearchParams();
    const statusesCount = useSelector(({ posts }: Store) => posts.statusesCount);

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
            <button
                className={`btn  ${currentQuery?.status === type ? 'btn-primary' : 'btn-navigation'}`}
                key={type}
                onClick={onNavigate}
            >
                {convertVariableNameToName(type)}
                {statusesCount?.[type] ? ` (${statusesCount?.[type]}) ` : ''}
            </button>
        );
    });

    return <AssetStatusNavigationStyledDiv className="assetControlItem">{renderStatus}</AssetStatusNavigationStyledDiv>;
};
export default AssetStatusNavigation;
