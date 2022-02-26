import {FC} from "react";
import styled from "styled-components";
const MobileCardNoImageStyledArticle = styled.article`
  width: 100%;
  height: calc(100% / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;
`

interface MobileCardNoImagePropTypes {
    mediaAlt:string,
}

const MobileCardNoImage: FC<MobileCardNoImagePropTypes> = ({mediaAlt}) => {
    return (
        <MobileCardNoImageStyledArticle>
            <span className={'no-image-alt'}>
                {mediaAlt || 'NO IMAGE'}
            </span>
        </MobileCardNoImageStyledArticle>
    )
};

export default MobileCardNoImage
