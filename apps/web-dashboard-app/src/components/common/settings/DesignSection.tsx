import {FC} from "react";
import styled from "styled-components";
import StyleEditor from "@components/common/StyleEditor";
import {convertVariableNameToName} from "@repo/shared-util";

const Style = styled.div``;

interface PropTypes {
name?:any
}

const DesignSection: FC<PropTypes> = ({name}) => {

    return (
        <div>
            <StyleEditor name={name} title={convertVariableNameToName(name)}/>
        </div>

    )
};
export default DesignSection;