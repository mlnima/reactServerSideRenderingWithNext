import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import { AppContext } from "../../../context/AppContext";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import PostCategoriesTagsActors from "../../../components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors";
import VideoInformation from "../../../components/adminIncludes/PostComponents/VideoInformation/VideoInformation";
import withRouter from "next/dist/client/with-router";
// test query  http://localhost:3000/admin/post?id=123456
const Index = props => {
    const contextData = useContext(AppContext);
    const onChangeHandler = e => {
        contextData.dispatchEditingPostData({
            ...contextData.editingPostData,
            [e.target.name]: e.target.value
        })
    };

    // useEffect(() => {
    //     console.log(contextData.editingPostData)
    // }, [ contextData.editingPostData ]);

    useEffect(() => {
        console.log(props )
        if(props.query.id){
              contextData.functions.getPost(props.query.id).then(post=>{
                  contextData.dispatchEditingPostData({...contextData.editingPostData,...post.data.post})
              })
        }
    }, []);

    return (
        <>
            <AdminLayout>
                <div className='Post'>
                    <TitleDescription onChangeHandler={ onChangeHandler }/>
                    <div className="side">
                        <DropDownWidget component={ ActionOnPost } title='action' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget component={ Format } title='Format' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget isNewPost={ props.query.new === 'true' } component={ PostCategoriesTagsActors } type='categories' title='Post Category' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget isNewPost={ props.query.new === 'true' } component={ PostCategoriesTagsActors } type='tags' title='Post Tags' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget isNewPost={ props.query.new === 'true' } component={ PostCategoriesTagsActors } type='actors' title='Post Actors' onChangeHandler={ onChangeHandler }/>
                    </div>
                    <DropDownWidget component={ VideoInformation } title='Video Information' onChangeHandler={ onChangeHandler }/>
                </div>
            </AdminLayout>
        </>
    );
};


Index.getInitialProps = async ({ query }) => {

    return { query,user:{
            name:'nima'
        } }
};
export default withRouter(Index);