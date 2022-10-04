import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'), {ssr: false});

const HeaderStyle = () => {
    return (
        <StyleSection name='headerStyle' title='Header Design :'/>
    );
};

export default HeaderStyle;
