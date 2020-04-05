import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from "../../../../context/AppContext";
import withRouter from 'next/dist/client/with-router'

const FilterDropDownActions = props => {
    const contextData = useContext(AppContext);
    const bulkAction = useRef(null);
    const typeToDisplay = useRef(null);

    const [ state, setState ] = useState({});

    useEffect(() => {
        console.log( props)
    }, [props]);
    const onFormatChangeHandler = e => {

        // if (bulkAction.current.value !== 'none') {
        //     contextData.setState({
        //         ...contextData.state,
        //         loading:true
        //     });
        //     postsBulkAction(contextData.postsData.checkedPosts,bulkAction.current.value).then(()=>{
        //        setData()
        //     }).catch(err=>{
        //         contextData.setState({
        //             ...contextData.state,
        //             loading:false
        //         })
        //     })
        // }
    };

    const changePostsTypeToDisplay = e => {
        props.router.push({
            pathname:props.router.pathname,
            query:{...props.query,type:e.target.value}})
        // if (e.target.value !== 'none') {
        //     contextData.setPostsData({
        //         ...contextData.postsData,
        //         type: e.target.value
        //     })
        // }
    };

    const onEmptyTrashHandler = () => {
        // emptyTrash().then(res=>{
        //     if (res.data.error){
        //         contextData.setState({
        //             ...contextData.state,
        //             report:res.data.message,
        //             reportColor:'red'
        //         })
        //     }else {
        //         contextData.setState({
        //             ...contextData.state,
        //             loading: false
        //         });
        //         setData();
        //         contextData.setState({
        //             ...contextData.state,
        //             report:res.data.message,
        //             reportColor:'green'
        //         })
        //     }
        // }).catch(()=>{
        //     contextData.setState({
        //         ...contextData.state,
        //         report:'Can Not Communicate With Server'
        //     })
        // })
    }

    const EmptyTrash = () => {
        // if (contextData.postsData.status === 'Trash'){
        //     return (
        //         <button onClick={()=>onEmptyTrashHandler()}>Empty Trash</button>
        //     )
        // }else
        return null
    };

    return (
        <div className='FilterDropDownActions'>
            <div className="bulkAction">
                <select ref={ bulkAction } placeholder='Bulk Actions'>
                    <option value='none'>Bulk Actions</option>
                    <option value='Published'>Published</option>
                    <option value='Draft'>Draft</option>
                    <option value='Trash'>Trash</option>
                </select>
                <button className='actionBtn' onClick={ () => onFormatChangeHandler() }>Apply</button>
            </div>
            <div className="DateCategoryFormat">
                <select ref={ typeToDisplay } onChange={ e => changePostsTypeToDisplay(e) }>
                    <option value='all'>All</option>
                    <option value='video'>Video</option>
                    <option value='standard'>Standard</option>
                </select>
            </div>
            <EmptyTrash/>
        </div>
    );
};
export default withRouter(FilterDropDownActions) ;