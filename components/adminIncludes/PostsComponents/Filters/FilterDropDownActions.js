import React, {useEffect, useState, useContext, useRef} from 'react';
import { AppContext } from "../../../../context/AppContext";
import './FilterDropDownActions.scss'


const FilterDropDownActions = props => {
    const contextData = useContext(AppContext);
    const bulkAction = useRef(null);
    const typeToDisplay = useRef(null);

    const [state, setState] = useState({});
    // useEffect(() => {
    //     typeToDisplay.current.value = contextData.postsData.type
    // }, []);

    const onFormatChangeHandler = () => {
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


    const changePostsTypeToDisplay = e=>{
        // if (e.target.value !== 'none') {
        //     contextData.setPostsData({
        //         ...contextData.postsData,
        //         type: e.target.value
        //     })
        // }
    };


    const onEmptyTrashHandler = ()=>{
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


    const EmptyTrash =()=>{
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
                <select ref={bulkAction} placeholder='Bulk Actions' >
                    <option value='none'>Bulk Actions</option>
                    <option value='Published'>Published</option>
                    <option value='Draft'>Draft</option>
                    <option value='Trash'>Trash</option>
                </select>
                <button className='actionBtn' onClick={() => onFormatChangeHandler()}>Apply</button>
            </div>
            <div className="DateCategoryFotmat">
                <select ref={typeToDisplay} onChange={e => changePostsTypeToDisplay(e)}>
                    {/*<option value='none'>All formats</option>*/}
                    <option value='Video'>Video</option>
                    <option value='Standard'>Standard</option>
                </select>
            </div>
            <EmptyTrash/>
        </div>
    );
};
export default FilterDropDownActions;