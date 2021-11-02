import styled from "styled-components";
import {useSelector} from "react-redux";
const ActionOnPostStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .custom-select{
    width: 100%;
    margin: 10px 0;
  }
`

const ActionOnPost = props => {
    const post = useSelector((store) => store?.adminPanelPosts.post);

    const onViewHandler = () => {
        window.open(`/post/${post.postType}/${post._id}`, '_blank')
    }

    return (
        <ActionOnPostStyledDiv className='action-on-the-post'>
            <button className='btn btn-secondary' onClick={() => onViewHandler()}>View</button>
            <select className='custom-select' name='status' value={post.status || 'draft'} onChange={e => props.onChangeHandler(e)}>
                <option value='published'>Published</option>
                <option value='draft'>Draft</option>
                <option value='trash'>Trash</option>
                <option value='pending'>Pending</option>
                <option value='reported'>Reported</option>
            </select>
            <button className='btn btn-primary' onClick={() => props.onSaveHandler()}>{post._id ? 'update' : 'save'}</button>
        </ActionOnPostStyledDiv>
    );
};

export default ActionOnPost;