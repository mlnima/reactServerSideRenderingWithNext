import StyleSection from '@components/adminIncludes/design/StyleSection/StyleSection'
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const postPage = () => {
    return (
        <StyleSection name='postPageStyle' title='Post Page Design :'/>
    );
};

postPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default postPage;
