import {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AdminActionMenu from "./AdminActionMenu/AdminActionMenu";
import Link from 'next/link'
import {faBars, faHome} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useSelector} from "react-redux";
import {setSidebarStatus} from "@store_toolkit/adminReducers/adminPanelGlobalStateReducer";
import {useRouter} from "next/router";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {fetchClearCaches} from "@store_toolkit/adminReducers/adminPanelGlobalStateReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";


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

const AdminTopBar: FC = () => {
    const router = useRouter()
    const dispatch = useAdminDispatch()
    const sidebar = useSelector(({adminPanelGlobalState}: StoreTypes) => adminPanelGlobalState?.sidebar)

    const AdminSideBarOpenCloseHandler = () => {
        dispatch(setSidebarStatus(!sidebar))
    };

    return (
        <StyledDiv className={'admin-panel-topbar'}>
            <div className={'admin-panel-topbar-control'}>
                    <span className={'admin-panel-topbar-open-button adminTopBarItem'}
                          onClick={AdminSideBarOpenCloseHandler}>
                        {/*//@ts-ignore*/}
                        <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faBars}
                                         className={'post-element-info-logo'}/>
                    </span>
                <Link href={'/'}>
                    <a className={'adminTopBarItem'}>
                        {/*//@ts-ignore*/}
                        <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faHome}
                                         className={'post-element-info-logo'}/>
                    </a>
                </Link>
                <p className={'clearCache adminTopBarItem'} onClick={() => dispatch(fetchClearCaches({router}))}>Clear
                    Caches</p>
            </div>
            <AdminActionMenu/>
        </StyledDiv>
    );
};
export default AdminTopBar;