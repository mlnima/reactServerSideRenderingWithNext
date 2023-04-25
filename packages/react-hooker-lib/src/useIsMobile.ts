import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Check if the window object is available
        if (typeof window !== 'undefined') {
            checkIsMobile(); // Set initial mobile status
            window.addEventListener('resize', checkIsMobile); // Update mobile status on window resize

            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener('resize', checkIsMobile);
            };
        }
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;
