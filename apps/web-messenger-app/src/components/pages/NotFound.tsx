import {FC} from "react";
import styled from "styled-components";

const Style = styled.div``;

interface PropTypes {
}

const NotFound: FC<PropTypes> = ({}) => {
    return (
        <Style>
            <h1>Not Found</h1>
        </Style>
    )
};
export default NotFound;