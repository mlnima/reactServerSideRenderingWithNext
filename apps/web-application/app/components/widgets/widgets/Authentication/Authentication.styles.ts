import styled from "styled-components";

const Styles= styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  .profile-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .authentication-widget-wrapper {
    border-left: var(--default-border);
    padding: 10px;
    box-sizing: border-box;
    position: fixed;
    right: 0;
    top: 0;
    background: var(--main-background-color, #000);
    width: 85%;
    z-index: 12;
    height: 100vh;
    display: ${({open}: { open: boolean }) => open ? 'flex' : 'none'};
    flex-direction: column;
    animation: ${({open}: { open: boolean }) => open ? 'userMenuSlide .3s linear alternate' : 'none'};

    .close-btn {
      color: var(--primary-text-color,#fff);
      padding: 6px 0;
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .logged-items-auth-actions {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .logged-item {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;


        a {
          color: var(--main-text-color, #fff);
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .icon {
            position: relative;
            width: 50%;
            height: 50%;
            margin: 0;
          }
        }

        .text-data {
          width: 100%;
          text-align: center;
        }
      }
    }

    .logged-items {

      .logged-item {
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 52px;
        color: var(--primary-text-color,#fff);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .icon-wrapper {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .sign-out{
        align-self: flex-end;
        justify-self: flex-end;
      }
    }

  }

  @media only screen and (min-width: 768px) {
    .authentication-widget-wrapper {
      width: 300px;
    }
  }

`

export default Styles