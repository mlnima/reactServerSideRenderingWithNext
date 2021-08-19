import React, {useState} from 'react';
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";


const SearchButton = props => {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        keyword: '',
        isOpen: false
    });

    const onSearchHandler = e => {
        e.preventDefault()
        if (state.keyword.length > 2) {
            router.push({
                pathname: `/search/${state.keyword}`,
                query: {
                    page: 1
                }
            })
        }
    }

    const onChangeHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const onOpenHandler = () => {
        open ? setOpen(false) : setOpen(true)
    }


    return (
        <>
            <button onClick={onOpenHandler} className='search-button-widget-open-btn'>
                <style jsx>{`
                  .search-button-widget-open-btn {
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;
                    outline: none;
                    color: var(--navigation-text-color);
                  }
                `}</style>
                <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faSearch} className='search-bar-btn-open-svg'/>
            </button>

            {open ?
                <div className='search-button-widget-form-actions'>
                    <style jsx>{`



                      .search-button-widget-form-actions {
                        z-index: 10;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        width: 95%;
                        padding: 0 10px;
                        height: 48px;
                        margin: 0 auto;
                        background-color: var(--topbar-background-color);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        //transition: all 0.5s ease 0s;
                        ${open ? `animation: searchbarFall .3s linear alternate;` : `animation: none;`}
                        .search-button-widget-form {
                          max-width: 400px;
                          display: flex;
                          justify-content: flex-start;
                          align-items: center;
                          width: 100%;

                          .search-button-widget-form-keyword-input {
                            width: calc(100% - 58px);
                          }

                          .search-button-widget-form-submit-btn {
                            right: 0;
                            //padding: 3px;
                            top: 0;
                            border: none;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: transparent;
                            outline: none;
                            color: var(--navigation-text-color);
                            font-size: 1rem;
                            margin: 0 5px;

                          }

                          .search-button-widget-close-btn {
                            color: var(--navigation-text-color);
                            margin: 0 5px;
                          }
                        }
                      }
                    `}</style>
                    <form className='search-button-widget-form' onSubmit={e => onSearchHandler(e)}>
                        <input type="text" onChange={e => onChangeHandler(e)} name='keyword' value={state.keyword} className='search-button-widget-form-keyword-input'/>
                        <button type='submit' className='search-button-widget-form-submit-btn'>
                            <FontAwesomeIcon style={{width: '24px', height: '24px',}} icon={faSearch}/>
                        </button>
                        <span className='search-button-widget-close-btn'>
                           <FontAwesomeIcon onClick={onOpenHandler} style={{width: '24px', height: '24px',}} icon={faTimes}/>
                        </span>
                    </form>

                </div> : null

            }

        </>
    )


};
export default SearchButton;
