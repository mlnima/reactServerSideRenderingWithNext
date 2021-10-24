// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { AppContext } from "../../../../context/AppContext";
// import Link from 'next/link'
//
// const FilterSearch = props => {
//     let searchInput = useRef(null)
//     const contextData = useContext(AppContext);
//     const [ state, setState ] = useState({
//         keyword: ''
//     });
//
//     useEffect(() => {
//         if (props.query.keyword) {
//             setState({
//                 keyword: props.query.keyword
//             })
//         }
//     }, [ props ]);
//
//     let onSearchHandler = e => {
//         e.preventDefault();
//         contextData.dispatchAdminPostsData(adminPostsData => ({
//             ...adminPostsData,
//             keyword: state.keyword,
//             pageNo: 1
//         }))
//     };
//
//     let onChangeHandler = e => {
//         setState({
//             ...state,
//             keyword: e.target.value
//         })
//     };
//
//     return (
//         <form className='FilterSearch' onSubmit={ (e) => onSearchHandler(e) }>
//             <input ref={ searchInput } value={ state.keyword } onChange={ e => onChangeHandler(e) }/>
//             {/*<RenderClearBtn/>*/ }
//             {/*<button className='actionBtn' type='submit'>Search Posts</button>*/ }
//             <Link href={ {
//                 pathname: props.pathname || props.router.pathname, query: { ...props.query, keyword: state.keyword, page: 1 }
//             } }><a className='adminPaginationActionLink'>Search Posts</a></Link>
//         </form>
//     );
// };
// // export default FilterSearch;