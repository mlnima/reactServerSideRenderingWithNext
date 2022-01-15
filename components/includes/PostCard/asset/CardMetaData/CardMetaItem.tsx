import React,{useMemo} from "react";
import Link from "next/link";
import styled from "styled-components";
const CardMetaItemStyledLink = styled.a`
  color: var(--main-active-color, #ccc);
  display: none;
  font-size: 12px;
  transition: .5s;
  margin: 0 .5px 0 3px;
  ${(props:{type:string})=>props.type === 'actor' ? 'font-weight: bold;' : ''}

  &:hover {
    color: var(--post-element-text-color,#ccc);
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 14px;
    display: initial;
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

    return (
            <Link href={`/${typePath}/${meta._id}`}>
                <CardMetaItemStyledLink href={`/${typePath}/${meta._id}`} className={`card-meta-link ${typePath}`} title={meta.name} type={typePath}>
                    {meta.name}
                </CardMetaItemStyledLink>
            </Link>
    );
};
export default CardMetaItem;
