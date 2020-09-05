import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import SearchInputComponent from "../widgets/SearchInputComponent/SearchInputComponent";
import {AppContext} from "../../../context/AppContext";

const SearchBarInTopBar = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        colorsStyle: {},
        mobileSearchBarOpen: false,
    });

    useEffect(() => {
       setState({
           ...state,
           colorsStyle: props.colorsStyle
       })
    }, [props]);

    const onMobileSearchBarOpenHandler = () => {
        state.mobileSearchBarOpen ?
            setState({
                ...state,
                mobileSearchBarOpen: false
            }) :
            setState({
                ...state,
                mobileSearchBarOpen: true
            })
    }

    if (contextData.siteIdentity.searchBarInTopBar) {

            if (state.mobileSearchBarOpen) {
                return (
                    <div className='search-bar-top'>
                        <button style={{...state.colorsStyle,backgroundColor:'transparent'}} className='top-bar-item' onClick={onMobileSearchBarOpenHandler}><FontAwesomeIcon style={{...state.colorsStyle,backgroundColor:'transparent'}} icon={faTimes} className='top-bar-item-logo'/></button>
                        <SearchInputComponent searchBtnBackgroundColor={state.colorsStyle.backgroundColor} searchBtnColor={state.colorsStyle.color}/>
                    </div>
                )
            } else {
                return (
                    <div className='search-bar-top'>
                        <button style={{...state.colorsStyle,backgroundColor:'transparent'}} className='top-bar-item' onClick={onMobileSearchBarOpenHandler}><FontAwesomeIcon icon={faSearch} className='top-bar-item-logo'/></button>
                    </div>
                )
            }

    } else return null
};
export default SearchBarInTopBar;
