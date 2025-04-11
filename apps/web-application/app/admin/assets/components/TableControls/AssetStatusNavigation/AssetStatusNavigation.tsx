"use client";
import { usePathname, useRouter } from 'next/navigation';
import { convertVariableNameToName } from '@repo/utils';
import { postStatuses, userStatus } from '@repo/data-structures';
import { useSearchParams } from 'next/navigation';
import { _updateSearchParams } from '@lib/navigationTools';
import './AssetStatusNavigation.scss'
import { FC } from 'react';

const AssetStatusNavigation:FC<{statusesCount: any}> = ({statusesCount}) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const assetsType = searchParams.get('assetsType');
  const postsStatus =
    assetsType === 'posts' || assetsType === 'metas'
      ? ['all', ...postStatuses]
      : assetsType === 'users'
        ? ['all', ...userStatus]
        : [];

  const renderStatus = postsStatus.map((statusType: string) => {
    const onNavigate = () => {
      const newQuery = { ...Object.fromEntries(searchParams), status: statusType };
      router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
    };

    return (
      <button
        className={`btn ${  searchParams.get('status') === statusType ? 'btn-primary' : 'btn-navigation'}`}
        key={statusType}
        onClick={onNavigate}
      >
        {convertVariableNameToName(statusType)}
        <span className={'statusCount'}>
              {statusesCount?.[statusType] ? ` ${statusesCount[statusType]}` : ''}
        </span>

      </button>
    );
  });

  return (
    <div id={'AssetStatusNavigation'} className="assetControlItem">
      {renderStatus}
    </div>
  );
};

export default AssetStatusNavigation;
