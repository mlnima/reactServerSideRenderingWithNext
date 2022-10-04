import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'), {ssr: false});

const tagsPage = () => {
    return (
        <StyleSection name='tagsPageStyle' title='Tags Page Page Design :'/>
    );
};

export default tagsPage;
