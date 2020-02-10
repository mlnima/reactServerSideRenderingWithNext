import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from "../../../../context/AppContext";
import './FilterPagination.scss'
import FA from 'react-fontawesome';

const FilterPagination = props => {
    const contextData = useContext(AppContext);
    let currentPageInput = useRef(null);
    let size = useRef(null);
    // const [ state, setState ] = useState({
    //     totalPosts: 0,
    //     perPage: 0,
    //     totalPage: 0,
    //     currentPage: 1
    // });
    // useEffect(()=>{
    //     currentPageInput.current.value = contextData.postsData.pageNo
    //     size.current.value = contextData.postsData.size
    // },[contextData.postsData.pageNo]);

    let nextPage = () => {
        const nextPage = contextData.adminPostsData.pageNo + 1;

        contextData.dispatchAdminPostsData({
            ...contextData.adminPostsData,
            pageNo: nextPage
        })
    };

    let previousPage = () => {
        if ((contextData.adminPostsData.pageNo - 1) <= 0) {
            contextData.dispatchAdminPostsData({
                ...contextData.adminPostsData,
                pageNo: 1
            })
        } else {
            contextData.dispatchAdminPostsData({
                ...contextData.adminPostsData,
                pageNo: contextData.adminPostsData.pageNo - 1
            })
        }

    };

    let lastPage = () => {
        const lastPage = Math.floor(contextData.adminPostsData.totalPosts / contextData.adminPostsData.size)
        contextData.dispatchAdminPostsData({
            ...contextData.adminPostsData,
            pageNo: lastPage
        })
    };

    let firstPage = () => {
        contextData.dispatchAdminPostsData({
            ...contextData.adminPostsData,
            pageNo: 1
        })
    };

    let changePageNoManually = () => {
        if (currentPageInput.current.value <= 0) {
            contextData.dispatchAdminPostsData({
                ...contextData.adminPostsData,
                pageNo: 1
            });
            currentPageInput.current.value = 1
        } else {
            contextData.dispatchAdminPostsData({
                ...contextData.adminPostsData,
                pageNo: currentPageInput.current.value
            })
        }
    };

    let changeSizeHandler = () => {
        contextData.dispatchAdminPostsData({
            ...contextData.adminPostsData,
            size: parseInt(size.current.value)
        })
    }

    return (
        <div className='FilterPagination'>
            <div className='pagesNavigation'>
                <label className='totalPosts'>{ contextData.adminPostsData.totalPosts } items</label>
                <button onClick={ () => firstPage() } className='actionBtn'><FA className='fontawesomeMedium' name="angle-double-left"/></button>
                <button onClick={ () => previousPage() } className='actionBtn'><FA className='fontawesomeMedium' name="angle-left"/></button>
                {/*<input className='pageNumberInput' placeholder={ Math.floor(contextData.adminPostsData.totalPosts / contextData.adminPostsData.size)}  ref={ currentPageInput } type='number' min={ 0 }/>*/}
                <input className='pageNumberInput' placeholder={ contextData.adminPostsData.pageNo}  ref={ currentPageInput } type='number' min={ 0 }/>
                <button onClick={ () => nextPage() } className='actionBtn'><FA className='fontawesomeMedium' name="angle-right"/></button>
                <button onClick={ () => lastPage() } className='actionBtn'><FA className='fontawesomeMedium' name="angle-double-right"/></button>
            </div>
            <div className='pagesNavigationMoreAction'>
                {/*<button onClick={ () => changePageNoManually() }>Go</button>*/}
                {/*<label>of { Math.floor(contextData.adminPostsData.totalPosts / contextData.adminPostsData.size) }</label>*/}
                {/*<select ref={ size } defaultValue={ contextData.adminPostsData.size } onChange={ () => changeSizeHandler() }>*/}
                {/*    <option value={ 5 }>5</option>*/}
                {/*    <option value={ 10 }>10</option>*/}
                {/*    <option value={ 20 }>20</option>*/}
                {/*    <option value={ 50 }>50</option>*/}
                {/*    <option value={ 100 }>100</option>*/}
                {/*    <option value={ 200 }>200</option>*/}
                {/*    <option value={ 500 }>500</option>*/}
                {/*</select>*/}
            </div>
            {/*<input ref={size} onChange={()=>changeSizeHandler()} />*/ }
        </div>
    );
};

FilterPagination.getInitialProps = (ctx) => {
    return { ctx }
};
export default FilterPagination;