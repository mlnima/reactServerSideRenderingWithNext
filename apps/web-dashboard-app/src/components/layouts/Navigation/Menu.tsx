import React, {FC,  useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "@store/hooks";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import menuItems from './menuItems.json'
import {setSidebarStatus} from "@store/reducers/globalStateReducer";
import {convertVariableNameToName} from "custom-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faUser} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

let StyledDiv = styled.div`
  position: absolute;
  font-size: 12px;
  left: 0;
  top: 40px;
  grid-area: adminSideBar;
  //min-height: 90%;
  width: 256px;
  background-color: var(--secondary-background-color, #181818);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  z-index: 16;

  .SideBarItemElement {
    width: 100%;
    border-bottom: .5px solid #333;
    position: relative;

    .SideBarItemTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .SideBarItem {
        text-decoration: none;
        color: var(--secondary-text-color, #c7c7c7);
        width: 100%;
        padding: 6px 8px;
        margin: 5px;
        display: block;
      }

      .sidebar-items-switch {

        background-color: transparent;
        border: none;
        outline: none;
        padding: 5px 10px;
        color: var(--secondary-text-color, #c7c7c7);
        width: 50px;
        transition: all .5s;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
        }

      }

      &:hover {
        background-color: #181818;
        font-weight: bold;
        transition: opacity 300ms ease-in;
      }

      &:active {
        background-color: white;
      }
    }

    .SideBarItemElementSubItems {
      background-color: #181818;
      position: absolute;
      right: -100%;
      top: 0;
      width: 100%;
      transition: opacity 300ms ease-in;

      .SideBarItem-SubItem {
        color: white;
        padding: 10px 0 10px 20px;
        display: block;
        transition: 1s height;

        &:hover {
          transition: .5s;
          font-weight: bold;
        }
      }
    }

  }
`

interface PropTypes {
}

const Menu: FC<PropTypes> = ({}) => {
    const dispatch = useAppDispatch()
    const sidebar = useSelector(({globalState}: DashboardStore) => globalState?.sidebar)
    const [hovered, setHovered] = useState('')

    const renderItems = Object.keys(menuItems).map((item: string) => {
        return (
            <div key={item} className='SideBarItemElement'>
                <div className='SideBarItemTitle'>
                    {/*//@ts-ignore*/}
                    <NavLink to={menuItems[item].pathURL} className='SideBarItem'> {convertVariableNameToName(item)}</NavLink>

                    {/*//@ts-ignore*/}
                    {menuItems[item].subItems?.length ?
                        <span className={'sidebar-items-switch'}
                              onMouseOver={() => setHovered(item)}
                              onClick={() => hovered === item ? setHovered('') : setHovered(item)}
                        >
                             <FontAwesomeIcon icon={faSortDown} className={'sidebar-items-switch-icon'}/>
                       </span>
                        : null}

                </div>
                <div className='SideBarItemElementSubItems'>
                    {/*//@ts-ignore*/}
                    {menuItems[item]?.subItems?.map(subItem => {
                        return (
                            <NavLink key={subItem.url}
                                     to={subItem.url}
                                      style={{
                                          display: hovered === item ? 'flex' : 'none'
                                      }}
                                     onClick={() => dispatch(setSidebarStatus(false))}
                                     className='SideBarItem-SubItem'>
                                {convertVariableNameToName(subItem.name)}
                            </NavLink>
                        )
                    })
                    }
                </div>
            </div>
        )
    })
    
    if (sidebar) {
        return (
            <StyledDiv className='SideBar'>
                {renderItems}
            </StyledDiv>
        );
    } else return null
};
export default Menu;