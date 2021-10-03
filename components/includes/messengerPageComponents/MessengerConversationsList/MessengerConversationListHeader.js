import React from 'react'
import styled from "styled-components";
import Link from "next/link";
import {withTranslation} from "next-i18next";

const MessengerConversationListHeaderStyledDiv = styled.div`
  background-color: var(--navigation-background-color, #18181b);
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .messenger-conversations-list-header-items{
    display: flex;
    justify-content: center;
    align-items: center;

    a{
      color: var(--navigation-text-color,#ccc) ;
      margin: 0 10px;
    }
  }
`


const MessengerConversationListHeader = props => {
    return (
        <MessengerConversationListHeaderStyledDiv className='messenger-conversations-list-header'>
            <div className='messenger-conversations-list-header-items'>
                <Link href={'/'}>
                    <a>
                        {props.t(`common:Home`)}
                    </a>
                </Link>
                <Link href={'/profile'}>
                    <a>
                        {props.t(`common:Profile`)}
                    </a>
                </Link>
            </div>
        </MessengerConversationListHeaderStyledDiv>
    );
};
export default withTranslation(['common'])(MessengerConversationListHeader);
