import React, {FC} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import {clientAPIRequestResetMetaImage} from "api-requests";
import {updateQueryGenerator} from "@_variables/variables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons/faRotateRight";

const Style = styled.button`
  display: flex;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  position: relative;
  top: 0;
  left: 0;
`

interface PropTypes {
    _id:string
}

const ResetMetaImageButton: FC<PropTypes> = ({_id}) => {
    const {push, pathname, query} = useRouter()

    const onClickHandler = async ()=>{
        await clientAPIRequestResetMetaImage(_id).then(()=>{
            updateQueryGenerator(query,push,pathname)
        })
    }

    return (
        <Style className={'btn btn-primary'} onClick={onClickHandler}>
            <FontAwesomeIcon className={'change-image'} color={'#000'} icon={faRotateRight} style={{width:10,height:10}}/>
        </Style>
    )
};
export default ResetMetaImageButton
