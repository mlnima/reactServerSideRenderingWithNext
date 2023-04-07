import React, {FC} from "react";
import styled from "styled-components";
import DatePickerComponent from "@components/includes/PostEditorForm/common/DatePickerComponent";

const Style = styled.div`
 .date-section {
    display: flex;
    align-items: center;
  }

  @media only screen and (min-width: 768px) {
    .date-section{
      p{
        width: 20%;
      }
    }
  }
`;

interface PropTypes {
    onChangeHandler: any,
    uniqueData: any
}

const EventDates: FC<PropTypes> = ({onChangeHandler, uniqueData}) => {
    return (
        <Style className={'event-dates'}>
            <div className={'date-section field-section'}>
                <p>Start</p>
                <DatePickerComponent onChangeHandler={onChangeHandler}
                                     name={'startDate'}
                                     uniqueData={uniqueData}/>
            </div>
            <div className={'date-section field-section'}>
                <p>End</p>
                <DatePickerComponent onChangeHandler={onChangeHandler} name={'endDate'}
                                     uniqueData={uniqueData}/>
            </div>


        </Style>
    )
};
export default EventDates;