import {FC, useState} from "react";
import CardMetaItem from "./CardMetaItem";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";

const CardMetaRendererStyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  
  .show-meta {
    width: 12px;
    height: 12px;
    margin: 5px 0;
    background-color: var( --post-element-info-text-color,#6A6A6A);
    mask: url('/public/asset/images/icons/circle-info-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/circle-info-solid.svg') no-repeat center;
  }

  .meta-data {
    display: ${({render}: { render: boolean }) => render ? 'flex;' : 'none;'}
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

  }
`

interface CardMetaRendererPropTypes {
    metas?: Meta[],
}

//circle-info-solid.svg
const CardMetaRenderer: FC<CardMetaRendererPropTypes> = ({metas}) => {
    const [render, setRender] = useState(false)

    if (metas?.length){
        return (
            <CardMetaRendererStyledDiv className={'card-meta'} render={render} >

                <span className={'show-meta'} onClick={() => render ? setRender(false) : setRender(true)}/>

                <div className={'meta-data'}>
                    {(metas || []).filter((meta: Meta) => meta?.name?.length > 1).map((meta, index) => {
                        return (
                            <CardMetaItem meta={meta} key={index}/>
                        )
                    })}
                </div>
            </CardMetaRendererStyledDiv>
        )
    }else return null

};

export default CardMetaRenderer;


// width: ${({cardWidth}: { render: boolean,cardWidth:number }) => cardWidth ? `${cardWidth}px;` : '100%;'}