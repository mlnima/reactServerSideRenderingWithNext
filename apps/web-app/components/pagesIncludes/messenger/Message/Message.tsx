// @ts-nocheck
import React, {PureComponent} from 'react';
import {formatDistance} from "date-fns";
import {Styles} from "./Message.styles";


class Message extends PureComponent<any> {


    render() {
        return (
            <Styles className='message'
                    isMine={this?.props?.isMine}>

                <div className='message-data'>
                    <p className='message-text'>
                        {this?.props?.message?.content}
                    </p>
                    <span className='message-date'>
                    <p>
                        {formatDistance(new Date(this?.props?.message?.createdAt), new Date(), {addSuffix: true})}
                    </p>
                </span>
                </div>

            </Styles>
        );
    };
}

export default Message;

