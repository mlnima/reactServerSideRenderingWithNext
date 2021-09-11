import styled from "styled-components";
const CardTitleStyledH3 = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  color: var(--post-element-text-color);
  -webkit-line-clamp: ${props => props.postElementSize === 'list' ? 1 : 1};
  -webkit-box-orient: vertical;
  font-weight: initial;
  white-space: normal;
  font-size: 12px;
  width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
  max-width: ${props => props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
  padding: ${props => props.postElementSize === 'list' ? 0 : '2px'} 2px;

  &:hover {
    filter: invert(70%);
  }

  @media only screen and (min-width: 768px){
    width: ${props => props.postElementSize === 'list' ? `100%` : `${props.cardWidth}px`};
    font-size: 14px;
  }
`
const CardTitle = ({title}) => {
    return (
        <CardTitleStyledH3 className='promotion-card-title'>{title} </CardTitleStyledH3>
    );
};
export default CardTitle;
