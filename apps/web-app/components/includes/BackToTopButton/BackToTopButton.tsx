import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const BackToTopButtonStyledDiv = styled.div`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  background-color: var(--main-active-color, #f90);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 11;
  
  span{
    display: flex;
  }
  
`
const BackToTopButton = () => {

    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", () => {
                if (window?.pageYOffset > 500) {
                    setShowButton(true);
                } else {
                    setShowButton(false);
                }
            });
        }
    }, []);

    const scrollEvent = ()=>{
        if (typeof window !== 'undefined') {
            window?.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    if (showButton) {
        return (
            <BackToTopButtonStyledDiv onClick={() => scrollEvent()} title="Back to top">
                <span aria-label={'scroll to top'}>
                     <SvgRenderer svgUrl={'/asset/images/icons/angle-up-solid.svg'}
                                  customID={'back-to-top-button'}
                                  size={24}
                                  customClassName={'view-profile'}
                                  color={'var(--main-background-color, #000)'}/>
                </span>
            </BackToTopButtonStyledDiv>

        )
    } else return null

};
export default BackToTopButton
