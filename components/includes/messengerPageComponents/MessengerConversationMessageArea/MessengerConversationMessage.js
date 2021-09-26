import React, {PureComponent} from 'react';
import moment from "moment";

class MessengerConversationMessage extends PureComponent {
    render() {
        return (
            <div className='messenger-conversation-message'>
                <style jsx>{`
                    .messenger-conversation-message{
                        display: flex;
                        justify-content: ${this.props.message.author === this.props.currentUserId ? 'flex-end' : 'flex-start'} ;
                        margin: 0 10px;
                        max-width: 100%;
                        padding: 2px;
                    }
                    .messenger-conversation-message-data{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: ${this.props.message.author === this.props.currentUserId ? 'flex-end' : 'flex-start'} ;
                        background-color:  ${this.props.message.author === this.props.currentUserId ? '#1877F2' : '#444950'};
                        border-radius: 5px;
                        margin: 5px ;
                        padding: 5px;
                        max-width: 90%;
                    }
                    .messenger-conversation-message-text{
                        color: var(--navigation-text-color, #ccc) ;
                        padding: 4px 8px;
                        width: calc(90% );
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
                `}</style>
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
            </div>
        );
    };
}

export default MessengerConversationMessage;

