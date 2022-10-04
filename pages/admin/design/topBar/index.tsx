import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const topBar = () => {
    return (
        <StyleSection name='topBarStyle' title='Top Bar Design :'/>
    );
};

export default topBar;
