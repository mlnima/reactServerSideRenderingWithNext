import {FC} from "react";
import styled from "styled-components";
import {formatRelative} from 'date-fns';

const Style = styled.span`
  gap: 8px;
  color: var(--secondary-text-color, #ccc);
`;

interface PropTypes {
    startDate: Date
}

const StartDate: FC<PropTypes> = ({startDate}) => {

    return (
        <Style className={'sub-content'}>
            {startDate && formatRelative(new Date(startDate), new Date())}
        </Style>
    )
};
export default StartDate;