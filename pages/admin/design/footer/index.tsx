import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});


const footer = () => {
    return (
        <StyleSection name='footerStyle' title='Footer Design :'/>
    );
};

footer.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default footer;
