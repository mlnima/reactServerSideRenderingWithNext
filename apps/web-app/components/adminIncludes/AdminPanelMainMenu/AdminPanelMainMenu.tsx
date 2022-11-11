import Link from "next/link";
import {convertVariableNameToName} from "custom-util";
import styled from "styled-components";
import { useSelector} from "react-redux";
import {setSidebarStatus} from "../../../store_toolkit/adminReducers/adminPanelGlobalStateReducer";
import React, { useState} from "react";
import {useAdminDispatch} from "../../../store_toolkit/hooks";
import {Store} from "typescript-types";
import SvgRenderer from "../../global/commonComponents/SvgRenderer/SvgRenderer";

let StyledDiv = styled.div`
  position: absolute;
  font-size: 12px;
  left: 0;
  top: 40px;
  grid-area: adminSideBar;
  min-height: 100%;
  width: 256px;
  background-color: var(--admin-sidebar-background-color);
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
        color: var(--admin-sidebar-text-color);
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
        color: var(--admin-sidebar-text-color);
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

const AdminPanelMainMenu = () => {
    const dispatch = useAdminDispatch()
    const sidebar = useSelector(({adminPanelGlobalState}: Store) => adminPanelGlobalState?.sidebar)

    const sidebarItems = {
        Dashboard: {
            pathURL: '/admin',

            subItems: []
        },
        Posts: {
            pathURL: '/admin/assets?assetsType=posts',
            subItems: [{name: 'newPost', url: '/admin/post?new=1'}]
        },
        users: {
            pathURL: '/admin/assets?assetsType=users',
            subItems: []
        },
        metas: {
            pathURL: '/admin/assets?assetsType=metas&metaType=categories',
            subItems: [
                {name: 'tags', url: '/admin/assets?assetsType=metas&metaType=tags'},
                {name: 'categories', url: '/admin/assets?assetsType=metas&metaType=categories'},
                {name: 'actors', url: '/admin/assets?assetsType=metas&metaType=actors'}]
        },
        pages: {
            pathURL: '/admin/assets?assetsType=pages',
            subItems: [{name: 'newPage', url: '/admin/page?new=1'}]
        },
        orders: {
            pathURL: '/admin/assets?assetsType=orders',
            subItems: []
        },
        forms: {
            pathURL: '/admin/assets?assetsType=forms',
            subItems: []
        },
        comments: {
            pathURL: '/admin/assets?assetsType=comments',
            subItems: []
        },

        FileManager: {
            pathURL: '/admin/fileManager',
            subItems: []
        },
        Design: {
            pathURL: '/admin/design/widgets',
            subItems: [
                {name: 'topBar', url: '/admin/design/topBar'},
                {name: 'header', url: '/admin/design/header'},
                {name: 'navigation', url: '/admin/design/navigation'},
                {name: 'widgets', url: '/admin/design/widgets'},
                {name: 'postPage', url: '/admin/design/postPage'},
                {name: 'postsPage', url: '/admin/design/postsPage'},

                {name: 'actorPage', url: '/admin/design/actorPage'},
                {name: 'actorsPage', url: '/admin/design/actorsPage'},

                {name: 'categoryPage', url: '/admin/design/categoryPage'},
                {name: 'categoriesPage', url: '/admin/design/categoriesPage'},

                {name: 'tagPage', url: '/admin/design/tagPage'},
                {name: 'tagsPage', url: '/admin/design/tagsPage'},

                {name: 'metasPage', url: '/admin/design/metasPage'},
                {name: 'cards', url: '/admin/design/cards'},
                {name: 'footer', url: '/admin/design/footer'},
                {name: 'customStyles', url: '/admin/design/customStyles'},
                {name: 'customColors', url: '/admin/design/customColors'},
            ]
        },
        Tools: {
            pathURL: '/admin/tools',
            subItems: [
                {
                    name: 'terminal',
                    url: '/admin/tools/terminal'
                }
            ]
        },
        Settings: {
            pathURL: '/admin/settings',
            subItems: [
                {name: 'customScript', url: '/admin/settings/customScript'},
                {name: 'general', url: '/admin/settings/general'},
                {name: 'membership', url: '/admin/settings/membershipSettings'},
                {name: 'eCommerce', url: '/admin/settings/eCommerceSettings'},
            ]
        },
        Translations: {
            pathURL: '/admin/translations',
            subItems: []
        },
        Importer: {
            pathURL: '/admin/importer',
            subItems: [
                {name: 'youtube', url: '/admin/importer/youtube'},
                {name: 'content', url: '/admin/importer/content'},
                {name: 'Posts', url: '/admin/importer/postsImporter'},
            ]
        },
        Exporter: {
            pathURL: '/admin/exporter',
            subItems: [
                {name: 'posts', url: '/admin/exporter/postsExporter'},
            ]
        }
    }

    const [hovered, setHovered] = useState('')

    const renderItems = Object.keys(sidebarItems).map((item: string) => {
        return (
            <div key={item} className='SideBarItemElement'>
                <div className='SideBarItemTitle'>
                    <Link className='SideBarItem' href={sidebarItems[item].pathURL} onClick={() => dispatch(setSidebarStatus(false))}>
                            {convertVariableNameToName(item)}
                    </Link>
                    {sidebarItems[item].subItems?.length ?
                        <span className={'sidebar-items-switch'}
                              onMouseOver={() => setHovered(item)}
                              onClick={() => hovered === item ? setHovered('') : setHovered(item)}
                        >
                            <SvgRenderer svgUrl={'/asset/images/icons/sort-down-solid.svg'}
                                         size={25}
                                         customClassName={'sidebar-items-switch-icon'}
                                         customStyle={
                                             `transform:${ hovered === item ? `rotate(-90deg);` : `rotate(0deg);`}`
                                         }
                                         color={'var(--main-text-color, #fff)'}
                            />
                       </span>
                        : null}

                </div>
                <div className='SideBarItemElementSubItems'>
                    {sidebarItems[item]?.subItems?.map(subItem => {
                        return (
                            <Link className='SideBarItem-SubItem'
                                  key={subItem.url} href={subItem.url}
                                  style={{
                                      display: hovered === item ? 'flex' : 'none'
                                  }}
                                  onClick={() => dispatch(setSidebarStatus(false))}
                            >
                                    {convertVariableNameToName(subItem.name)}

                            </Link>
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
export default AdminPanelMainMenu;
