import React, {useEffect, useState, useRef, useContext} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";

import withRouter from 'next/dist/client/with-router'
import StyleSection from "../../../../components/adminIncludes/design/StyleSection/StyleSection";

const navigation = () => {

    return (

            <StyleSection name='navigationStyle' title='Navigation Design :' />

    )

};
export default withRouter(navigation);