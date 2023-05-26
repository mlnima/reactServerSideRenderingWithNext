import { css } from 'styled-components';

const inputsStyles = css`
  .form-control-input {
    width: 100%;
    display: block;
    padding: .375rem .75rem;
    line-height: 1.5;
    color: var(--main-text-color, #ccc);
    background: var(--main-background-color, #181818);
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    box-sizing: border-box;
  }
`
//"axios"
export default inputsStyles