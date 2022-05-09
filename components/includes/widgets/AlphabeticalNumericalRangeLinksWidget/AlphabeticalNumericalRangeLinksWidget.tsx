import {FC, useMemo, useState} from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const AlphabeticalNumericalRangeLinksWidgetStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 95vw;
  margin-bottom: 10px;
  margin-top: 10px;

  .alphabetical-range-content {
    display: ${({renderItems}: { renderItems: boolean }) => renderItems ? 'flex' : 'none'};
    justify-content: center;
    flex-wrap: wrap;

    .alphabetical-range-widget-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 10px;
      margin: 5px;
      border-radius: 5px;
      transition: width 2s linear 1s;
      background-color: var(--navigation-background-color, #18181b);
      color: var(--main-text-color, #ccc);
    }

    .active-item {
      background-color: var(--main-active-color, #f90);
      color: var(--navigation-background-color, #18181b);
    }

    .current-query {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .current-query-over{
       background-color: var(--danger-button-link-background-color,#dc3545);
       color: var(--danger-button-link-text-color,#fff);
    }
  }


  @media only screen and (max-width: 768px) {
    align-items: flex-end;
    .alphabetical-range-content {
      .alphabetical-range-widget-item {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
      }

      .current-query {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100% !important;
        max-width: 200px;

      }
    }
  }
`
const AlphabeticalNumericalRangeLinksWidget: FC = () => {

    const {pathname, query,locale} = useRouter()
    const isMobileDevice = useSelector((store: StoreTypes) => store.settings?.isMobile)
    const isMobile = useMemo(() => isMobileDevice, [])
    const [renderItems, setRenderItems] = useState(!isMobile)
    const activePage = query.startWith;

    // const range = useMemo(() => {
    //     return pathname === '/actors' ? [...'abcdefghijklmnopqrstuvwxyz'] : [...'abcdefghijklmnopqrstuvwxyz0123456789'];
    // }, [])

    const range = useMemo(() => {
        return pathname === '/actors' ? [...'abcdefghijklmnopqrstuvwxyz'] :
            // process.env.NEXT_PUBLIC_DEFAULT_LOCAL === 'fa' && locale ==='fa' ? [] :
            [...'abcdefghijklmnopqrstuvwxyz0123456789'];
    }, [])

    const renderRange = range.map((Letter, index) => {

        return (
            <Link key={index} href={{
                pathname: pathname,
                query: query.startWith ? {
                    ...query,
                    startWith: query?.startWith?.length <= 3 ? `${(query?.startWith || '') + Letter}` : query?.startWith,
                    page: 1
                } : {
                    ...query,
                    startWith: Letter,
                    page: 1
                }
            }}>
                <a className={`alphabetical-range-widget-item ${activePage?.includes(Letter) ? 'active-item' : ''}`}>
                    {query.startWith ? Letter : Letter.toUpperCase()}
                </a>
            </Link>
        )
    })

    return (
        <AlphabeticalNumericalRangeLinksWidgetStyledDiv className='alphabetical-range-widget' renderItems={renderItems}>
            {isMobile ?
                <button className={'mobile-controller btn btn-primary'}
                        aria-label={'show filters'}
                        onClick={() => setRenderItems(!renderItems)}
                >
                    Filters
                </button>
                : null
            }

            <div className={'alphabetical-range-content'}>
                {query.startWith ?
                    <Link key={'X'} href={{
                        pathname: pathname,
                        query: {...query, startWith: query?.startWith?.slice(0, -1)}
                    }}>
                        <a className={
                            `alphabetical-range-widget-item active-item current-query ${
                                query?.startWith?.length > 3  && 'current-query-over'}`
                        }>
                            {query?.startWith} X
                        </a>
                    </Link>
                    : null
                }
                <Link key={'all'} href={{
                    pathname: pathname,
                    query: {...query, startWith: ''}
                }}>
                    <a className={`alphabetical-range-widget-item ${!query.startWith ? 'active-item' : ''}`}>
                        All
                    </a>
                </Link>

                {renderRange}

            </div>
        </AlphabeticalNumericalRangeLinksWidgetStyledDiv>
    );
};
export default AlphabeticalNumericalRangeLinksWidget;
