import {useSelector} from "react-redux";
import styled from "styled-components";

const DropDownWidgetStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  padding: 10px;

  .post-drop-down-section-header {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 1px;
    background-color: white;
  }

  .post-drop-down-component {
    padding: 10px;
    width: 100%;
    background-color: white;
  }
`
const DropDownWidget = props => {
    const post = useSelector((store) => store?.adminPanelPosts.post);
    if (post.postType !== 'video' && post.type === 'actors') {
        return null
    } else if (post.postType === props.renderFor || props.renderFor === 'all') {
        return (
            <DropDownWidgetStyledDiv className='post-drop-down-section'>
                <div className='post-drop-down-section-header'>
                    <p className='post-drop-down-section-header-title'>{props.title}</p>
                </div>
                <div className="post-drop-down-component">
                    <props.component {...props}/>
                </div>
            </DropDownWidgetStyledDiv>
        );
    } else return null

};
export default DropDownWidget;