import styled from "styled-components";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import shortNumber from "custom-util/src/math-util/shortNumber";

const CardViewsStyledDiv = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 2px 0;

  .icon {
    margin: 0 2px;
  }
`

interface CardViewsPropTypes {
    views: number,
    className?: string
}

const CardViews = ({views, className}: CardViewsPropTypes) => {
    const {t} = useTranslation()

    return (
        <CardViewsStyledDiv className={`card-views ${className || ''}`}>
            <span>{shortNumber(views)}</span>
            <span >{t('common:Views')}</span>
        </CardViewsStyledDiv>
    );
};
export default CardViews;
