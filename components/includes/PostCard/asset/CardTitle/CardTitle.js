import styled from "styled-components";
import Link from "next/link";

const CardTitleStyledDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--post-element-text-color, #ccc);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  //justify-content: flex-start;
  ////flex-direction: column;
  //-webkit-line-clamp:1;
  //text-overflow: ellipsis;
  //overflow: hidden;
  display: -webkit-box !important;
  //-webkit-box-orient: vertical;
 

  .card-title-metas{
    margin: 0 3px;
    .card-meta-data{
      font-size: 12px;
      color: var(--post-element-text-color, #ccc);
      &:hover {
        filter: invert(70%);
      }
    }
  }

  h3 {


   
    font-weight: initial;
    font-size: 12px;
    margin: 0;
    &:hover {
      filter: invert(70%);
    }
  }

  &:hover {
    -webkit-line-clamp:3;
    white-space: normal;
  }

  @media only screen and (min-width: 768px) {

  }
`

// -webkit-line-clamp: ${props => props?.postElementSize === 'list' ? 1 : 1};
// width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
// max-width: ${props => props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
// padding: ${props => props.postElementSize === 'list' ? 0 : '2px'} 2px;
// width: ${props => props.postElementSize === 'list' ? `100%` : `${props.cardWidth}px`};
// font-size: 14px;
// h3 {
//   width: ${props => props.postElementSize === 'list' ? `100%` : `${props.cardWidth}px`};
//   font-size: 14px;
// }
const CardTitle = ({title, metas}) => {


    return (
        <CardTitleStyledDiv className={'card-title'}>

            {metas ?
                <div className={'card-title-metas'}>
                    {metas.map(meta => {
                            const typePath = meta.type === 'tags' ? 'tag' :
                                meta.type === 'categories' ? 'category' :
                                    meta.type === 'actors' ? 'actor' : 'category'
                            return (
                                <Link href={`/${typePath}/${meta._id}`} key={meta._id}>
                                    <a className={'card-meta-data'} title={meta.name}>
                                        {meta.name}
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div> : null
            }
            <h3>
                {title}
            </h3>

        </CardTitleStyledDiv>
    );
};
export default CardTitle;
