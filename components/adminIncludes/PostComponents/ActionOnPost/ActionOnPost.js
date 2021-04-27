import {useRef} from 'react';
import styled from "styled-components";

let StyledDiv = styled.div`
  width: 100%;
  background-color: white;
  .ActionOnPostItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .saveDraftBtn, .previewBtn {
        background-color: #f1f1f1;
        color: black;
        outline: none;
        border: .4px #9fa3a8 solid;
        padding: 8px 10px;
        border-radius: 5px;
        &:active{
          background-color: white;
          border:none;
        }
 
        &:active{
           background-color: white;
           color: #24282d;
        }
    }
    select{
       border: none;
       background-color: #f1f1f1;
       padding: 4px;
       border-radius: 5px;
       margin: 10px 0;
    }
    .SaveBtn {
      background-color: #0085ba;
      color: white;
      outline: none;
      border: none;
      padding: 5px 15px;
      border-radius: 5px;
      box-shadow: 0 1px 0 #006799;
      &:active{
        background-color: white;
        color: #24282d;
      }
    }
  }
`
const ActionOnPost = props => {

    const saveBtn = useRef(null)
    const onViewHandler = () => {
        window.open('/post/' + props.postData.title + '?id=' + props.postData._id, '_blank')
    }

    return (
        <StyledDiv className='ActionOnPost'>
            <div className='ActionOnPostItem'>
                <button className='previewBtn' onClick={() => onViewHandler()}>View</button>
            </div>
            <div className='ActionOnPostItem'>
                <select name='status' value={props.postData.status} onChange={e => props.onChangeHandler(e)}>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                    <option value='reported'>Reported</option>
                </select>
            </div>
            <div className='ActionOnPostItem'>
                <button ref={saveBtn} className='SaveBtn' onClick={() => props.onSaveHandler()}>Save</button>
            </div>
        </StyledDiv>
    );
};

export default ActionOnPost;