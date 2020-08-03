import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import ColorSection from "../../../../components/adminIncludes/design/ColorSection";

const postElement = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AdminLayout>
            <div className='post-element-design'>
                <ColorSection designName='postElementTitleTextColor'/>
                <ColorSection designName='postElementBackgroundColor'/>

                <ColorSection designName='postElementProgressbarBackgroundColor'/>
                <ColorSection designName='postElementProgressbarTextColor'/>
                <ColorSection designName='postElementProgressbarValueColor'/>



                <ColorSection designName='postElementOnImageTextColor'/>
                <ColorSection designName='postElementOnImageTextBackgroundColor'/>
            </div>
        </AdminLayout>
    );
};
export default postElement;
