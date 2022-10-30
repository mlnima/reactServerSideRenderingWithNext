import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const postPage = () => {
    return (
        <StyleSection name='postsPageStyle' title='PostsRenderer Page Design :' />
    );
};

export default postPage;
