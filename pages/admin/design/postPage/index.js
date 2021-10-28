import React from 'react';
import dynamic from "next/dynamic";
import {useDispatch, useSelector} from "react-redux";

const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'));

const postPage = () => {

    return (
        <StyleSection name='postPageStyle' title='Post Page Design :'/>
    );
};
export default postPage;
