import styled from "styled-components";
import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";

let StyledDiv = styled.div`
  position: relative;
  .admin-panel-topbar-action-menu-items{
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
      padding:10px;
    }
  }
  
  &:hover > .admin-panel-topbar-action-menu-items{
    display: flex;
  }
`

const AdminActionMenu:FC = () => {
        return (
            <StyledDiv className='admin-panel-topbar-action-menu'>
                <span className={'adminActionBtn adminTopBarItem'}>
                    <FontAwesomeIcon style={{width: '20px', height: '20px'}}
                                     //@ts-ignore
                                     icon={faUser}
                                     className={'post-element-info-logo'}
                    />
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