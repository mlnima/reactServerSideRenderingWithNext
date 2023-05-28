import styled from "styled-components";
import React, {useEffect, useMemo} from "react";
import useTranslation from "next-translate/useTranslation";
import {shortNumber} from "custom-util";

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
    const {t, lang} = useTranslation('common')

    const translatedView = useMemo(()=>{
        return t('common:Views', {}, {fallback: 'Views'})
    },[lang])


    return (
        <CardViewsStyledDiv className={`card-views ${className || ''}`}>
            <span>{views > 0 ? shortNumber(views) : t('common:No View')}</span>
            <span>{translatedView}</span>
        </CardViewsStyledDiv>
    );
};
export default CardViews;
