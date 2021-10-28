import styled from "styled-components";

const PostElementTitleStyledH2 = styled.h2`
  color: var(--post-element-text-color);
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  font-weight: initial;
  white-space: nowrap;
  width: ${props => props?.postElementSize === 'list' ? '50%' : '100%'};
  margin: 5px auto auto auto;
  max-width: 320px;
  ${props => props?.listType} @media only screen and(min-width: 768 px) {
  .post-element-title {
    width: ${props => props?.postElementSize === 'list' ? '60%' : '100%'};
  }
}
`
const PostElementTitle = ({title, postElementSize}) => {
    const listType = postElementSize === 'list' ?
        `  -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin: 0 0 0 2px;`
        : ''

    return (
        <PostElementTitleStyledH2 className='post-element-title' postElementSize={postElementSize} listType={listType}>
            {title}
        </PostElementTitleStyledH2>
    );
};
export default PostElementTitle;
