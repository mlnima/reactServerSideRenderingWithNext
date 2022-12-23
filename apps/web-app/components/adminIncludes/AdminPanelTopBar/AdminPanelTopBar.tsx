import React, {FC} from 'react';
import AdminActionMenu from "./AdminActionMenu/AdminActionMenu";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {setSidebarStatus} from "@store_toolkit/adminReducers/adminPanelGlobalStateReducer";
import {useRouter} from "next/router";
import {fetchClearCaches} from "@store_toolkit/adminReducers/adminPanelGlobalStateReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import SvgRenderer from "../../global/commonComponents/SvgRenderer/SvgRenderer";
import TopbarQuickAccess from "@components/adminIncludes/AdminPanelTopBar/TopbarQuickAccess/TopbarQuickAccess";


let StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  height: 30px;
  background-color: var(--secondary-background-color, #181818);
  grid-area: admin-panel-topbar;
  opacity: .9;

  .developmentModeSwitch {
    display: flex;
    color: var(--secondary-text-color, #ccc);
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

    .admin-panel-topbar-open-button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .adminTopBarItem {
    background-color: transparent;
    color: var(--admin-topbar-text-color);
    outline: none;
    border: none;
    transition: .4s;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;

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
    const sidebar = useSelector(({adminPanelGlobalState}: Store) => adminPanelGlobalState?.sidebar)

    const AdminSideBarOpenCloseHandler = () => {
        dispatch(setSidebarStatus(!sidebar))
    };

    return (
        <StyledDiv className={'admin-panel-topbar'}>
            <div className={'admin-panel-topbar-control'}>
                    <span className={'admin-panel-topbar-open-button adminTopBarItem'}
                          onClick={AdminSideBarOpenCloseHandler}>
                             <SvgRenderer svgUrl={'/asset/images/icons/bars-solid.svg'}
                                          size={25}
                                          customClassName={'adminTopBarItem-icon'}
                                          color={'var(--main-text-color, #fff)'}
                             />
                    </span>
                <a href={'/'} className={'adminTopBarItem'}>
                    <SvgRenderer svgUrl={'/asset/images/icons/home-solid.svg'}
                                 size={25}
                                 customClassName={'adminTopBarItem-icon'}
                                 color={'var(--main-text-color, #fff)'}
                    />
                </a>
                <p className={'clearCache adminTopBarItem'} onClick={() => dispatch(fetchClearCaches({router}))}>Clear
                    Caches</p>
            </div>
            <TopbarQuickAccess/>
            <AdminActionMenu/>
        </StyledDiv>
    );
};
export default AdminTopBar;