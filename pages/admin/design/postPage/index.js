import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'

const postPage = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AdminLayout>
            <div className='postPage-setting'>
                <h1>Post Page Settings :</h1>
                <h2>Color Comments:</h2>
                <div className='colorSettingSections'>
                    <ColorSection designName='postTitleTextColor'/>
                    <ColorSection designName='postTitleBackgroundColor'/>

                    <ColorSection designName='postMetaDataTextColor'/>
                    <ColorSection designName='postMetaDataBackgroundColor'/>
                    <ColorSection designName='postDownloadBtnTextColor'/>
                    <ColorSection designName='postDownloadBtnBackgroundColor'/>
                    <ColorSection designName='postDescriptionTextColorColor'/>

                    <ColorSection designName='commentsAuthorTextColor'/>
                    <ColorSection designName='commentsDateTextColor'/>
                    <ColorSection designName='commentsBodyTextColor'/>
                    <ColorSection designName='commentsBackgroundColor'/>
                </div>

            </div>
        </AdminLayout>
    );
};
export default postPage;
