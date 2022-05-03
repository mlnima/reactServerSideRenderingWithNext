import { useEffect, useState} from "react";
import styled from "styled-components";

const BackToTopButtonStyledDiv = styled.div`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  background-color: var(--main-active-color, #ccc);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  #back-to-top-button {
    width: 24px;
    height: 24px;
    background-color: var(--main-background-color, #ccc);
    margin: 5px;
    mask: url('/public/asset/images/icons/angle-up-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/angle-up-solid.svg') no-repeat center;
  }


`
const BackToTopButton = () => {

    const [showButton,setShowButton] = useState(false)

    useEffect(() => {
       if (typeof window !== 'undefined'){
           window.addEventListener("scroll", () => {
               if (window?.pageYOffset > 300) {
                   setShowButton(true);
               } else {
                   setShowButton(false);
               }
           });
       }
    }, []);


    if (showButton){
        return (
            <BackToTopButtonStyledDiv  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>

                <span id={'back-to-top-button'}
                        aria-label={'scroll to top'}

                />

            </BackToTopButtonStyledDiv>

        )
    } else return null

};
export default BackToTopButton
