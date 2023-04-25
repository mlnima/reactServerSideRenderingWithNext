import styled from "styled-components";


interface IProps {
    isMine: boolean;
}

export const Styles = styled.div<IProps>`
  display: flex;
  justify-content: ${({isMine}) => isMine ? 'flex-end' : 'flex-start'};
  margin: 0 2px;
  width: 100%;
  padding: 2px;

  .message-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: ${({isMine}) => isMine ? 'flex-end' : 'flex-start'};
    background-color: ${({isMine}) => isMine ? '#1877F2' : 'var(--tertiary-background-color,#404040)'};

    border-radius: 5px;
    margin: 5px 0;
    padding: 0 5px;
    max-width: 90%;

    .message-text {
      
    //  color: #fff;
      color: ${({isMine}) => isMine ? '#fff' : 'var(--main-text-color,#FFFFFF)'};;
      padding: 4px 8px;
      word-break: break-word;
      margin: 0;
    }

    .message-date {
      display: flex;
      justify-content: flex-end;
      color: ${({isMine}) => isMine ? '#fff' : 'var(--main-text-color,#FFFFFF)'};;
      font-size: x-small;
      width: 100%;
    }
  }
`