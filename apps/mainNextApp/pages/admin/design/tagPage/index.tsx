import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'), {ssr: false});

const tagPage = () => {
    return (
        <StyleSection name='tagPageStyle' title='Tag Page Page Design :'/>
    );
};

export default tagPage;
