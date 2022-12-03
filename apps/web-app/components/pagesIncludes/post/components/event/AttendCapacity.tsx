import {FC} from "react";
import styled from "styled-components";

const Style = styled.div``;

interface PropTypes {
    capacity:number,
    onChangeHandler:Function
}

const AttendCapacity: FC<PropTypes> = ({capacity}) => {
    return (
        <Style>
            <input className={''} name={'capacity'} type={'number'}/>
        </Style>
    )
};
export default AttendCapacity;