import React, {FC, useMemo, useState} from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownZA} from "@fortawesome/free-solid-svg-icons/faArrowDownZA";

const AlphabeticalNumericalRangeLinksWidgetStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 95vw;
  padding: 10px;
  margin: auto;

  .filter-controller {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
  }

  .alphabetical-range-content {
    display: ${({showFilters}: { showFilters: boolean }) => showFilters ? 'flex' : 'none'};
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
      background-color: var(--secondary-background-color, #181818);
      color: var(--main-text-color, #ccc);
    }

    .active-item {
      background-color: var(--main-active-color, #f90);
      color: var(--secondary-background-color, #181818);
    }

    .current-query {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .current-query-over {
      background-color: var(--danger-button-link-background-color, #dc3545);
      color: var(--danger-button-link-text-color, #fff);
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

    const {pathname, query} = useRouter()
    const [showFilters, setShowFilters] = useState(false)
    const activePage = useMemo(() => query.startWith, [query.startWith])
    //@ts-ignore
    const isDisabled = useMemo(() => query?.startWith?.length > 3, [query.startWith])

    const range = useMemo(() => {
        return pathname === '/actors' ? [...'abcdefghijklmnopqrstuvwxyz'] :
            [...'abcdefghijklmnopqrstuvwxyz0123456789'];
    }, [])

    const renderRange = range.map((Letter, index) => {

        return (
            <Link className={`alphabetical-range-widget-item ${activePage?.includes(Letter) ? 'active-item' : ''}`}
                  key={index}
                  href={isDisabled ? '#' : {
                      pathname: pathname,
                      query: query.startWith ? {
                          ...query,
                          startWith: query?.startWith?.length <= 3 ? `${(query?.startWith || '') + Letter}` : query?.startWith,
                          // page: 1
                      } : {
                          ...query,
                          startWith: Letter,
                          // page: 1
                      }
                  }}>
                {query.startWith ? Letter : Letter.toUpperCase()}
            </Link>
        )
    })


    const queryRemover = (pathname, query) => {
        const targetUrl = {
            pathname: pathname,
            query: {...query, startWith: ''}
        }
        delete targetUrl.query.startWith
        return targetUrl
    }

    return (
        <AlphabeticalNumericalRangeLinksWidgetStyledDiv className='alphabetical-range-widget' showFilters={showFilters}>

            <button className={'filter-controller btn btn-primary'}
                    aria-label={'show filters'}
                    onClick={() => setShowFilters(!showFilters)}>

                <FontAwesomeIcon  icon={faArrowDownZA} style={{width:20,height:20}}/>
            </button>
            {!!showFilters && <div className={'alphabetical-range-content'}>
                {query.startWith ?
                    <Link
                        className={
                            `alphabetical-range-widget-item active-item current-query ${
                                query?.startWith?.length > 3 && 'current-query-over'}`
                        }
                        key={'X'} href={{
                        pathname: pathname,
                        query: {...query, startWith: query?.startWith?.slice(0, -1)}
                    }}>

                        {query?.startWith} X

                    </Link>
                    : null
                }
                <Link key={'all'}
                      href={queryRemover(pathname, query)}
                      className={`alphabetical-range-widget-item ${!query.startWith ? 'active-item' : ''}`}>
                    All
                </Link>

                {renderRange}

            </div>}

        </AlphabeticalNumericalRangeLinksWidgetStyledDiv>
    );
};
export default AlphabeticalNumericalRangeLinksWidget;
