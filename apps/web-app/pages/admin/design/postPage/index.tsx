import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const postPage = () => {
    return (
        <StyleSection name='postPageStyle' title='Post Index Design :'/>
    );
};

export default postPage;