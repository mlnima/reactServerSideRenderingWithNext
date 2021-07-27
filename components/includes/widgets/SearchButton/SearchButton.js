import React, {useEffect, useState, useContext, useRef} from 'react';
import {faSearch, faSortDown, faTimes, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SearchButton = props => {
    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        pathURL: '',
        keyword: '',
        queries: {},
        isOpen: false
    });


    const onChangeHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const onOpenHandler = () => {
        open ? setOpen(false) : setOpen(true)
    }


    if (!open) {
        return (
            <button onClick={onOpenHandler} className='search-button-widget-open-btn'>
                <style jsx>{`
                    .search-button-widget-open-btn{
                    border:none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;
                    outline: none;
                    color:var(--navigation-text-color);
                    }
                `}</style>
                <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faSearch} className='search-bar-btn-open-svg'/>
            </button>
        );
    } else return (
        <div className='search-button-widget-form-actions'>
            <style jsx>{`
             .search-button-widget-form-actions{
                 z-index: 10;
                 position: fixed;
                 top: 0;
                 left: 0;
                 right: 0;
                 width: 100%;
                 padding: 0;
                 height: 48px;
                 margin: 0;
                 background-color: black;
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 .search-button-widget-form{
                     display: grid;
                     grid-template-columns: 1fr 36px 66px 36px;
                     width: 100%;
                   .search-button-widget-form-keyword-input{
                         width: calc(100% - 10px);
                       // border-radius: 50px;
                   }
                   .search-button-widget-form-submit-btn{
                        right: 0;
                        padding: 3px;
                        top: 0;
                        border:none;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: transparent;
                        outline: none;
                        color:var(--navigation-text-color);
                        font-size: 1rem;
                   }
                    .search-button-widget-select-type{
                        color:var(--navigation-text-color);
                        width: 60px;
                        padding: 3px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .search-button-widget-close-btn{
                        color:var(--navigation-text-color);
                        width:30px;
                        padding: 3px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                 }

           
             }
           `}</style>
            <form className='search-button-widget-form'>
                <input type="text" onChange={e=>onChangeHandler(e)} name='keyword' value={state.keyword} className='search-button-widget-form-keyword-input'/>
                <button type='submit' className='search-button-widget-form-submit-btn'>
                    <FontAwesomeIcon style={{width: '24px', height: '24px', }} icon={faSearch} />
                </button>
                <span className='search-button-widget-select-type' >
                    <FontAwesomeIcon style={{width: '24px', height: '24px', }} icon={faVideo} />
                    <FontAwesomeIcon style={{width: '24px', height: '24px', }} icon={faSortDown} />
                </span>
                <span  className='search-button-widget-close-btn'>
                <FontAwesomeIcon onClick={onOpenHandler} style={{width: '24px', height: '24px', }} icon={faTimes} />
            </span>
            </form>

        </div>
    )


};
export default SearchButton;
