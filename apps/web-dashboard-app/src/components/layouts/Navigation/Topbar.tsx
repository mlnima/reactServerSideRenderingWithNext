import styled from "styled-components";
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch} from "@store/hooks";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {setSidebarStatus} from "@store/reducers/globalStateReducer";
import {useSelector} from "react-redux";
import {DashboardStore} from "@repo/typescript-types";
import React from "react";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  height: 30px;
  background-color: var(--secondary-background-color, #181818);
  grid-area: admin-panel-topbar;
  opacity: .9;

  .dashboard-navigation-item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    .navigationLink {
      color: #fff;

      svg {
        width: 25px;
        height: 25px;
      }
    }
  }
`

const Topbar = () => {
    const dispatch = useAppDispatch()
    const sidebar = useSelector(({globalState}: DashboardStore) => globalState?.sidebar)
    const AdminSideBarOpenCloseHandler = () => {
        dispatch(setSidebarStatus(!sidebar))
    };

    return (
        <Style>

            <div className={'dashboard-navigation-item'}>
                <span className={'navigationLink'} onClick={AdminSideBarOpenCloseHandler}>
                    <FontAwesomeIcon icon={faBars}/>
                </span>
                <a className={'navigationLink'} href={'/'} target={'_blank'}>
                    <FontAwesomeIcon icon={faHome}/>
                </a>

            </div>


            <div className={'dashboard-navigation-item'}>

                <NavLink to="/dashboard/settings/widgets" className={'navigationLink'}>Widgets</NavLink>
                <NavLink to="/dashboard/assets?assetsType=posts&size=20" className={'navigationLink'}>Posts</NavLink>
                {/*<NavLink to="/dashboard/settings/customColors" className={'navigationLink'}>Colors</NavLink>*/}
                <NavLink to="/dashboard/settings/initialSettings" className={'navigationLink'}>Initial Settings</NavLink>
                <NavLink to="/dashboard/fileManager" className={'navigationLink'}>File Manager</NavLink>
                <NavLink to="/dashboard/meta?new=1" className={'navigationLink'}>New Meta</NavLink>
                <NavLink to="/dashboard/tools" className={'navigationLink'}>Tools</NavLink>
            </div>

            <nav id={'main-navigation'} className={'dashboard-navigation-item'}>
                <span className={'navigationLink'}>
                    <FontAwesomeIcon icon={faUser}/>
                </span>
            </nav>

        </Style>
    )
};
export default Topbar