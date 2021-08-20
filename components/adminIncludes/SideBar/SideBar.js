import React, {useContext, useState} from 'react';
import {AppContext} from "../../../context/AppContext";
import Link from "next/link";
import {convertVariableNameToName} from '../../../_variables/_variables'
import withRouter from 'next/dist/client/with-router'
import _ from "lodash";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";




let StyledDiv = styled.div`
  position: absolute;
  
  font-size: 14px;
  //position: fixed;
  left: 0;
  top: 0;
  grid-area: adminSideBar;
  min-height: 100%;
  width: 160px;
  background-color: #24282d;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  z-index: 16;

  .SideBarItemElement {
    width: 100%;

    .SideBarItemTitle {
      display: flex;
      justify-content: space-between;

      .SideBarItem {
        text-decoration: none;
        color: white;
        width: 100%;
        padding: 5px 0;
        //transition: .5s;

        margin: 5px;
        display: block;


      }

      button {
        color: :#24282d;
        background-color: transparent;
        border: none;
        outline: none;

      }

      &:hover {
        background-color: #181818;
        font-weight: bold;
      }

      &:active {
        background-color: white;
        color: $dark90;
      }
    }

    .SideBarItemElementSubItems {
      background-color: #181818;
      
      .SideBarItem-SubItem {
        color: white;
        padding: 10px 0 10px 20px;
        display: block;
        &:hover {
          font-weight: bold;
        }
      }
    }

  }
@media only screen and (min-width: 768px) {
  //position: initial;
}
`
const SideBar = props => {
    const contextData = useContext(AppContext);

    const [state, setState] = useState({
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
            pathURL: props.router ? props.router.asPath : '/',
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
            subItems: [ ]
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
            pathURL: '/admin/design',
            subItems: [
                {name: 'topBar', url: '/admin/design/topBar'},
                {name: 'header', url: '/admin/design/header'},
                {name: 'navigation', url: '/admin/design/navigation'},
                {name: 'widgets', url: '/admin/design/widgets'},
                {name: 'postPage', url: '/admin/design/postPage'},
                {name: 'postsPage', url: '/admin/design/postsPage'},
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
        Translations:{
            pathURL: '/admin/translations',
            subItems: []
        },
        Importer: {
            pathURL: '/admin/importer',
            subItems: [
                {name: 'youtube', url: '/admin/importer/youtube'},
                {name: 'content', url: '/admin/importer/content'},
            ]
        },
        Exporter: {
            pathURL: '/admin/exporter',
            subItems: [
                {name: 'posts', url: '/admin/exporter/postsExporter'},
            ]
        }
    })

    const [hovered, setHovered] = useState('')


    const closeAdminSidebar = ()=>{
        contextData.dispatchSettings(settings => ({
            ...settings,
            adminPanelSideBar: false,
        }))
    }


    const renderItems = Object.keys(state).map(item => {
        const onHoverHandler = state[item].subItems.map(subItem => {
            if (hovered === item) {
                return (
                    <Link  key={_.uniqueId('id_')} href={subItem.url} ><a className='SideBarItem-SubItem' onClick={closeAdminSidebar}>{convertVariableNameToName(subItem.name)}</a></Link>
                )
            } else return null

        })
        const RenderArrowsForSubMenus = () => {
            if (state[item].subItems.length > 0) {
                return (
                    <button key={_.uniqueId('id_')} onClick={() => hovered === item ? setHovered('') : setHovered(item)}>
                        <FontAwesomeIcon icon={ hovered === item ? faSortUp : faSortDown} className='fontawesomeSvgVerySmall' />

                    </button>
                )
            } else return null
        }

        return (
            <div key={item} className='SideBarItemElement'>
                <div className='SideBarItemTitle' onMouseOver={() => setHovered(item)}>
                    <Link href={state[item].pathURL}><a className='SideBarItem' onClick={closeAdminSidebar}>{convertVariableNameToName(item)}</a></Link>
                    <RenderArrowsForSubMenus/>
                </div>
                <div className='SideBarItemElementSubItems'>
                    {onHoverHandler}
                </div>
            </div>
        )
    })

    if (contextData.settings.adminPanelSideBar) {
        return (
            <StyledDiv className='SideBar'>
                {renderItems}
            </StyledDiv>
        );
    } else return null
};
export default withRouter(SideBar);