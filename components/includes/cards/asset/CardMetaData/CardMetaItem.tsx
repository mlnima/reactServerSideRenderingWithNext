import React,{useMemo} from "react";
import Link from "next/link";
import styled from "styled-components";
const CardMetaItemStyledLink = styled.a`
  display: none;
  @media only screen and (min-width: 768px) {
    font-size: 14px;
    display: initial;
    color: var(--main-active-color, #ccc);
    margin: 0 .5px 0 3px;
    &:hover {
      color: var(--post-element-info-text-color,#ccc);
      .icon {
        background-color: var(--post-element-info-text-color, #ccc);
      }
    }
    .icon{
      width: 6px;
      height: 6px;
      padding: 4px;
      margin: 0 2px;
      background-color: var(--main-active-color, #ccc);
      mask: url('${({iconImage}:{iconImage:string})=>iconImage}') no-repeat center;
      -webkit-mask: url('${({iconImage}:{iconImage:string})=>iconImage}') no-repeat center;
    }
  }
`

interface CardMetaItemPropTypes {
    meta:{
        type:string,
        _id:string,
        name:string,
    }
}

const CardMetaItem = ({meta}:CardMetaItemPropTypes) => {
    const typePath = useMemo(()=>{
        return meta.type === 'tags' ? 'tag' :
            meta.type === 'categories' ? 'category' :
                meta.type === 'actors' ? 'actor' : 'category';
    },[])
    const iconImage = useMemo(()=>{
        return meta.type === 'tags' ? '/public/asset/images/icons/tag-solid.svg' :
               meta.type === 'categories' ? '/public/asset/images/icons/folder-solid.svg' :
               meta.type === 'actors' ? '/public/asset/images/icons/star-solid.svg' :
                   '/public/asset/images/icons/tag-solid.svg';
    },[])

    return (
            <Link href={`/${typePath}/${meta._id}`}>
                <CardMetaItemStyledLink href={`/${typePath}/${meta._id}`} className={`card-meta-link ${typePath}`} title={meta.name} iconImage={iconImage}>
                    <span className={'icon'}/>
                    {meta.name}
                </CardMetaItemStyledLink>
            </Link>
    );
};
export default CardMetaItem;
