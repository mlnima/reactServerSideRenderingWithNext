import React, { useEffect, useState, useContext, useRef } from 'react';
import { getPost } from '../../../_variables/ajaxPostsVariables';
import { getAbsolutePath } from '../../../_variables/_variables'

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

    const [ state, setState ] = useState({
        tags:[],
        categories:[],
        actors:[]
    })

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const onPostMetaChangeHandler = (type,data)=>{
        setState({
            ...state,
            [type]: data
        })
    }

    useEffect(() => {
        // contextData.dispatchEditingPostData({ ...contextData.editingPostData, ...props.post })
        setState(props.post)
    }, []);

    useEffect(() => {
        console.log( props)
        console.log( state)
    }, [props,state]);

    return (
        <>
            <AdminLayout>
                <div className='Post'>
                    <div className="content">
                        <TitleDescription postData={state} onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget postData={state} component={ VideoInformation } title='Video Information' onChangeHandler={ onChangeHandler }/>
                    </div>

                    <div className="side">
                        <DropDownWidget postData={state} component={ ActionOnPost } title='action' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget postData={state} component={ Format } title='Format' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget postData={state} isNewPost={ props.query.new === 'true' }
                                        component={ PostCategoriesTagsActors }
                                        type='categories' title='Post Category'
                                        onChangeHandler={ onChangeHandler } onPostMetaChangeHandler={onPostMetaChangeHandler}/>
                        <DropDownWidget postData={state} isNewPost={ props.query.new === 'true' }
                                        component={ PostCategoriesTagsActors }
                                        type='tags' title='Post Tags'
                                        onChangeHandler={ onChangeHandler } onPostMetaChangeHandler={onPostMetaChangeHandler}/>
                        <DropDownWidget postData={state} isNewPost={ props.query.new === 'true' }
                                        component={ PostCategoriesTagsActors }
                                        type='actors' title='Post Actors'
                                        onChangeHandler={ onChangeHandler } onPostMetaChangeHandler={onPostMetaChangeHandler}/>
                    </div>

                </div>
            </AdminLayout>
        </>
    );
};

Index.getInitialProps = async ({ query, req }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let post;
    let postData
    let requestBody;

    const newPostData = {
        status:'draft',
        postType:'standard',
        tags:[],
        categories:[],
        actors:[]
    }


    if (query.new) {
        post = newPostData
    } else if (query.postTitle || query.id) {
        requestBody = {
            postTitle: query.postTitle,
            _id: query.id,
        };
        postData = await getPost(requestBody, true, domainName)
        post = postData.data ? postData.data.post : newPostData
    }

    return { post, query }
};
export default withRouter(Index);