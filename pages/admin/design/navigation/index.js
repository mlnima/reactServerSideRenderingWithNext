import React, {useEffect, useState, useRef, useContext} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import './navigationAdmin.scss';
import withRouter from 'next/dist/client/with-router'
import StyleSection from "../../../../components/adminIncludes/design/StyleSection/StyleSection";

const navigation = () => {

    return (
        <AdminLayout>
            <StyleSection name='navigationStyle' title='Navigation Design :' />
        </AdminLayout>
    )

};
export default withRouter(navigation);