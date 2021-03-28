import React, {useContext} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import ColorSection from "../../../../components/adminIncludes/design/ColorSection";
import TextSection from "../../../../components/adminIncludes/design/TextSection";
import StyleSection from "../../../../components/adminIncludes/design/StyleSection/StyleSection";
import {AppContext} from "../../../../context/AppContext";

const postElement = () => {
    const contextData = useContext(AppContext);
    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]: e.target.value
        })
    }

    return (
        <AdminLayout>
            <div>
                <p>Post Element Size:</p>
                <select name='postElementSize' onChange={e => onChangeHandler(e)} value={contextData.siteDesign.postElementSize}>
                    <option>select</option>
                    <option value='smaller'>smaller</option>
                    <option value='small'>small</option>
                    <option value='medium'>medium</option>
                    <option value='large'>large</option>
                    <option value='larger'>larger</option>
                </select>
            </div>

            <StyleSection name='postElementStyle' title='PostElement Design :'/>
        </AdminLayout>
    );
};
export default postElement;
