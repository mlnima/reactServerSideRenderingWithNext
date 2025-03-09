import Link from "next/link";
import { useAppDispatch } from "@storeDashboard/hooks";
import {setSidebarStatus} from "@storeDashboard/reducers/globalStateReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { DashboardStore } from "@repo/typescript-types";
import React from "react";
import './Topbar.scss'


const Topbar = () => {
  const dispatch = useAppDispatch();
  const sidebar = useSelector(({ globalState }: DashboardStore) => globalState?.sidebar);

  const AdminSideBarOpenCloseHandler = () => {
    dispatch(setSidebarStatus(!sidebar));
  };

  return (
    <div className={'dashboardTopbar'}>
      <div className={'dashboard-navigation-item'}>
                <span className={'navigationLink'} onClick={AdminSideBarOpenCloseHandler}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
        <Link className={'navigationLink'} target={'_blank'} href={'/apps/web-application/public'} passHref>
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>

      <div className={'dashboard-navigation-item'}>
        <Link className={'navigationLink'} href="/admin/appearance/editWidgets" passHref>
          Widgets
        </Link>
        <Link className={'navigationLink'} href="/admin/assets?assetsType=posts&size=20" passHref>
          Posts
        </Link>
        <Link className={'navigationLink'} href="/admin/settings/initialSettings" passHref>
          Initial Settings
        </Link>
        <Link className={'navigationLink'} href="/admin/fileManager" passHref>
          File Manager
        </Link>
        <Link className={'navigationLink'} href="/admin/meta?new=1" passHref>
          New Meta
        </Link>
        <Link  className={'navigationLink'} href="/admin/tools" passHref>
          Tools
        </Link>
      </div>

      <nav id={'main-navigation'} className={'dashboard-navigation-item'}>
                <span className={'navigationLink'}>
                    <FontAwesomeIcon icon={faUser} />
                </span>
      </nav>
    </div>
  );
};

export default Topbar;