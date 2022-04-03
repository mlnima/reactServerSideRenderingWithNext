import Link from "next/link";
import convertVariableNameToName from "../../../_variables/util/convertVariableNameToName";
import withRouter from 'next/dist/client/with-router'
import {uniqueId} from "lodash";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {setSidebarStatus} from "@store/adminActions/adminPanelGlobalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useState} from "react";

// need to rewrite later
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
  opacity: .9;

  .SideBarItemElement {
    width: 100%;
    border-bottom: .5px solid #333;

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

        svg {
          width: 20px;
          height: 20px;
        }

      }

      &:hover {
        background-color: #181818;
        transition: .5s;
        font-weight: bold;
      }

      &:active {
        background-color: white;
      }
    }

    .SideBarItemElementSubItems {
      background-color: #181818;
  
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
    const dispatch = useDispatch()
    const sidebar = useSelector(({adminPanelGlobalState}: StoreTypes) => adminPanelGlobalState?.sidebar)

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
                {name: 'metasPage', url: '/admin/design/metasPage'},
                {name: 'postElement', url: '/admin/design/postElement'},
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

    const renderItems = Object.keys(sidebarItems).map(item => {
        return (
            <div key={item} className='SideBarItemElement'>
                <div className='SideBarItemTitle'>
                    <Link href={sidebarItems[item].pathURL}>
                        <a className='SideBarItem' onClick={() => dispatch(setSidebarStatus(false))}>
                            {convertVariableNameToName(item)}
                        </a>
                    </Link>
                    {sidebarItems[item].subItems?.length ?
                        <span className={'sidebar-items-switch'}
                              onMouseOver={() => setHovered(item)}
                              key={uniqueId('id_')}
                              onClick={() => hovered === item ? setHovered('') : setHovered(item)}
                        >
                            <FontAwesomeIcon icon={faSortDown}
                                             style={{transform: hovered === item ? 'rotate(0deg)' : 'rotate(90deg)'}}
                                             className='fontawesomeSvgVerySmall'/>
                       </span>
                        : null}

                </div>
                <div className='SideBarItemElementSubItems'>
                    {sidebarItems[item].subItems?.length ?
                        sidebarItems[item].subItems.map(subItem => {
                                return (
                                    <Link key={uniqueId('id_')} href={subItem.url}>
                                        <a className='SideBarItem-SubItem'
                                           style={{
                                               display:hovered === item ? 'flex' : 'none'
                                           }}
                                           onClick={() => dispatch(setSidebarStatus(false))}>
                                            {convertVariableNameToName(subItem.name)}
                                        </a>
                                    </Link>
                                )
                        }) : null
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
export default withRouter(AdminPanelMainMenu);

//
// if (hovered === item) {
//     return (
//         <Link key={uniqueId('id_')} href={subItem.url}>
//             <a className='SideBarItem-SubItem'
//                onClick={() => dispatch(setSidebarStatus(false))}>
//                 {convertVariableNameToName(subItem.name)}
//             </a>
//         </Link>
//     )
// } else return null