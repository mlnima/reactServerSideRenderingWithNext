import React from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import ColorSection from "../../../../components/adminIncludes/design/ColorSection";
import TextSection from "../../../../components/adminIncludes/design/TextSection";

const postElement = () => {

    return (
        <AdminLayout>
            <div className='post-element-design adminDesignSectionItems'>
                <ColorSection designName='postElementTitleTextColor'/>
                <ColorSection designName='postElementBackgroundColor'/>
                <ColorSection designName='postElementProgressbarBackgroundColor'/>
                <ColorSection designName='postElementProgressbarTextColor'/>
                <ColorSection designName='postElementProgressbarValueColor'/>
                <ColorSection designName='postElementOnImageTextColor'/>
                <ColorSection designName='postElementOnImageTextBackgroundColor'/>
                <TextSection designName='postElementTitleTextAlign'/>
            </div>
        </AdminLayout>
    );
};
export default postElement;
