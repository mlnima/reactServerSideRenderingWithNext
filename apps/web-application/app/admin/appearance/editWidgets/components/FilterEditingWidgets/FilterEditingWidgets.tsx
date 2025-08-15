'use client';
import { convertVariableNameToName } from '@repo/utils/dist/src';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { _updateSearchParams } from '@lib/navigationTools';
import './FilterEditingWidgets.scss';
import { FC, useEffect } from 'react';

interface IProps {
  availablePositions: string[];
}

const FilterEditingWidgets: FC<IProps> = ({ availablePositions }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsPositions = searchParams.getAll('position');

  const onSelectPositionHandler = (positions: string[]) => {
    let newQuery = {};
    if (positions.length === 1 && paramsPositions?.includes(positions[0])) {
      newQuery = { position: paramsPositions.filter((p) => p !== positions[0]) };
    } else if (positions.length === 1 && !paramsPositions?.includes(positions[0])) {
      newQuery = { position: [...paramsPositions, ...positions] };
    } else {
      newQuery = { position: positions };
    }
    router.push(_updateSearchParams({ newQuery, searchParams, pathname }), { scroll: false });
  };

  const renderPositionSelectors = availablePositions
    ?.sort((a, b) => a.localeCompare(b))
    ?.map((position) => {
      return (
        <div
          className={`btn ${paramsPositions?.includes(position) ? 'btn-primary' : 'btn-dark'}`}
          key={position}
          title={position}
          onClick={() => onSelectPositionHandler([position])}
        >
          <p>{convertVariableNameToName(position)}</p>
        </div>
      );
    });

  // useEffect(() => {
  //   console.log(`paramsPositions=> `, paramsPositions);
  // }, [paramsPositions]);
  return (
    <div id={'FilterEditingWidgets'} className={'position-selector'}>
      <button onClick={() => router.refresh()} className={'btn btn-primary select-all'}>
        Refresh
      </button>
      <button onClick={() => onSelectPositionHandler(availablePositions)} className={'btn btn-primary select-all'}>
        Show All
      </button>
      <button onClick={() => onSelectPositionHandler([])} className={'btn btn-primary unselect-all'}>
        Hide All
      </button>
      <div className={'check-boxes'}>{renderPositionSelectors}</div>
    </div>
  );
};
export default FilterEditingWidgets;
