import React from 'react';
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const Component = () => {

    return (
        <div>

        </div>
    );
};

Component.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export default Component;
