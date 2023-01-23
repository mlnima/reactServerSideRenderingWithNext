import {FC} from "react";
import styled from "styled-components";
// import {atcb_action} from 'add-to-calendar-button';
// import 'add-to-calendar-button/assets/css/atcb.css';
import useTranslation from "next-translate/useTranslation";

const Style = styled.form`

`;

interface PropTypes {
    startDate: string | Date,
    endDate: string | Date,
    eventName: string
}

const AddToCalendar: FC<PropTypes> = ({startDate, endDate, eventName}) => {
    const {t} = useTranslation();
    // return (
    //
    //     <Style onSubmit={e => {
    //         e.preventDefault();
    //         atcb_action({
    //             name: eventName,
    //             //@ts-ignore
    //             startDate: startDate,
    //             //@ts-ignore
    //             endDate: endDate,
    //             options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
    //             timeZone: "Europe/Berlin",
    //             iCalFileName: "Reminder-Event",
    //         });
    //     }}>
    //         <input type="submit"
    //                value={
    //                    t(`event:Add To Calendar`,
    //                        {},
    //                        {fallback: 'Add To Calendar'})
    //                }
    //                className={'btn btn-primary'}/>
    //     </Style>
    // )
    return  null
};
export default AddToCalendar