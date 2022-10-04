import dynamic from "next/dynamic";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});


const footer = () => {
    return (
        <StyleSection name='footerStyle' title='Footer Design :'/>
    );
};

export default footer;
