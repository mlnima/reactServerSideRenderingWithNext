import React, { useEffect, useState, useContext, useRef, createRef } from 'react';
// import {Link, withRouter} from "react-router-dom";
// import {updatePostStatus, deletePost, postsBulkAction, getPosts} from "../../../../../variables/_ajaxPostsVariable";
// import QuickEdit from "../QuickEdit/QuickEdit";
// import {adminTokenValidator} from "../../../../../variables/_ajaxAuthVariables";
import { AppContext } from "../../../../context/AppContext";
import withRouter from "next/dist/client/with-router";
import Link from "next/link";

const BodyTable = props => {
    const contextData = useContext(AppContext);
    let selectBoxes = useRef(contextData.adminPosts.map(() => createRef()));
    const [ state, setState ] = useState({
        hoveredId: '',
        isMobile: false
    });

    useEffect(() => {
        if (window.innerWidth < 768) {
            setState({
                ...state,
                isMobile: true
            })
        }
    }, []);

    const setData = () => {
        // getPosts(
        //     contextData.postsData.type, contextData.postsData.size, contextData.postsData.pageNo,
        //     ['author', 'title', 'imageUrl', 'status', 'actors', 'tags', 'categories'], contextData.postsData.status,
        //     contextData.postsData.author, contextData.postsData.keyword).then(res => {
        //     contextData.setPostsData({
        //         ...contextData.postsData,
        //         posts: res.data.posts,
        //         error: res.data.error,
        //         totalCount: res.data.totalCount
        //     });
        //     contextData.setState({
        //         ...contextData.state,
        //         loading: false
        //     });
        // }).catch(() => {
        //     contextData.setState({
        //         ...contextData.state,
        //         login: false
        //     })
        // })
        return null
    };

    const onTrashHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        });
        contextData.functions.bulkActionPost([ state.hoveredId ], 'trash')
    };

    // const onDeletePermanentlyHandler = (id)=>{
    //
    // }

    const onDeletePermanentlyHandler = () => {
        // deletePost(state.hoveredId).then(res => {
        //     const posts = contextData.postsData.posts.filter(post => {
        //         return post._id !== state.hoveredId
        //     });
        //     const report = contextData.state.reports.push(res.data.message)
        //     contextData.setPostsData({
        //         ...contextData.postsData,
        //         posts
        //     });
        //     contextData.setState({
        //         ...contextData.state,
        //         report
        //     })
        // })
    };

    const onRestoreHandler = () => {
        // contextData.setState({
        //     ...contextData.state,
        //     loading: true
        // });
        // postsBulkAction([state.hoveredId], 'Draft').then(res => {
        //     setData()
        // }).catch(err => {
        //     contextData.setState({
        //         ...contextData.state,
        //         loading: false
        //     });
        // })
    };

    let HoverOnTitle = (props) => {

        if (props.post._id === state.hoveredId) {
            let editPostPath = `/admin/post?id=${ props.post._id }`;
            if (props.post.status === 'Trash') {
                return (
                    <div className='postControlOptions'>
                        <Link to={ editPostPath }>Edit</Link>
                        <button onClick={ () => onDeletePermanentlyHandler(props.post._id) }>Delete Permanently</button>
                        <button onClick={ () => onRestoreHandler() }>Move to Draft</button>
                        {/*<button onClick={() => quickEditBtnHandler(props.post._id)}>QEdit</button>*/ }
                    </div>
                )
            } else {
                return (
                    <div className='postControlOptions'>
                        <Link href={ editPostPath }><a>Edit</a></Link>
                        <button onClick={ () => onTrashHandler() }>Trash</button>
                        <button>View</button>
                        {/*<button onClick={() => quickEditBtnHandler(props.post._id)}>QEdit</button>*/ }
                    </div>
                )
            }

        } else return (
            <div className='postControlOptions'>

            </div>
        )
    };

    const onCheckHandler = e => {
        //
        // if (e.target.checked) {
        //     if (!contextData.postsData.checkedPosts.includes(e.target.name)) {
        //         let pushedItemArr = contextData.postsData.checkedPosts;
        //         pushedItemArr.push(e.target.name);
        //         pushedItemArr = [...new Set(pushedItemArr)]
        //         contextData.setPostsData({
        //             ...contextData.postsData,
        //             checkedPosts: pushedItemArr
        //         });
        //     }
        //
        // } else {
        //     if (contextData.postsData.checkedPosts.includes(e.target.name)) {
        //         let pushedItemArr = contextData.postsData.checkedPosts.filter(id => {
        //             return id !== e.target.name
        //         });
        //         pushedItemArr = [...new Set(pushedItemArr)];
        //         contextData.setPostsData({
        //             ...contextData.postsData,
        //             checkedPosts: pushedItemArr
        //         });
        //     }
        // }
    };

    let renderPosts = contextData.adminPosts.map(post => {

        const renderTags = post.tags.map(item => {
            return (
                <Link href='/' key={ item } className='tagPreviewItem'> <a>{ item }</a>,</Link>)
        });

        let author = post.author;
        if (post.author === contextData.userData._id) {
            author = contextData.userData.username
        }

        let isChecked = contextData.adminPostsData.checkedPosts.includes(post._id);
        return (
            <tr key={ post._id } className='BodyTableItems' onTouchStart={ () => {
                setState({ ...state, hoveredId: post._id })
            } } onMouseEnter={ () => {
                setState({ ...state, hoveredId: post._id })
            } }>
                <td className='postColumn'>
                    <div>
                        <input name={ post._id } className=' BodyTableItemCheckBox' type='checkbox'
                               ref={ e => selectBoxes.current[contextData.adminPosts.indexOf(post)] = e }
                               checked={ isChecked }
                               onChange={ (e) => onCheckHandler(e) }/>
                    </div>
                    <div>
                        <p className='BodyTableItem'>{ post.title }</p>
                        <HoverOnTitle post={ post }/>
                    </div>
                    <div>
                        <p className='BodyTableItem author noMobile'>{ author }</p>
                    </div>
                    <div className='tagCategoriesActorsPreview BodyTableItem noMobile'>
                        <span>   { post.categories + ' , ' }</span>


                    </div>
                    <div className='tagCategoriesActorsPreview BodyTableItem noMobile'>
                        <span>   { post.tags + ' , ' }</span>

                    </div>

                    <div className='tagCategoriesActorsPreview BodyTableItem noMobile'>
                        <span>      { post.actors + ' , ' }</span>

                    </div>

                    <div>
                        <p className='BodyTableItem noMobile'>{ post.status }</p>
                    </div>
                    < div>
                        < img className='BodyTableItem noMobile' src={ post.mainThumbnail }/>
                    </div>
                </td>
            </tr>
        )
    });

    return (
        <tbody className='BodyTable'>
        { renderPosts }
        </tbody>
    );
};
export default withRouter(BodyTable);