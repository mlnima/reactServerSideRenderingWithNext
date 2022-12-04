import {FC} from "react";
import styled from "styled-components";
import {formatRelative} from 'date-fns';
import dateValidator from "custom-util/src/date-utils/dateValidator";

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
            {dateValidator(startDate) && formatRelative(new Date(startDate), new Date())   }
        </Style>
    )
};
export default StartDate;