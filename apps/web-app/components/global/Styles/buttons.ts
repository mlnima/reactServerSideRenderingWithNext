import { css } from 'styled-components';

const buttons = css`
  .btn{
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid var(--primary-button-link-text-color, #000);
    padding: .375rem .75rem;
    //font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
  }
  .btn-primary{
    background-color: var(--primary-button-link-background-color, #f90);
    color: var(--primary-button-link-text-color, #000);
  }
  .btn-secondary{
    background-color: var(--secondary-button-link-background-color, #6c757d);
    color: var(--secondary-button-text-color, #fff);
  }
  .btn-success{
    background-color: var(--success-button-link-background-color,#28a745);
    color: var(--success-button-text-color, #fff);
  }
  .btn-danger{
    background-color: var(--danger-button-link-background-color, #dc3545);
    color: var(--danger-button-text-color, #fff);
  }
  .btn-warning{
    background-color: var(--warning-button-link-background-color, #f90);
    color: var(--warning-button-text-color, #212529);
  }
  .btn-info{
    background-color: var(--info-button-link-background-color, #117a8b);
    color: var(--info-button-text-color, #fff);
  }
  .btn-transparent-dark{
    background-color: transparent;
    color:  var(--transparent-dark-button-color, #343a40);
    border-color:  transparent;
  }
  .btn-transparent-light{
    background-color: transparent;
    color: var(--transparent-light-button-color,  #fff);
    border-color:  transparent;
  }
  .btn-dark{
    background-color: var( --dark-button-link-background-color, #343a40);
    border-color:  var(--dark-button-link-border-color, #343a40);
    color: var(--dark-button-link-text-color, #fff);
  }
  .btn-navigation{
    background-color:var(--secondary-background-color, #181818);
    color: var(--main-text-color, #fff);
    border: none;
  }
`

export default buttons