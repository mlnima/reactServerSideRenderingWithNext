import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'

const HomePageWidgets = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AdminLayout>
            <div id='HomePageWidgets'>
                <AddWidgetMenu/>
            </div>
        </AdminLayout>
    );
};
export default HomePageWidgets;
