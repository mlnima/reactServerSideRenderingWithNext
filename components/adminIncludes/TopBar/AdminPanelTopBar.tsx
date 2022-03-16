import {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AdminActionMenu from "./AdminActionMenu/AdminActionMenu";
import Link from 'next/link'
import {faBars, faHome} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {clearCaches, setSidebarStatus} from "@store/adminActions/adminPanelGlobalStateActions";
import {useRouter} from "next/router";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

let StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  height: 30px;
  background-color: var(--admin-topbar-background-color);
  grid-area: admin-panel-topbar;
  opacity: .9;

  .developmentModeSwitch {
    display: flex;
    color: var(--admin-topbar-text-color);
    justify-content: center;
    align-items: center;

    p {
      font-size: .7rem;
      margin: 0 10px;
    }
  }

  .admin-panel-topbar-control {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .adminTopBarItem {
    background-color: transparent;
    color: var(--admin-topbar-text-color);
    outline: none;
    border: none;
    transition: .4s;
    margin: 0 10px;

    &:hover {
      transform: scale(1.1);
    }
  }

  .clearCache {
    &:hover {
      cursor: pointer;
    }
  }
`

const AdminTopBar:FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {sidebar} = useSelector(({adminPanelGlobalState}:StoreTypes) => adminPanelGlobalState)

    const AdminSideBarOpenCloseHandler = () => {
        sidebar ? dispatch(setSidebarStatus(false)) : dispatch(setSidebarStatus(true))
    };

    return (
            <StyledDiv className={'admin-panel-topbar'}>
                <div className={'admin-panel-topbar-control'}>
                    <span className={'admin-panel-topbar-open-button adminTopBarItem'} onClick={AdminSideBarOpenCloseHandler}>
                        <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faBars} className={'post-element-info-logo'}/>
                    </span>
                    <Link href={'/'}>
                        <a className={'adminTopBarItem'}>
                            <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faHome} className={'post-element-info-logo'}/>
                        </a>
                    </Link>
                    <p className={'clearCache adminTopBarItem'} onClick={() => dispatch(clearCaches(router))}>Clear Caches</p>
                </div>
                <AdminActionMenu/>
            </StyledDiv>
    );
};
export default AdminTopBar;