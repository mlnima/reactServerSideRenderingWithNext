'use client';
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import './BackToTopButton.styles.scss';

const BackToTopButton = () => {

    const [showButton, setShowButton] = useState(false);

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

    const scrollEvent = () => {
        if (typeof window !== 'undefined') {
            window?.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    if (showButton) {
        return (
            <div id={'BackToTopButton'} onClick={() => scrollEvent()} title="Back to top">
                <span aria-label={'scroll to top'}>
                    <FontAwesomeIcon icon={faAngleUp}
                                     style={{width: 24, height: 24}}/>
                </span>
            </div>

        )
    } else return null

};
export default BackToTopButton
