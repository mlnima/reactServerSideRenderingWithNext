import styled from "styled-components";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";

const SendMessagePopUpHeaderStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 48px;
  padding: 0 10px;

  img {
    width: 30px;
    height: 30px;
  }

  button {
    height: 48px;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const SendMessagePopUpHeader = props => {
    return (
        <SendMessagePopUpHeaderStyledDiv className='send-message-pop-up-header'>
            <img src={props.receiverProfileImage} alt=""/>
            <p>{props.username}</p>
            <button onClick={props.onCloseMessagePop}>
                <SvgRenderer svgUrl={'/asset/images/icons/icons/xmark-solid.svg'}
                             size={20}
                             color={'var(--navigation-text-color, #ccc)'}/>
            </button>
        </SendMessagePopUpHeaderStyledDiv>
    );
};
export default SendMessagePopUpHeader;
