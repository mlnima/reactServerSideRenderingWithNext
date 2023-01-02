import {FC, useEffect} from "react";
import styled from "styled-components";
import StyleEditor from "@components/common/StyleEditor";
import {useParams} from "react-router-dom";

const Style = styled.div``;

interface PropTypes {

}

const DesignSection: FC<PropTypes> = ({}) => {
    let {section} = useParams();
    // useEffect(() => {
    //     console.log(section)
    // }, [section]);
    return (
        <StyleEditor name={`${section}Style`} title='Top Bar Design :'/>
    )
};
export default DesignSection;