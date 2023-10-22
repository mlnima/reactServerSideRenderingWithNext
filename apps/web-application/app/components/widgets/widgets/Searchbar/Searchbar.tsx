'use client';
import React, {useEffect, useRef, useState} from 'react';
import {useParams, usePathname, useRouter, useSearchParams} from 'next/navigation';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEraser} from "@fortawesome/free-solid-svg-icons/faEraser";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './Searchbar.scss';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setBackgroundFilter, setLoading} from "@store/reducers/globalStateReducer";
import {tr} from "date-fns/locale";

interface IProps {
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const SearchBar: React.FC<IProps> = ({dictionary, locale}) => {
    const {push} = useRouter();
    const searchbarRef = useRef<HTMLDivElement | null>(null)
    const searchInputRef = useRef<HTMLInputElement | null>(null)
    const searchParams = useSearchParams()
    const params = useParams()
    const pathname = usePathname()
    const [keyword, setKeyword] = useState<string>('');
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false);
    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const [isOnFocus, setIsOnFocus] = useState(false)


    useEffect(() => {
        if (!!params?.keyword) {
            setKeyword(typeof params?.keyword === 'string' ? params?.keyword : params?.keyword[0])
        } else {
            setKeyword('')
        }

        setIsOnFocus(false)
    }, [searchParams, pathname]);

    const onSearchHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formElement = event.currentTarget;
        if (keyword?.length >= 3 && keyword?.length <= 50 && params?.keyword !== keyword) {
            if (locale === defaultLocale) {
                push(`/search/${keyword}?page=1`);
            } else {
                push(`/${locale}/search/${keyword}?page=1`);
            }

            dispatch(setLoading(true))
            if (searchInputRef.current) {
                searchInputRef.current?.blur()
            }
        } else {
            formElement.style.animation = 'none';
            setTimeout(() => formElement.style.animation = 'shake 0.5s ease-in-out', 0);
        }
    };


    const onClearHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if (!!keyword) {
            setKeyword('');
            setIsOnFocus(false)
            if (searchInputRef.current) {
                searchInputRef.current.value = ''
            }
        } else {
            if (locale === defaultLocale) {
                push(`/`);
            } else {
                push(`/${locale}`);
            }
        }
    };

    const onCloseForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if (keyword.length > 0) {
            setKeyword('')
        } else {
            setOpen(!open)
        }
    }


    useEffect(() => {
        if (isOnFocus && searchbarRef?.current){
            dispatch(setBackgroundFilter(true))
        }else {
            dispatch(setBackgroundFilter(false))
        }
    }, [isOnFocus]);


    const onFocusHandler = () => {
        setIsOnFocus(true)
        if (searchbarRef.current) {
            searchbarRef.current.style.zIndex = '11'
        }
    }

    const onBlurHandler = () => {
        setIsOnFocus(false)
        if (searchbarRef.current) {
            searchbarRef.current.style.zIndex = 'initial'
        }
    }

    return (
        <>
            <div className={'searchbarWidget'} ref={searchbarRef}>
                <button onClick={() => {
                    setOpen(!open)
                    onFocusHandler()
                }}
                        aria-label={'open close search form'}
                        title={dictionary?.['Search'] || 'Search'}
                        className={'openSearchFormButton'}>

                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: 24, height: 24}}/>
                </button>

                <form className={`searchbarForm ${open ? 'searchbarFormOpen' : 'searchbarFormClosed'}`}
                      onSubmit={e => onSearchHandler(e)}>

                    <button className={'btn searchbarFormCloseButton'}
                            title={dictionary?.['Close'] || 'Close'}
                            type={'button'}
                            onClick={e => {
                                onCloseForm(e)
                                onBlurHandler()
                            }}>
                        {
                            keyword.length > 0 ?
                                <FontAwesomeIcon icon={faEraser} style={{width: 24, height: 24}}/> :
                                <FontAwesomeIcon icon={faXmark} style={{width: 24, height: 24}}/>
                        }

                    </button>

                    {!!keyword?.length &&
                        <button className='btn searchbarFormClearButton'
                                title={dictionary?.['Clear'] || 'Clear'}
                                type={'button'}
                                onClick={e => onClearHandler(e)}>
                            <FontAwesomeIcon icon={faEraser} style={{width: 24, height: 24}}/>
                        </button>
                    }
                    <input type="text"
                           onChange={e => setKeyword(e.target.value)}
                           onFocus={onFocusHandler}
                           onBlur={onBlurHandler}
                           onClick={onFocusHandler}
                           ref={searchInputRef}
                           name='keyword'
                           defaultValue={!!keyword ? decodeURIComponent(keyword) : ''}
                           className={'searchbarInput primaryInput'}
                           placeholder={dictionary?.['Search'] || 'Search'}
                    />
                    <button type='submit'
                            className='btn searchbarSubmitButton'
                            title={dictionary?.['Search'] || 'Search'}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: 24, height: 24}}/>
                    </button>

                </form>

            </div>
        </>
    )

};

export default SearchBar;


