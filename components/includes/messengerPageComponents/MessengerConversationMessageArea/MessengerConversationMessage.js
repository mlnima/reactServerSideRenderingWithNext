import React, {PureComponent} from 'react';
import moment from "moment";
import styled from "styled-components";
const MessengerConversationMessageStyledDiv = styled.div`
  display: flex;
  justify-content: ${props=>    props?.author === props?.currentUserId ? 'flex-end' : 'flex-start'} ;
  margin: 0 2px;
  max-width: 100%;
  padding: 2px;
  .messenger-conversation-message-data{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: ${props=> props?.author === props?.currentUserId ? 'flex-end' : 'flex-start'} ;
    background-color:  ${props=>    props?.author === props?.currentUserId ? '#1877F2' : '#444950'};
    border-radius:  5px ;
    margin: 5px 0 ;
    padding: 0 5px;
    max-width: 90%;
    .messenger-conversation-message-text{
      color: var(--navigation-text-color, #ccc) ;
      padding: 4px 8px;
    //  width: calc(90% );
      word-break: break-word;
      margin: 0;
    }
    .messenger-conversation-message-date{
      display: flex;
      justify-content: flex-end;
      color: var(--navigation-text-color, #ccc) ;
      font-size: x-small;
      width: 100%;
    }
  }


`
class MessengerConversationMessage extends PureComponent {

    render() {
       // console.log(this.props.message.author,this.props.currentUserId,this.props.message.messageBody,this.props)
        return (
            <MessengerConversationMessageStyledDiv className='messenger-conversation-message' author={this.props.message.author} currentUserId={this.props.currentUserId}>
                <div className='messenger-conversation-message-data'>
                    <p className='messenger-conversation-message-text'>
                        {this.props.message.messageBody}
                    </p>
                    <span className='messenger-conversation-message-date'>
                    <p>
                        {moment(new Date(this.props.message.createdAt), "YYYYMMDD").fromNow(false)}
                    </p>
                </span>
                </div>
            </MessengerConversationMessageStyledDiv>
        );
    };
}

export default MessengerConversationMessage;

