'use client';
import React, {FC, useMemo, useState} from "react";
import Link from 'next/link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownZA} from "@fortawesome/free-solid-svg-icons/faArrowDownZA";
import './AlphabeticalNumericalRangeLinksWidget.styles.scss';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {faArrowUpZA} from "@fortawesome/free-solid-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { v4 as uuidv4 } from 'uuid';

const AlphabeticalNumericalRangeLinksWidget: FC = () => {

    const pathname = usePathname()
    const {push} = useRouter()
    const searchParams = useSearchParams()

    const startWith = useMemo(() => searchParams.get('startWith') || '', [pathname, searchParams]) as string
    const isDisabled = useMemo(() => startWith?.length > 2, [startWith])

    const [showFilters, setShowFilters] = useState(false)

    const range = useMemo(() => {
        return pathname.includes('/actors') ?
            'abcdefghijklmnopqrstuvwxyz'.split('') :
            'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    }, [])

    const renderRange = range.map((letter, index) => {
        return (
            <Link className={`alphabeticalRangeItem ${startWith?.includes(letter) ? 'activeItem' : ''}`}
                  href={{
                      pathname,
                      query: {
                          startWith: !!startWith ? `${startWith + letter}` : letter,
                      }
                  }}
                  style={{
                      pointerEvents: isDisabled ?  'none' : 'auto',
                  }}
                  key={uuidv4()}>
                {startWith ? letter : letter.toUpperCase()}
            </Link>
        )
    })

    return (
        <div className={`alphabeticalRange ${showFilters ? 'alphabeticalRangeShowFilters' : ''}`}>

            <div className={'alphabeticalRangeFilters'}>
                <button className={'filterStartWith btn btn-primary'}
                        aria-label={'show filters'}
                        onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ?
                        <FontAwesomeIcon icon={faArrowUpZA} style={{width: 20, height: 20}}/> :
                        <FontAwesomeIcon icon={faArrowDownZA} style={{width: 20, height: 20}}/>
                    }
                </button>
            </div>


            {showFilters && (
                <div className={'alphabeticalRangeContent'}>
                    {!!startWith && (
                        <Link className={`alphabeticalRangeItem activeItem currentQuery${isDisabled && 'currentQueryOver'}`}
                              key={'X'} href={{
                            pathname: pathname,
                            query: startWith.length > 1 ? { startWith: startWith.slice(0, -1) } : {}
                        }}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{width: 20, height: 20}}/>
                        </Link>
                    )}
                    <Link key={'all'}
                          href={pathname}
                          className={`alphabeticalRangeItem ${!startWith ? 'active-item' : ''}`}>
                        All
                    </Link>

                    {renderRange}

                </div>
            )}

        </div>
    );
};
export default AlphabeticalNumericalRangeLinksWidget;


// href={isDisabled ? '#' : {
//         pathname: pathname,
//         query: query.startWith ? {
//             ...query,
//             startWith: query?.startWith?.length <= 3 ? `${(query?.startWith || '') + Letter}` : query?.startWith,
//             // page: 1
//         } : {
//             ...query,
//             startWith: Letter,
//             // page: 1
//         }
//     }}