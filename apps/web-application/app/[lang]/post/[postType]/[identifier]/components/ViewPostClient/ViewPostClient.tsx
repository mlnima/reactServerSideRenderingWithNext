'use client';
import {FC, useEffect} from "react";
import {useAppDispatch} from "@store/hooks";
import viewPostAction from "@store/reducers/postsReducers/viewPostAction";

interface IProps {
    _id: string
}

const ViewPostClient: FC<IProps> = ({_id}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (_id){
            dispatch(viewPostAction(_id))
        }
    }, [_id]);


    return null
};
export default ViewPostClient
