import React,{useEffect,useState,useContext} from 'react';

import { AppContext } from "../../../context/AppContext";
import Link from "next/link";
import axios from "axios";
const SideBar = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{


    },[]);

    const generateFakeData = ()=>{
        // const body = {
        //     type: "Video",
        //     size: 1000,
        //     pageNo: 1,
        //     fields: ["author", "title", "imageUrl", "status", "actors", "tags", "categories"],
        //     status: "All",
        //     author: "All",
        //     keyword: ""
        // };
        axios.post('http://localhost:4200/server/posts/admin-postsForTest').then(res => {
            const posts = res.data.posts;
            posts.forEach( async post=>{
                let data={
                    title :post.title.en,
                    categories : post.categories,
                    comments :post.comments,
                    actors :post.actors ,
                    tags :post.tags ,
                    author :'5e322f0f8b2a0637dc3b6a16',
                    description : post.description.en,
                    disLikes : 0,
                    mainThumbnail:post.imageUrl,
                    videoTrailerUrl :post.imagePreviewUrl,
                    videoEmbedCode:post.iframe,
                    likes : 0,
                    duration:post.duration,
                    quality : post.quality,
                    status : 'published',
                    postType : "video",
                    sourceSite : "Xhamster",
                    views : 0,
                    lastModify:Date.now()
                };

                // let dataToSave = {
                //     title:post.title.en,
                //     author:'5e322f0f8b2a0637dc3b6a16',
                //     categories:post.categories,
                //     actors:post.actors,
                //     tags:post.tags,
                //     mainThumbnail:post.imageUrl,
                //     status:post.status,
                //     type:post.type
                // };
                await contextData.functions.savePosts(data)
                // console.log(post. )
            })

        })
    };

if (contextData.settings.adminPanelSideBar){
    return (
        <div className='SideBar'>
            <button onClick={()=>generateFakeData()}>take fake data</button>
            <Link href='/admin/posts'><a className='SideBarItem'>Posts</a></Link>
            <Link href='/admin/media'><a className='SideBarItem'>Media</a></Link>
            <Link href='/admin/psges'><a className='SideBarItem'>Pages</a></Link>
            <Link href='/admin/comments'><a className='SideBarItem'>Comments</a></Link>
            <Link href='/admin/feedback'><a className='SideBarItem'>Feedback</a></Link>
            <Link href='/admin/design'><a className='SideBarItem'>Design</a></Link>
            <Link href='/admin/plugins'><a className='SideBarItem'>Plugins</a></Link>
            <Link href='/admin/users'><a className='SideBarItem'>Users</a></Link>
            <Link href='/admin/setting'><a className='SideBarItem'>Settings</a></Link>
        </div>
    );
}else return null
};
export default SideBar;