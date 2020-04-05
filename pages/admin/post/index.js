import React, { useEffect, useState, useContext, useRef } from 'react';
import {getPost} from '../../../_variables/ajaxPostsVariables';
import {getAbsolutePath} from '../../../_variables/_variables'

import AdminLayout from "../../../components/layouts/AdminLayout";
import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import { AppContext } from "../../../context/AppContext";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import PostCategoriesTagsActors from "../../../components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors";
import VideoInformation from "../../../components/adminIncludes/PostComponents/VideoInformation/VideoInformation";
import withRouter from "next/dist/client/with-router";

const Index = props => {
    const contextData = useContext(AppContext);
    const onChangeHandler = e => {
        contextData.dispatchEditingPostData({
            ...contextData.editingPostData,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        contextData.dispatchEditingPostData({...contextData.editingPostData,...props.post})
    }, []);

    return (
        <>
            <AdminLayout>
                <div className='Post'>
                    <div className="content">
                        <TitleDescription onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget component={ VideoInformation } title='Video Information' onChangeHandler={ onChangeHandler }/>
                    </div>

                    <div className="side">
                        <DropDownWidget component={ ActionOnPost } title='action' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget component={ Format } title='Format' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget isNewPost={ props.query.new === 'true' } component={ PostCategoriesTagsActors } type='categories' title='Post Category' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget isNewPost={ props.query.new === 'true' } component={ PostCategoriesTagsActors } type='tags' title='Post Tags' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget isNewPost={ props.query.new === 'true' } component={ PostCategoriesTagsActors } type='actors' title='Post Actors' onChangeHandler={ onChangeHandler }/>
                    </div>

                </div>
            </AdminLayout>
        </>
    );
};


Index.getInitialProps = async ({ query,req }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let post;
    let postData
    let requestBody;

    if(query.new){
        post={}
    }else if (query.postTitle||query.id){
         requestBody = {
            postTitle: query.postTitle,
            _id: query.id,
        };
        postData = await getPost(requestBody,true,domainName)
        post = postData.data?postData.data.post:{}
    }


    return {post,query }
};
export default withRouter(Index);