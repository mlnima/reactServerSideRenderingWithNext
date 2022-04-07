import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {adminEditPost, adminSaveNewPost, adminUpdatePost} from "@store/adminActions/adminPanelPostsActions";
import {setAlert} from "@store/clientActions/globalStateActions";
import {useRouter} from "next/router";

const ActionOnPostStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .custom-select {
    width: 100%;
    margin: 10px 0;
  }
`

const ActionOnPost = () => {

    const ActionOnPostData = useSelector((store: StoreTypes) =>{
        return{
            userId:store.user.userData?._id,
            post:store?.adminPanelPosts.post
        }
    })

    const router = useRouter()
    const dispatch = useDispatch()

    const onViewHandler = () => {
        window.open(`/post/${ActionOnPostData?.post?.postType || 'video'}/${ActionOnPostData?.post?._id}`, '_blank')
    }

    const onSaveHandler = async () => {
        try {
            if (ActionOnPostData?.post?._id) {

                dispatch(adminUpdatePost(
                    {...ActionOnPostData?.post,
                        //@ts-ignore
                        author: ActionOnPostData?.post?.author?._id  || ActionOnPostData?.userId}))
            } else {

                dispatch(adminSaveNewPost(
                    {
                         ...ActionOnPostData?.post,
                          status : ActionOnPostData.post.status || 'draft',
                          author: ActionOnPostData?.userId
                      },
                    router
                ))
            }
        } catch (error) {
            dispatch(setAlert({message: error.stack, type: 'error', active: true}))
        }
    }

    console.log(ActionOnPostData)


    return (
        <ActionOnPostStyledDiv className='action-on-the-post'>
            <button className='btn btn-secondary' onClick={() => onViewHandler()}>View</button>
            <select className='custom-select'
                    name='status'
                    value={ActionOnPostData?.post?.status || 'draft'}
                    onChange={e => dispatch(adminEditPost({[e.target.name]: e.target.value}))}
            >
                <option value='published'>Published</option>
                <option value='draft'>Draft</option>
                <option value='trash'>Trash</option>
                <option value='pending'>Pending</option>
                <option value='reported'>Reported</option>
            </select>
            <button className='btn btn-primary' onClick={() => onSaveHandler()}>{ActionOnPostData?.post._id ? 'update' : 'save'}</button>
        </ActionOnPostStyledDiv>
    );
};

export default ActionOnPost;