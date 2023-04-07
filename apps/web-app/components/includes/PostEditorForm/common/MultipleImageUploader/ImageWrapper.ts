import styled from 'styled-components';

interface ImageWrapperProps {
    isDragging: boolean;
}

export const ImageWrapper = styled.div<ImageWrapperProps>`
  //padding: 5px;
  //border: 1px solid #ccc;
  // background-color: ${({ isDragging }) => (isDragging ? '#f0f0f0' : 'white')};
  position: relative;
  cursor: move;
  margin: 10px;
  display: inline-block;
  box-sizing: border-box;

  img {
    max-width: 100px;
    max-height: 100px;
  }
  .remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    opacity: 80%;
    font-weight: bold;
    cursor: pointer;
  }
`;

