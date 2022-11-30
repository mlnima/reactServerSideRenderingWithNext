import {FC, useState} from "react";
import styled from "styled-components";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Style = styled.div`
    .react-datepicker-wrapper,.react-datepicker__tab-loop{
      *{
        color:var(--secondary-text-color,#ccc);
        background-color:var(--secondary-background-color,#181818)
      }
    }
`;

interface PropTypes {
    onChangeHandler:any,
    name:string,
    uniqueData:any
}

const DatePickerComponent: FC<PropTypes> = ({onChangeHandler,name,uniqueData}) => {

    const onDateChangeHandler = (date)=>{

        const e={
            target:{
                name,
                value:date
            }
        }
        onChangeHandler(e)
    }

    return (
        <Style>
            {/*//@ts-ignore*/}
            <DatePicker selected={new Date(uniqueData?.[name])}
                        className={'form-control-input'}
                        onChange={(date:Date) => onDateChangeHandler(date)}
                        showTimeSelect
                        dateFormat="Pp" />
        </Style>
    )
};
export default DatePickerComponent;