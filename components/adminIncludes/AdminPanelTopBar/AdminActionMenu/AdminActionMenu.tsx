import styled from "styled-components";
import React, {FC} from "react";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

let StyledDiv = styled.div`
  position: relative;

  .admin-panel-topbar-action-menu-items {
    background-color: #33373c;
    position: absolute;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    width: 200px;
    border-radius: 3px;

    .AdminActionMenuItem {
    @include transparentLightTextBtn;
      padding: 10px;
    }
  }

  &:hover > .admin-panel-topbar-action-menu-items {
    display: flex;
  }
`

const AdminActionMenu: FC = () => {
    return (
        <StyledDiv className='admin-panel-topbar-action-menu'>
                <span className={'adminActionBtn adminTopBarItem'}>
                    <SvgRenderer svgUrl={'/public/asset/images/icons/user-solid.svg'}
                                 size={20}
                                 customClassName={'show-password'}
                                 color={'var(--serachbar-widget-text-color, #fff)'}/>
                </span>
            <div className={'admin-panel-topbar-action-menu-items'}>
                <button className='AdminActionMenuItem adminTopBarItem'> My Profile</button>
                <button className='AdminActionMenuItem adminTopBarItem'> Edit My Profile</button>
                <button className='AdminActionMenuItem adminTopBarItem'> Log Out</button>
            </div>

        </StyledDiv>
    );
};

export default AdminActionMenu;