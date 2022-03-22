import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {adminEditPost, adminSaveNewPost, adminUpdatePost} from "@store/adminActions/adminPanelPostsActions";
import {setAlert} from "@store/clientActions/globalStateActions";
const ActionOnPostStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .custom-select{
    width: 100%;
    margin: 10px 0;
  }
`

const ActionOnPost = () => {
    const post = useSelector((store:StoreTypes) => store?.adminPanelPosts.post);
    const userData = useSelector((store:StoreTypes) => store.user.userData);
    const dispatch = useDispatch()

    const onViewHandler = () => {
        window.open(`/post/${post?.postType}/${post?._id}`, '_blank')
    }

    const onSaveHandler = async () => {
        try {
            if (post?._id) {
                // @ts-ignore
                dispatch(adminUpdatePost({...post,author: post?.author ? post.author : userData?._id}))
            } else {
                // @ts-ignore
                dispatch(adminSaveNewPost({...post,author: userData?._id},router))
            }
        } catch (error) {
            // @ts-ignore
            dispatch(setAlert({message: error.stack, type: 'error', active: true}))
        }
    }


    return (
        <ActionOnPostStyledDiv className='action-on-the-post'>
            <button className='btn btn-secondary' onClick={() => onViewHandler()}>View</button>
            <select className='custom-select'
                    name='status'
                    value={post.status || 'draft'}
                    onChange={e =>  dispatch(adminEditPost({[e.target.name]: e.target.value}))}
            >
                <option value='published'>Published</option>
                <option value='draft'>Draft</option>
                <option value='trash'>Trash</option>
                <option value='pending'>Pending</option>
                <option value='reported'>Reported</option>
            </select>
            <button className='btn btn-primary' onClick={() => onSaveHandler()}>{post._id ? 'update' : 'save'}</button>
        </ActionOnPostStyledDiv>
    );
};

export default ActionOnPost;