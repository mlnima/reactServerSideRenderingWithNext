import { css } from 'styled-components';

const inputs = css`
  .form-control-input {
    width: 100%;
    display: block;
    padding: .375rem .75rem;
    line-height: 1.5;
    color: var(--secondary-text-color, #ccc);
    background: var(--secondary-background-color, #181818);
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }
`

export default inputs