import React, { useEffect, useState, useContext, useRef } from 'react';
import Logo from "./Logo/Logo";
import { AppContext } from '../../../context/AppContext'
import SearchInputComponent from '../SearchInputComponent/SearchInputComponent'

const Header = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style:{}
    });
    useEffect(() => {
        setState({
            ...state,
            style:{
                backgroundColor:contextData.siteDesign.headerBackgroundColor,
                color:contextData.siteDesign.headerTextColor
            }
        })
    }, [contextData.siteDesign]);
    return (
        <div className='Header' style={state.style}>
            <Logo/>
            <SearchInputComponent />
        </div>
    );
};
export default Header;


