import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const categoriesPage = () => {
    return (
        <StyleSection name='categoriesPageStyle' title='Categories Page Page Design :' />
    );
};

export default categoriesPage;
