'use client';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSidebarStatus } from '@store/reducers/globalStateReducer';
import menuItems from './menuItems.json';
import { convertVariableNameToName } from '@repo/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusMinus } from '@fortawesome/free-solid-svg-icons/faPlusMinus';
import Link from 'next/link';
import './Sidebar.scss';

interface IMenuItem {
  name:string,
  url: string;
  subItems?: IMenuItem[];
}
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(({globalState}) => globalState.sidebar);
  const [hovered, setHovered] = useState('');

  const renderItems = menuItems.map((item: IMenuItem) => (
    <div key={item.name} className="SideBarItemElement">
      <div className="SideBarItemTitle">
        <Link
          href={item.url}
          onMouseOver={() => setHovered(item.name)}
          className="SideBarItem"
          onClick={() => dispatch(setSidebarStatus(false))}
        >
          {convertVariableNameToName(item.name)}
        </Link>

        {item?.subItems && item?.subItems?.length > 0 ? (
          <span
            className="sidebar-items-switch"
            onMouseOver={() => setHovered(item.name)}
            onClick={() => setHovered( hovered === item.name ? '' : item.name)}
          >
            <FontAwesomeIcon icon={faPlusMinus} className="sidebar-items-switch-icon" />
          </span>
        ) : null}
      </div>
      <div className="SideBarItemElementSubItems custom-scroll">
        {item?.subItems?.map((subItem) => (
          <Link
            key={subItem.url}
            href={subItem.url}
            style={{ display: hovered === item.name ? 'flex' : 'none' }}
            onClick={() => dispatch(setSidebarStatus(false))}
            className="SideBarItem-SubItem"
          >
            {convertVariableNameToName(subItem.name)}
          </Link>
        ))}
      </div>
    </div>
  ));

  return sidebar ? <div id="dashboardSideBar">{renderItems}</div> : null;
};

export default Sidebar;
