import React, {FC} from "react";
import styled from "styled-components";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";
import {useRouter} from "next/router";
import resetMetaImage from "api-requests/src/client/metas/resetMetaImage";
import {updateQueryGenerator} from "@_variables/variables";

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
        await resetMetaImage(_id).then(()=>{
            updateQueryGenerator(query,push,pathname)
        })
    }

    return (
        <Style className={'btn btn-primary'} onClick={onClickHandler}>
            <SvgRenderer svgUrl={'/asset/images/icons/rotate-right-solid.svg'}
                         size={10}
                         customClassName={'change-image'}
                         color={'#000'}/>

        </Style>
    )
};
export default ResetMetaImageButton
