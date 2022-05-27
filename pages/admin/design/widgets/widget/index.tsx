import React from 'react';
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const widget = () => {

    return (
        <div>
            widget
        </div>
    );
};



widget.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export default widget;
