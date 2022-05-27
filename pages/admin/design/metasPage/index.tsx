import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'), {ssr: false});

const MetaPage = () => {

    return (
        <StyleSection name='metasPageStyle' title='Meta Page :'/>
    );
};

MetaPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default MetaPage;
