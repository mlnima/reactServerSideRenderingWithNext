import styled from "styled-components";


const callActionButtons = styled.button`



`









const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: none;
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    100% {
      transform: scale(1);
      box-shadow: none;
    }
  }
  
  
  .action-button{
    padding: 10px 20px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  
  .blur-background {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
  }

  .inner-content {

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgba(0, 0, 0, 90%);
    padding: 8px;
    box-sizing: border-box;
    border-radius: 10px;
  

    .caller-info {
      display: flex;
      justify-content: space-evenly;
      gap: 5px;

      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
      }

      .caller-detail {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
      }
    }



    .incoming-call-action-buttons {

    }
    

    
    .large-stream {
      position: absolute;
      width: 100%;
      height: 100%;
      aspect-ratio: 9/16;
      object-fit: cover;
      border-radius: 10px;
    }

    .small-stream {
      position: absolute;
      height: 186px;
      width:140px;
      top: 20px;
      right: 20px;
      aspect-ratio: 9/16;
      object-fit: cover;
      border: var(--default-border);
      border-radius: 10px;
    }
  }

  @media only screen and (min-width: 768px) {
    .inner-content {
      position: relative;
      width: 300px;
      height: 533px;

      .large-stream{
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default Style;


//.messenger-call-user-video {
// // width: 50vw;
////  position: fixed;
////  right: 0;
// // top: 80px;
//  z-index: 1002;
//}

//.call-info {
//  display: flex;
//  flex-direction: column;
//  padding: 5px 10px;
//  align-items: flex-start;
//  background-color: var(--secondary-background-color, #181818);
//  color: var(--main-text-color, #fff);
//  position: absolute;
//  top: 5px;
//  left: 0;
//  right: 0;
//  border-radius: 20px;
//  width: 90%;
//  margin: auto;
//  z-index: 1004;
//
//  .remote-username, .call-type {
//    margin: 5px;
//  }
//
//  .ringing-action-buttons {
//    display: flex;
//    justify-content: space-evenly;
//    align-items: center;
//    width: 100%;
//    z-index: 1001;
//    .answer-button, .reject-button {
//      background-color: transparent;
//      color: var(--main-text-color, #fff);
//      padding: 10px 20px;
//      border: none;
//      display: flex;
//      justify-content: center;
//      align-items: center;
//    }
//  }
//
//
//
//  .calling-action-buttons {
//    display: flex;
//    justify-content: space-evenly;
//    align-items: center;
//    width: 100%;
//    z-index: 1001;
//      .hangup-button{
//        background-color: transparent;
//        color: var(--main-text-color, #fff);
//        padding: 10px 20px;
//        border: none;
//        display: flex;
//        justify-content: center;
//        align-items: center;
//      }
//
//  }
//}

//.actions-buttons {
//  //opacity: .5;
//  margin: auto;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  flex-wrap: wrap;
//  position: absolute;
//  width: 100%;
//  max-width: 300px;
//  height: 50px;
//  padding: 5px 10px;
//  bottom: 0;
//  left: 0;
//  right: 0;
//  z-index: 1004;
//
//  .leave-call-button {
//    background-color: red;
//    color: white;
//    border-radius: 50%;
//    width: 50px;
//    height: 50px;
//    outline: none;
//    border: none;
//  }
//
//  .switch-camera-button, .disable-video-button, .disable-audio-button {
//    background-color: transparent;
//    color: white;
//    border-radius: 50%;
//    width: 50px;
//    height: 50px;
//    outline: none;
//    border: none;
//    margin: 0;
//  }
//}


//.ringing {
//  z-index: 20;
//  margin: auto;
//  text-align: center;
//  position: absolute;
//  top: 50px;
//  color: var(--main-text-color, #fff);
//
//  h2 {
//    font-size: large;
//  }
//
//  img {
//    width: 250px;
//    height: 250px;
//    border-radius: 50%;
//  }
//
//  h3 {
//
//  }
//}