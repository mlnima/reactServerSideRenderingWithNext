import React, { useEffect, useState, useContext, useRef, createRef } from 'react';
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

    let HoverOnTitle = (props) => {
        if (props.post._id === state.hoveredId) {
            let editPostPath = `/admin/post?id=${ props.post._id }`;
            if (props.post.status === 'trash') {
                return (
                    <th className='postControlOptions'>
                        <Link href={ editPostPath }><a><button>Edit</button></a></Link>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'delete') }>Delete</button>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'draft') }>Draft</button>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'pending') }>Pending</button>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'published') }>Publish</button>
                        <button>View</button>
                    </th>
                )
            }else if (props.post.status === 'published'){
                return (
                    <th className='postControlOptions'>
                        <Link href={ editPostPath }><a><button>Edit</button></a></Link>
                        {/*<button onClick={ () => onDeletePermanentlyHandler(props.post._id) }>Delete</button>*/}
                        <button onClick={ () => contextData.functions.bulkActionPost([ state.hoveredId ], 'trash') }>Trash</button>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'draft') }>Draft</button>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'pending') }>Pending</button>
                        <button>View</button>
                    </th>
                )
            }else {
                return (
                    <th className='postControlOptions'>
                        <Link href={ editPostPath }><a><button>Edit</button></a></Link>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'draft') }>Draft</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ state.hoveredId ], 'pending') }>Pending</button>
                        <button>View</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ state.hoveredId ], 'trash') }>Trash</button>
                        <button onClick={ () =>  contextData.functions.bulkActionPost([ state.hoveredId ], 'published') }>Publish</button>
                    </th>
                )
            }

        } else return null
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

    let renderPosts = props.postsSource.posts.map(post => {

        const renderTags = post.tags.map(item => {
            return (
                <Link href='/' key={ item } > <a className='tagPreviewItem'>{ item }</a>,</Link>)
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
                <HoverOnTitle post={ post }/>
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