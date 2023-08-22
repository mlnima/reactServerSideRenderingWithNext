'use client';
import React, {useState, MouseEvent} from 'react';
import {useRouter} from 'next/navigation'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEraser} from "@fortawesome/free-solid-svg-icons/faEraser";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './Searchbar.styles.scss'

interface IProps {
    locale: string
    dictionary: {
        [key: string]: string
    }
}

const SearchBar: React.FC<IProps> = ({dictionary, locale}) => {
    const {push} = useRouter();
    const [keyword, setKeyword] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

    const onSearchHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (keyword?.length >= 2) {
            if (locale === defaultLocale) {
                push(`/search/${keyword}?page=1`);
            } else {
                push(`/${locale}/search/${keyword}?page=1`);
            }
        }
    };

    const onClearHandler = () => {
        setKeyword('');
    };

    const onCloseForm = (e: MouseEvent) => {
        e.preventDefault()
        if (keyword.length) {
            setKeyword('')
        } else {
            setOpen(!open)
        }
    }

    return (
        <div className={'searchbar'}>

            <button onClick={() => setOpen(!open)}
                    aria-label={'open close search form'}
                    title={dictionary?.['Search'] || 'Search'}
                    className={'open-close-search-form'}>

                <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: 25, height: 25}}/>
            </button>

            <form className={`searchbar-form ${open ? 'searchbar-form-open' : 'searchbar-form-closed'}`}
                  onSubmit={e => onSearchHandler(e)}>

                <span className='btn search-button-widget-close-btn'
                      title={dictionary?.['Close'] || 'Close'}
                      onClick={e => onCloseForm(e)}>
                     <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
                </span>

                {!!keyword?.length &&
                    <span className='btn search-button-widget-clear-keyword'
                          title={dictionary?.['Clear'] || 'Clear'}
                        //@ts-ignore
                          onClick={e => onClearHandler(e)}>
                     <FontAwesomeIcon icon={faEraser} style={{width: 25, height: 25}}/>
                    </span>
                }
                <input type="text"
                       onChange={e => setKeyword(e.target.value)}
                       name='keyword' value={keyword || ''}
                       className='searchbar-input form-control-input'
                       placeholder={dictionary?.['Search'] || 'Search'}
                />
                <button type='submit'
                        className='btn searchbar-submit-btn'
                        title={dictionary?.['Search'] || 'Search'}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: 25, height: 25}}/>
                </button>

            </form>

        </div>
    )

};

export default SearchBar;


