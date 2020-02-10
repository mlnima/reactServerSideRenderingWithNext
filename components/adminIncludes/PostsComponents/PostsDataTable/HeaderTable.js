import React, {useEffect, useState, useContext} from 'react';
import { AppContext } from "../../../../context/AppContext";
import './HeaderTable.scss'


const HeaderTable = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        selectAll: false
    });


    const selectAllHandler = (e) => {

        // if (e.target.checked) {
        //
        //     let allPosts = []
        //     contextData.postsData.posts.forEach(post => {
        //         allPosts.push(post._id)
        //     });
        //     contextData.setPostsData({
        //         ...contextData.postsData,
        //         checkedPosts: allPosts
        //     })
        // } else {
        //     contextData.setPostsData({
        //         ...contextData.postsData,
        //         checkedPosts: []
        //     })
        // }
    };
    return (
        <thead className='HeaderTable'>
        <tr>
            <th><input className=' HeaderTableItemCheckBox' type="checkbox" onChange={(e) => selectAllHandler(e)}/></th>
            <th className='HeaderTableItem'>Title</th>
            <th className='HeaderTableItem hiddenOnMobile'>Author</th>
            <th className='HeaderTableItem hiddenOnMobile'>Categories</th>
            <th className='HeaderTableItem hiddenOnMobile'>Post Tag</th>
            <th className='HeaderTableItem hiddenOnMobile'>Actors</th>
            <th className='HeaderTableItem hiddenOnMobile'>Status</th>
            <th className='HeaderTableItem hiddenOnMobile'>Thumb</th>
        </tr>
        </thead>
    );
};
export default HeaderTable;