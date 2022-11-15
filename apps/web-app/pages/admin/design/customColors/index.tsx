import dynamic from "next/dynamic";
import styled from "styled-components";

const StyleSection = dynamic(() => import("../../../../components/adminIncludes/design/StyleSection/StyleSection"), {ssr: false})

const Style = styled.div`

`
const customColors = () => {
    return (
        <Style>
            <StyleSection name={'customColors'} title={'Custom Colors :'}/>
        </Style>
    );
};


export default customColors;
