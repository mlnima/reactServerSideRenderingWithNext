import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'), {ssr: false});

const HeaderStyle = () => {

    return (
        <StyleSection name='headerStyle' title='Header Design :'/>
    );
};

HeaderStyle.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default HeaderStyle;
