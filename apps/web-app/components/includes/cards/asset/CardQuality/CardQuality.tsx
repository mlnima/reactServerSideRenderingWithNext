import styled from "styled-components";
import {useMemo} from "react";

const CardQualityStyledDiv = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: var(--post-element-text-color, #ccc);
`

interface CardViewsPropTypes {
    quality: string,
    className: string
}

const CardQuality = ({quality, className}: CardViewsPropTypes) => {
    const qualityMemo = useMemo(()=>quality,[quality])
    return (
        <CardQualityStyledDiv className={'card-quality ' + className}>
            {qualityMemo.toUpperCase()}
        </CardQualityStyledDiv>
    );
};
export default CardQuality;
