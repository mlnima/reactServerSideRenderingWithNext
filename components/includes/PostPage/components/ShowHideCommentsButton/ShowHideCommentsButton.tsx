import React, {FC} from "react";
import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import useTranslation from "next-translate/useTranslation";

const Style = styled.div`

  .show-hide-comments-button{
    //display: flex;
    //justify-content: center;
    //align-items: center;
    //flex-direction: column;
    //background-color: transparent;
    //color: var(--post-page-info-color, #ccc);
    //outline: none;
    //border: none;
    //margin: 0 10px;
    //padding: 0;

    .show-hide-comments-text {
      padding: 0 5px;
      margin-top: 5px;
      font-size: small;
    }
  }

  @media only screen and (min-width: 768px) {
    .show-hide-comments-button{
      flex-direction: row;

      .show-hide-comments-text {
        margin: 0 0 0 5px;
        font-size: small;
        padding: 0;
      }
    }

  }
`

interface ShowHideCommentsButtonPropTypes {
    setShowComments:Function,
    showComments:boolean
}

const ShowHideCommentsButton: FC<ShowHideCommentsButtonPropTypes> = ({setShowComments,showComments}) => {
    const {t} = useTranslation()
    return (

        <Style onClick={()=>setShowComments(!showComments)} className={'show-hide-comments'}>
            <button className={'show-hide-comments-button'}>
                <SvgRenderer svgUrl={'/public/asset/images/icons/comments-solid.svg'}
                             size={16}
                             color={'var(--post-page-info-color,#ccc)'}/>
                <p className={'show-hide-comments-text'}> {t('Comments')}</p>
            </button>
        </Style>
    )
};
export default ShowHideCommentsButton;
