import styled from 'styled-components';


export const ImageUploaderStyles = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  
  .add-images-area{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: var(--default-border);
    width: 80px;
    height: 80px;
  }

  .images-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
`

export const ImagePreviewStyles = styled.div<{ isDragging: boolean }>`
  position: relative;
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  ${({isDragging}) =>
    isDragging &&
    `
    border-color: blue;
    transform: translatex(-10px);
  `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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