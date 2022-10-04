import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const navigation = () => {
    return (
        <StyleSection name='navigationStyle' title='Navigation Design :'/>
    )
};

export default navigation;