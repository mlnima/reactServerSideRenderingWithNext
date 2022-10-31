import React, {FC} from "react";
import styled from "styled-components";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";
const Style = styled.button`
  display: flex;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  position: relative;
  top: 0;
  left: 0;
`
interface adminThumbnailToRandomImageFromPostsButtonPropTypes {
}

const AdminThumbnailToRandomImageFromPostsButton: FC<adminThumbnailToRandomImageFromPostsButtonPropTypes> = (props) => {
    return (
        <Style className={'btn btn-primary'}>
            <SvgRenderer svgUrl={'/asset/images/icons/rotate-right-solid.svg'}
                         size={10}
                         customClassName={'change-image'}
                         color={'#000'}/>

        </Style>
    )
};
export default AdminThumbnailToRandomImageFromPostsButton
