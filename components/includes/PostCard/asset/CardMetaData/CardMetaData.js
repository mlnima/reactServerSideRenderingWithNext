import Link from "next/link";
import styled from "styled-components";

const CardMetaDataStyledLink = styled.a`
  height: 12px;
  font-size: 12px;
  width: auto;
  color: var(--post-element-info-text-color);
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
`
const CardMetaData = props => {
    const typePath = props.meta.type === 'tags' ? 'tag' :
        props.meta.type === 'categories' ? 'category' :
            props.meta.type === 'actors' ? 'actor' : 'category'

    return (
        <Link href={`/${typePath}/${props.meta._id}`}>
            <CardMetaDataStyledLink className='video-card-meta-data' title={props.meta.name}>
                #{props.meta.name}
            </CardMetaDataStyledLink>
        </Link>

    );
};
export default CardMetaData;
