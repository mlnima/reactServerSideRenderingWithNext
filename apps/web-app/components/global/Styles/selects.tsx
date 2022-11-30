import { css } from 'styled-components';

const selects = css`
  .custom-select {
    display: inline-block;
    width: 50%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem .375rem .75rem;
    line-height: 1.5;
    vertical-align: middle;
    color: var(--secondary-text-color, #ccc);
    background: var(--secondary-background-color, #181818);
    border: 1px solid #ced4da;
    border-radius: .25rem;
  }
`

export default selects


