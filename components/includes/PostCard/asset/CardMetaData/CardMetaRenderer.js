import CardMetaData from "./CardMetaData";
import _ from "lodash";
import styled from "styled-components";
import Link from "next/link";

const CardMetaDataStyledSpan = styled.span`
  width: ${props=>props?.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
  max-width: ${props=>props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 2px;
  padding: 5px 0;

  .card-meta-data{
    height: 12px;
    font-size: 12px;
    width: auto;
    color: var(--post-element-info-text-color,#ccc);
    margin: 2px;
    padding: 2px;
    border-radius: 5px;
    align-self: flex-start;

    &:hover {
      filter: invert(70%);
    }

    @media only screen and (min-width: 768px) {
      font-size: 14px;
    }
  }
`
const CardMetaRenderer = ({metaPreview,postElementSize}) => {

    return (
           <CardMetaDataStyledSpan className='card-meta' postElementSize={postElementSize}>
                {(metaPreview || []).filter(meta => meta?.name?.length > 1).map((meta) => {
                    const typePath = meta.type === 'tags' ? 'tag' :
                                     meta.type === 'categories' ? 'category' :
                                     meta.type === 'actors' ? 'actor' : 'category'

                    return (
                        <Link href={`/${typePath}/${meta._id}`} key={meta._id}>
                            <a className='card-meta-data' title={meta.name}>
                               {meta.name}
                            </a>
                        </Link>
                    )
                })}
            </CardMetaDataStyledSpan>
    );
};

export default CardMetaRenderer;
