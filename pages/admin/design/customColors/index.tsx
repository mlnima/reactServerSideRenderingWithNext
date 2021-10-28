import dynamic from "next/dynamic";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const StyleSection = dynamic(() => import("../../../../components/adminIncludes/design/StyleSection/StyleSection"), {ssr: false})

const customStyles = () => {
    return (
        <StyleSection name={'customColors'} title={'Custom Colors :'}/>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default customStyles;
