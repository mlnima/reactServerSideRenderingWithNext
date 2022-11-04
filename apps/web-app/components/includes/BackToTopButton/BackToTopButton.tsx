import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

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


    if (showButton) {
        return (
            <BackToTopButtonStyledDiv onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} title="Back to top">
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
