import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'), {ssr: false});

const MetaPage = () => {

    return (
        <StyleSection name='metasPageStyle' title='Meta Page :'/>
    );
};

export default MetaPage;
