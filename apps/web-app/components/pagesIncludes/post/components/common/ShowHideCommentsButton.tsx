import React, {FC} from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons/faComments";

const Style = styled.div`

  .show-hide-comments-button{
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

//not in use but will be added later
const ShowHideCommentsButton: FC<ShowHideCommentsButtonPropTypes> = ({setShowComments,showComments}) => {
    const {t} = useTranslation()
    return (

        <Style onClick={()=>setShowComments(!showComments)} className={'show-hide-comments'}>
            <button className={'show-hide-comments-button'}>
                <FontAwesomeIcon icon={faComments}
                                 color={'var(--secondary-text-color,#ccc)'}
                                 style={{width:16,height:16}}/>
                <p className={'show-hide-comments-text'}> {t('Comments')}</p>
            </button>
        </Style>
    )
};
export default ShowHideCommentsButton;
