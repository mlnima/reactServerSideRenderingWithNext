"use client";
import React, {FC} from "react";
import { useRouter } from 'next/navigation'
import {clientAPIRequestResetMetaImage} from "api-requests";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons/faRotateRight";
import './ResetMetaImageButton.scss'


interface PropTypes {
    _id:string
}

const ResetMetaImageButton: FC<PropTypes> = ({_id}) => {
    const {refresh} = useRouter()

    const onClickHandler = async ()=>{
        await clientAPIRequestResetMetaImage(_id).then(()=>{
            refresh()
        })
    }

    return (
        <button className={'resetMetaImageButton btn btn-primary '} onClick={onClickHandler}>
            <FontAwesomeIcon className={'change-image'}
                             color={'#000'}
                             icon={faRotateRight}
                             style={{width:10,height:10}}/>
        </button>
    )
};
export default ResetMetaImageButton
