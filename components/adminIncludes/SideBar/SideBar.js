import React, { useContext, useState } from 'react';
import { AppContext } from "../../../context/AppContext";
import Link from "next/link";
import { convertVariableNameToName } from '../../../_variables/_variables'
import axios from "axios";
import SortUpSvg from '../../../static/images/fontawesome/sort-up-solid.svg'
import SortDownSvg from '../../../static/images/fontawesome/sort-down-solid.svg'

const SideBar = props => {
    const contextData = useContext(AppContext);

    const [ state, setState ] = useState({
        Dashboard: {
            pathURL: '/admin',
            subItems: []
        },
        // Posts: {
        //     pathURL: '/admin/posts',
        //     subItems: []
        // },
        Posts: {
            pathURL: '/admin/assets?assetsType=posts',
            subItems: [{name:'newPost',url:'/admin/post?new=1'}]
        },
        users: {
            pathURL: '/admin/assets?assetsType=users',
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
        // Comments: {
        //     pathURL: '/admin/comments',
        //     subItems: []
        // },
        Contacts: {
            pathURL: '/admin/contacts',
            subItems: []
        },
        Design: {
            pathURL: '/admin/design',
            subItems: [
                { name: 'topBar', url: '/admin/design/topBar' },
                { name: 'header', url: '/admin/design/header' },
                { name: 'navigation', url: '/admin/design/navigation' },
                { name: 'widgets', url: '/admin/design/widgets' },
                { name: 'postPage', url: '/admin/design/postPage' },
                { name: 'footer', url: '/admin/design/footer' },
                { name: 'customStyle', url: '/admin/design/customStyle' },
                { name: 'body', url: '/admin/design/body' } ]
        },
        // Users: {
        //     pathURL: '/admin/users',
        //     subItems: []
        // },
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
                { name: 'customScript', url: '/admin/settings/customScript' },
                { name: 'general', url: '/admin/settings/general' } ]
        },
        Importer: {
            pathURL: '/admin/importer',
            subItems: [
                { name: 'youtube', url: '/admin/importer/youtube' },
                ]
        }
    })

    const [ hovered, setHovered ] = useState('')

    const renderItems = Object.keys(state).map(item => {
        const onHoverHandler = state[item].subItems.map(subItem => {
            if (hovered === item) {
                return (
                    <Link href={ subItem.url }><a className='SideBarItem-SubItem'>{ convertVariableNameToName(subItem.name) }</a></Link>
                )
            } else return null

        })
        const RenderArrowsForSubMenus = () => {
            if (state[item].subItems.length > 0) {
                return (
                    <button onClick={ () => hovered === item ? setHovered('') : setHovered(item) }><img className='fontawesomeSvgVerySmall' src={ hovered === item ? SortUpSvg : SortDownSvg } alt=""/></button>
                )
            } else return null
        }

        return (
            <div key={ item } className='SideBarItemElement'>
                <div className='SideBarItemTitle' onMouseOver={ () => setHovered(item) }>
                    <Link href={ state[item].pathURL }><a className='SideBarItem'>{ convertVariableNameToName(item) }</a></Link>
                    <RenderArrowsForSubMenus/>
                </div>
                <div className='SideBarItemElementSubItems'>
                    { onHoverHandler }
                </div>
            </div>
        )
    })

    if (contextData.settings.adminPanelSideBar) {
        return (
            <div className='SideBar'>
                { renderItems }
                {/*<button onClick={()=>generateFakeData()}>take fake data</button>*/ }
            </div>
        );
    } else return null
};
export default SideBar;