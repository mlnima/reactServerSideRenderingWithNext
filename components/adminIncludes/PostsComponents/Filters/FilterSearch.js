import React, {useEffect, useState, useContext, useRef} from 'react';
import { AppContext } from "../../../../context/AppContext";
import './FilterSearch.scss'

const FilterSearch = props => {
    let searchInput = useRef(null)
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        keyword: ''
    });
    useEffect(() => {
    }, []);

    let onSearchHandler = e => {
        e.preventDefault();
        contextData.dispatchAdminPostsData(adminPostsData=>({
            ...adminPostsData,
            keyword: state.keyword,
            pageNo:1
        }))
    };

    let onChangeHandler = e => {
        setState({
            ...state,
            keyword: e.target.value
        })
    };

    let onClearHandler = () => {
        // contextData.setPostsData({
        //     ...contextData.postsData,
        //     keyword: '',
        //     pageNo:1
        // })
        // searchInput.current.value = ''
    };

    const RenderClearBtn = () => {
        // if (state.keyword !== '') {
        //     return (
        //         <button type='button' onClick={() => onClearHandler()}>x</button>
        //     )
        // } else
            return null
    };
    return (
        <form className='FilterSearch' onSubmit={(e) => onSearchHandler(e)}>
            <input ref={searchInput} onChange={e => onChangeHandler(e)}/>
            <RenderClearBtn/>
            <button className='actionBtn' type='submit'>Search Posts</button>
        </form>
    );
};
export default FilterSearch;