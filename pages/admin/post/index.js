import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import './post.scss'
import { AppContext } from "../../../context/AppContext";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import PostCategoriesTagsActors from "../../../components/adminIncludes/PostComponents/PostCategoriesTagsActors/PostCategoriesTagsActors";
import VideoInformation from "../../../components/adminIncludes/PostComponents/VideoInformation/VideoInformation";

const Index = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});

    const onChangeHandler = e => {
        contextData.dispatchEditingPostData({
            ...contextData.editingPostData,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        console.log(contextData.editingPostData)
    }, [ contextData.editingPostData ]);


    return (
        <>
            <AdminLayout>
                <div className='Post'>
                    <TitleDescription onChangeHandler={ onChangeHandler }/>
                    <div className="side">
                        <DropDownWidget component={ ActionOnPost } title='action' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget component={ Format } title='Format' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget component={ PostCategoriesTagsActors } type='Category' title='Post Category' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget component={ PostCategoriesTagsActors } type='Tags' title='Post Tags' onChangeHandler={ onChangeHandler }/>
                        <DropDownWidget component={ PostCategoriesTagsActors } type='Actors' title='Post Actors' onChangeHandler={ onChangeHandler }/>
                    </div>
                    <DropDownWidget component={ VideoInformation } title='Video Information' onChangeHandler={ onChangeHandler }/>


                </div>
            </AdminLayout>
        </>
    );
};

Index.getInitialProps = ({ req }) => {
    return {}
};

export default Index;