import {FC} from "react";
import styled from "styled-components";
import {formatDistance} from 'date-fns';

const Style = styled.div`
   margin: auto;
   width: calc(100% - 16px) ;

  span{
    color:var(--secondary-text-color,#ccc);
  }
`;

interface PropTypes {
    startDate:Date
}

const StartDate: FC<PropTypes> = ({startDate}) => {

    return (
        <Style>
            <span>
                    { formatDistance(new Date(startDate), new Date(), {addSuffix: true})}
            </span>
        </Style>
    )
};
export default StartDate;