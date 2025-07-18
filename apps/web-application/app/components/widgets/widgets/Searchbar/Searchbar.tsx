'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import './Searchbar.scss';
import { useAppDispatch } from '@store/hooks';
import {
  setBackgroundFilter,
  setLoading,
} from '@store/reducers/globalStateReducer';

import SearchbarKeywordSuggestions from '@components/widgets/widgets/Searchbar/SearchbarKeywordSuggestions';
import { ISuggestion } from '@repo/typescript-types';
import getSearchSuggestion from '@lib/actions/database/search/getSearchSuggestion';

interface IProps {
  locale: string;
  dictionary: {
    [key: string]: string;
  };
}

const SearchBar: React.FC<IProps> = ({ dictionary, locale }) => {
  const { push } = useRouter();
  const searchbarRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState<string>('');
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const DEBOUNCE_DELAY = 300;
  const COOLDOWN_DURATION = 5000;

  const startCooldown = useCallback(() => {
    setIsCooldownActive(true);
    setCooldownRemaining(5);

    const updateCooldown = () => {
      setCooldownRemaining(prev => {
        if (prev <= 1) {
          setIsCooldownActive(false);
          return 0;
        }
        return prev - 1;
      });
    };

    const intervalId = setInterval(updateCooldown, 1000);

    cooldownTimerRef.current = setTimeout(() => {
      clearInterval(intervalId);
      setIsCooldownActive(false);
      setCooldownRemaining(0);
    }, COOLDOWN_DURATION);
  }, []);

  const debouncedGetSuggestions = useCallback(async (searchTerm: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      if (searchTerm.length > 2) {
        const { success, data } = await getSearchSuggestion(searchTerm);
        if (!success || !data || (data && data.suggestions.length < 1)) {
          return;
        }
        setSuggestions(data.suggestions);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  const onSearchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCooldownActive) {
      const formElement = event.currentTarget;
      formElement.style.animation = 'none';
      setTimeout(
        () => (formElement.style.animation = 'shake 0.5s ease-in-out'),
        0,
      );
      return;
    }

    setSuggestions([]);
    const formElement = event.currentTarget;
    if (
      keyword?.length >= 3 &&
      keyword?.length <= 50 &&
      params?.keyword !== keyword
    ) {
      if (locale === defaultLocale) {
        push(`/search/${keyword}?page=1`);
      } else {
        push(`/${locale}/search/${keyword}?page=1`);
      }

      dispatch(setLoading(true));
      startCooldown();

      if (searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    } else {
      formElement.style.animation = 'none';
      setTimeout(
        () => (formElement.style.animation = 'shake 0.5s ease-in-out'),
        0,
      );
    }
  };

  const onClearHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setSuggestions([]);
    if (keyword) {
      setKeyword('');
      setIsOnFocus(false);
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
    } else {
      if (locale === defaultLocale) {
        push(`/`);
      } else {
        push(`/${locale}`);
      }
    }
  };

  const onCloseForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (keyword.length > 0) {
      setKeyword('');
    } else {
      setOpen(!open);
    }
  };

  const onFocusHandler = () => {
    setIsOnFocus(true);
    if (searchbarRef.current) {
      searchbarRef.current.style.zIndex = '11';
    }
  };

  const onBlurHandler = () => {
    setIsOnFocus(false);
    if (searchbarRef.current) {
      searchbarRef.current.style.zIndex = 'initial';
    }
  };

  const onInputChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const userInput = e.target.value;
    setKeyword(userInput);
    debouncedGetSuggestions(userInput);
  };

  useEffect(() => {
    if (isOnFocus && searchbarRef?.current) {
      dispatch(setBackgroundFilter(true));
    } else {
      dispatch(setBackgroundFilter(false));
    }
  }, [isOnFocus]);

  useEffect(() => {
    if (params?.keyword) {
      setKeyword(
        typeof params?.keyword === 'string'
          ? params?.keyword
          : params?.keyword[0],
      );
    } else {
      setKeyword('');
    }
    setSuggestions([]);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setIsOnFocus(false);
  }, [searchParams, pathname, params]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className={'searchbarWidget'} ref={searchbarRef}>
        <button
          onClick={() => {
            setOpen(!open);
            onFocusHandler();
          }}
          aria-label={'open close search form'}
          title={dictionary?.['Search'] || 'Search'}
          className={'openSearchFormButton'}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ width: 24, height: 24 }}
          />
        </button>

        <form
          className={`searchbarForm ${open ? 'searchbarFormOpen' : 'searchbarFormClosed'}`}
          onSubmit={(e) => onSearchHandler(e)}
        >
          <button
            className={'btn searchbarFormCloseButton'}
            title={dictionary?.['Close'] || 'Close'}
            type={'button'}
            onClick={(e) => {
              onCloseForm(e);
              onBlurHandler();
            }}
          >
            {keyword.length > 0 ? (
              <FontAwesomeIcon
                icon={faEraser}
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faXmark}
                style={{ width: 24, height: 24 }}
              />
            )}
          </button>

          {!!keyword?.length && (
            <button
              className="btn searchbarFormClearButton"
              title={dictionary?.['Clear'] || 'Clear'}
              type={'button'}
              onClick={(e) => onClearHandler(e)}
            >
              <FontAwesomeIcon
                icon={faEraser}
                style={{ width: 24, height: 24 }}
              />
            </button>
          )}
          <input
            type="text"
            onChange={onInputChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onClick={onFocusHandler}
            ref={searchInputRef}
            name="keyword"
            defaultValue={keyword ? decodeURIComponent(keyword) : ''}
            className={'searchbarInput primaryInput'}
            placeholder={dictionary?.['Search'] || 'Search'}
          />
          <button
            type="submit"
            className={`btn searchbarSubmitButton ${isCooldownActive ? 'disabled' : ''}`}
            title={isCooldownActive ? `Wait ${cooldownRemaining}s` : dictionary?.['Search'] || 'Search'}
            disabled={isCooldownActive}
          >
            {isCooldownActive ? (
              <span style={{ fontSize: '12px' }}>{cooldownRemaining}</span>
            ) : (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ width: 24, height: 24 }}
              />
            )}
          </button>
        </form>
        {suggestions?.length > 0 && (
          <SearchbarKeywordSuggestions
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />
        )}
      </div>
    </>
  );
};

export default SearchBar;


// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   useParams,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from 'next/navigation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
// import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
// import './Searchbar.scss';
// import { useAppDispatch } from '@store/hooks';
// import {
//   setBackgroundFilter,
//   setLoading,
// } from '@store/reducers/globalStateReducer';
//
// import SearchbarKeywordSuggestions from '@components/widgets/widgets/Searchbar/SearchbarKeywordSuggestions';
// import { ISuggestion } from '@repo/typescript-types';
// import getSearchSuggestion from '@lib/actions/database/search/getSearchSuggestion';
//
// interface IProps {
//   locale: string;
//   dictionary: {
//     [key: string]: string;
//   };
// }
//
// const SearchBar: React.FC<IProps> = ({ dictionary, locale }) => {
//   const { push } = useRouter();
//   const searchbarRef = useRef<HTMLDivElement | null>(null);
//   const searchInputRef = useRef<HTMLInputElement | null>(null);
//   const searchParams = useSearchParams();
//   const params = useParams();
//   const pathname = usePathname();
//   const [keyword, setKeyword] = useState<string>('');
//   const dispatch = useAppDispatch();
//   const [open, setOpen] = useState<boolean>(false);
//   const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
//   const [isOnFocus, setIsOnFocus] = useState(false);
//   const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
//
//   const onSearchHandler = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setSuggestions([]);
//     const formElement = event.currentTarget;
//     if (
//       keyword?.length >= 3 &&
//       keyword?.length <= 50 &&
//       params?.keyword !== keyword
//     ) {
//       if (locale === defaultLocale) {
//         push(`/search/${keyword}?page=1`);
//       } else {
//         push(`/${locale}/search/${keyword}?page=1`);
//       }
//
//       dispatch(setLoading(true));
//       if (searchInputRef.current) {
//         searchInputRef.current?.blur();
//       }
//     } else {
//       formElement.style.animation = 'none';
//       setTimeout(
//         () => (formElement.style.animation = 'shake 0.5s ease-in-out'),
//         0,
//       );
//     }
//   };
//
//   const onClearHandler = (
//     event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   ) => {
//     event.preventDefault();
//     setSuggestions([]);
//     if (keyword) {
//       setKeyword('');
//       setIsOnFocus(false);
//       if (searchInputRef.current) {
//         searchInputRef.current.value = '';
//       }
//     } else {
//       if (locale === defaultLocale) {
//         push(`/`);
//       } else {
//         push(`/${locale}`);
//       }
//     }
//   };
//
//   const onCloseForm = (
//     event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   ) => {
//     event.preventDefault();
//
//     if (keyword.length > 0) {
//       setKeyword('');
//     } else {
//       setOpen(!open);
//     }
//   };
//
//   const onFocusHandler = () => {
//     setIsOnFocus(true);
//     if (searchbarRef.current) {
//       searchbarRef.current.style.zIndex = '11';
//     }
//   };
//
//   const onBlurHandler = () => {
//     setIsOnFocus(false);
//     if (searchbarRef.current) {
//       searchbarRef.current.style.zIndex = 'initial';
//     }
//   };
//
//   const onInputChangeHandler = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const userInput = e.target.value;
//     setKeyword(userInput);
//
//     if (userInput.length > 2) {
//       const { success, data } = await getSearchSuggestion(userInput);
//       if (!success || !data || (data && data.suggestions.length < 1)) {
//         return;
//       }
//       setSuggestions(data.suggestions);
//     }
//   };
//
//   useEffect(() => {
//     if (isOnFocus && searchbarRef?.current) {
//       dispatch(setBackgroundFilter(true));
//     } else {
//       dispatch(setBackgroundFilter(false));
//     }
//   }, [isOnFocus]);
//
//   useEffect(() => {
//     if (params?.keyword) {
//       setKeyword(
//         typeof params?.keyword === 'string'
//           ? params?.keyword
//           : params?.keyword[0],
//       );
//     } else {
//       setKeyword('');
//     }
//     setSuggestions([]);
//     if (searchInputRef.current) {
//       searchInputRef.current.value = '';
//     }
//     setIsOnFocus(false);
//   }, [searchParams, pathname, params]);
//
//   return (
//     <>
//       <div className={'searchbarWidget'} ref={searchbarRef}>
//         <button
//           onClick={() => {
//             setOpen(!open);
//             onFocusHandler();
//           }}
//           aria-label={'open close search form'}
//           title={dictionary?.['Search'] || 'Search'}
//           className={'openSearchFormButton'}
//         >
//           <FontAwesomeIcon
//             icon={faMagnifyingGlass}
//             style={{ width: 24, height: 24 }}
//           />
//         </button>
//
//         <form
//           className={`searchbarForm ${open ? 'searchbarFormOpen' : 'searchbarFormClosed'}`}
//           onSubmit={(e) => onSearchHandler(e)}
//         >
//           <button
//             className={'btn searchbarFormCloseButton'}
//             title={dictionary?.['Close'] || 'Close'}
//             type={'button'}
//             onClick={(e) => {
//               onCloseForm(e);
//               onBlurHandler();
//             }}
//           >
//             {keyword.length > 0 ? (
//               <FontAwesomeIcon
//                 icon={faEraser}
//                 style={{ width: 24, height: 24 }}
//               />
//             ) : (
//               <FontAwesomeIcon
//                 icon={faXmark}
//                 style={{ width: 24, height: 24 }}
//               />
//             )}
//           </button>
//
//           {!!keyword?.length && (
//             <button
//               className="btn searchbarFormClearButton"
//               title={dictionary?.['Clear'] || 'Clear'}
//               type={'button'}
//               onClick={(e) => onClearHandler(e)}
//             >
//               <FontAwesomeIcon
//                 icon={faEraser}
//                 style={{ width: 24, height: 24 }}
//               />
//             </button>
//           )}
//           <input
//             type="text"
//             onChange={onInputChangeHandler}
//             onFocus={onFocusHandler}
//             onBlur={onBlurHandler}
//             onClick={onFocusHandler}
//             ref={searchInputRef}
//             name="keyword"
//             defaultValue={keyword ? decodeURIComponent(keyword) : ''}
//             className={'searchbarInput primaryInput'}
//             placeholder={dictionary?.['Search'] || 'Search'}
//           />
//           <button
//             type="submit"
//             className="btn searchbarSubmitButton"
//             title={dictionary?.['Search'] || 'Search'}
//           >
//             <FontAwesomeIcon
//               icon={faMagnifyingGlass}
//               style={{ width: 24, height: 24 }}
//             />
//           </button>
//         </form>
//         {suggestions?.length > 0 && (
//           <SearchbarKeywordSuggestions
//             suggestions={suggestions}
//             setSuggestions={setSuggestions}
//           />
//         )}
//       </div>
//     </>
//   );
// };
//
// export default SearchBar;
