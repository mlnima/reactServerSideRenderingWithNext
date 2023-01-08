import {FC} from "react";
import styled from "styled-components";
import StyleEditor from "@components/common/StyleEditor";
import {convertVariableNameToName} from "custom-util";

const Style = styled.div``;

interface PropTypes {
name?:any
}

const DesignSection: FC<PropTypes> = ({name}) => {

    return (
        <StyleEditor name={name} title={convertVariableNameToName(name)}/>
    )
};
export default DesignSection;