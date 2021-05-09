import React, {useContext} from 'react';
import Link from 'next/link'
import withRouter from "next/dist/client/with-router";
import {AppContext} from '../../../context/AppContext'
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import styled from "styled-components";

let StyledA = styled.a`
  width: 48vw;
  height: auto;
  margin: auto;
 cursor: pointer;
  .meta-page-item-image-parent {
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;

    .meta-page-item-image, img {
      width: 100%;
      height: auto;
    }
  }

  .meta-item-data {
    width: 100%;
    height: auto;
    text-align: center;

    p {
      mix-blend-mode: difference;
      color: white;
    }
  }
  @media only screen and (min-width: 768px) {

    margin: 10px auto;
    width: 320px;

    .meta-page-item-image-parent {
      width: 320px;

      .meta-page-item-image {
        width: 320px;
        position: relative;
        height: 180px;
        border: #181818 1px solid;
        display: block;
        object-fit: cover;
      }
    }

    .meta-item-data {
      width: 320px;
      margin: auto;
      color: white;
    }

}
`

const MetaElement = props => {
    const contextData = useContext(AppContext);

    if (props.count > 0) {
        return (
            <Link key={props.name}
                  as={contextData.state.activeLanguage !== 'default' ?
                      `/${props.type}/${props.translations ?
                          props.translations[contextData.state.activeLanguage] ?
                              props.translations[contextData.state.activeLanguage].name || props.name : props.name : props.name}?metaId=${props._id}` :
                      `/${props.type}/${props.name}?metaId=${props._id}`}
                  href={{
                      pathname: `/posts`,
                      query: {
                          metaId: props._id,
                          metaName: props.name,
                          metaType: props.type,
                      }
                  }}
                  scroll={false}
            >
                <StyledA className='meta-page-item' onClick={() => contextData.dispatchState({...contextData.state, loading: true})}>
                    <div className='meta-page-item-image-parent'>
                        <ImageRenderer imageWidth={320} imageHeight={320 / 1.777} imageUrl={props.imageUrl || props.noImageUrl} hoverHandler={props.hoverHandler} quality={props.quality} loading='lazy'
                                       layout='intrinsic'/>
                    </div>
                    <div className='meta-item-data'>
                        <p>{props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].name || props.name : props.name : props.name} ({props.count})</p>

                    </div>
                </StyledA>
            </Link>
        );
    } else return null

};
export default withRouter(MetaElement);
