import {FC, useEffect} from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import {useAppDispatch} from "@store_toolkit/hooks";
import attendingToEvent from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/attendToEvent";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";

const Style = styled.div``;

interface PropTypes {
    isUserAttending: boolean
    postId: string,
    userId: string,
}

const AttendButtons: FC<PropTypes> = ({isUserAttending, postId, userId}) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()

    const loggedIn = useSelector(({user}: Store) => user.loggedIn)

    const onAttendHandler = () => {
        if (loggedIn){
            dispatch(attendingToEvent({
                postId,
                userId,
                actionType: isUserAttending ? 'unAttend' : 'attend',
            }))
        }else{
            dispatch(loginRegisterForm('register'))
        }
    }

    return (
        <Style>
            <button className={`btn ${isUserAttending ? 'btn-primary':'btn-danger'}`} onClick={onAttendHandler}>
                {isUserAttending ? t(`event:Cancel Attending`, {}, {fallback: 'Cancel Attending'}) :
                    t(`event:Attend`, {}, {fallback: 'Attend'})
                }
            </button>
        </Style>
    )
};
export default AttendButtons;