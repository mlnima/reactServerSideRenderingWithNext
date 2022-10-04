import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const customStyles = () => {
    return (
        <StyleSection name='customStyles' title='Custom Styles :'/>
    );
};

export default customStyles;
