import React, { useContext, useState } from 'react';
import { AppContext } from "../../../context/AppContext";
import Link from "next/link";
import {convertVariableNameToName} from '../../../_variables/_variables'
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
        Posts: {
            pathURL: '/admin/posts',
            subItems: []
        },
        FileManager: {
            pathURL: '/admin/fileManager',
            subItems: []
        },
        Comments: {
            pathURL: '/admin/comments',
            subItems: []
        },
        Contacts: {
            pathURL: '/admin/contacts',
            subItems: []
        },
        Design: {
            pathURL: '/admin/design',
            subItems: [ 'topBar','header','navigation','widgets','postPage','footer','customStyle' ]
        },
        Users: {
            pathURL: '/admin/users',
            subItems: []
        },
        Tools: {
            pathURL: '/admin/tools',
            subItems: ['terminal']
        },
        Settings: {
            pathURL: '/admin/settings',
            subItems: ['customScript']
        }
    })

    const [ hovered, setHovered ] = useState('')

    // const generateFakeData = ()=>{
    //     // const body = {
    //     //     type: "Video",
    //     //     size: 1000,
    //     //     pageNo: 1,
    //     //     fields: ["author", "title", "imageUrl", "status", "actors", "tags", "categories"],
    //     //     status: "All",
    //     //     author: "All",
    //     //     keyword: ""
    //     // };
    //     axios.post('http://localhost:4200/server/posts/admin-postsForTest').then(res => {
    //         const posts = res.data.posts;
    //         posts.forEach( async post=>{
    //             let data={
    //                 title :post.title.en,
    //                 categories : post.categories,
    //                 comments :post.comments,
    //                 actors :post.actors ,
    //                 tags :post.tags ,
    //                 author :'5e322f0f8b2a0637dc3b6a16',
    //                 description : post.description.en,
    //                 disLikes : 0,
    //                 mainThumbnail:post.imageUrl,
    //                 videoTrailerUrl :post.imagePreviewUrl,
    //                 videoEmbedCode:post.iframe,
    //                 likes : 0,
    //                 duration:post.duration,
    //                 quality : post.quality,
    //                 status : 'published',
    //                 postType : "video",
    //                 sourceSite : "Xhamster",
    //                 views : 0,
    //                 lastModify:Date.now()
    //             };
    //
    //             // let dataToSave = {
    //             //     title:post.title.en,
    //             //     author:'5e322f0f8b2a0637dc3b6a16',
    //             //     categories:post.categories,
    //             //     actors:post.actors,
    //             //     tags:post.tags,
    //             //     mainThumbnail:post.imageUrl,
    //             //     status:post.status,
    //             //     type:post.type
    //             // };
    //             await contextData.functions.savePosts(data)
    //             // console.log(post. )
    //         })
    //
    //     })
    // };

    const renderItems = Object.keys(state).map(item => {

        const onHoverHandler = state[item].subItems.map(subItem => {
            if (hovered === item) {
                return (
                    <Link href={ state[item].pathURL + '/' + subItem }><a className='SideBarItem-SubItem'>{ convertVariableNameToName(subItem) }</a></Link>
                )
            } else return null

        })

        const RenderArrowsForSubMenus = ()=>{
            if (state[item].subItems.length>0){
                return(
                    <button onClick={ () => hovered === item ? setHovered('') : setHovered(item) }><img className='fontawesomeSvgVerySmall' src={ hovered === item ? SortUpSvg : SortDownSvg  } alt=""/></button>
                )
            }else return null
        }

        return (
            <div key={ item } className='SideBarItemElement'>
                <div className='SideBarItemTitle' onMouseOver={ () => setHovered(item) }>
                    <Link href={ state[item].pathURL }><a className='SideBarItem' >{ convertVariableNameToName(item)  }</a></Link>
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