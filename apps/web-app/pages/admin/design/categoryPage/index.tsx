import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const categoryPage = () => {
    return (
        <StyleSection name='categoryPageStyle' title='Category Index Index Design :' />
    );
};

export default categoryPage;
