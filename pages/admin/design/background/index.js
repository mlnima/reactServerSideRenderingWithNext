import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import { AppContext } from '../../../../context/AppContext'
import UrlSection from '../../../../components/adminIncludes/design/UrlSection'
import ColorSection from "../../../../components/adminIncludes/design/ColorSection";

const background = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log( contextData.siteDesign)
    }, [contextData.siteDesign]);

    return (
        <AdminLayout>
            <h1>Background Settings :</h1>
            <div className='admin-panel-background-setting'>
                <UrlSection designName='bodyBackgroundImage'/>
                <UrlSection designName='bodyBackgroundPosition'/>
                <UrlSection designName='bodyBackgroundSize'/>
                <UrlSection designName='bodyBackgroundRepeat'/>
                <UrlSection designName='bodyBackgroundAttachment'/>
                {/*<UrlSection designName='bodyBackgroundColor'/>*/}
                <ColorSection designName='bodyBackgroundColor'/>
            </div>
        </AdminLayout>
    );
};
export default background;
