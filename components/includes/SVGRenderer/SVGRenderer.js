import React, {useEffect, useState, useContext, useRef} from 'react';

const SVGRenderer = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <svg
            width={props.width}
            style={props.style}
            height={props.height}
            viewBox={props.viewBox}
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path d={props.svgFile} fill={props.fill} />
        </svg>
    );
};
export default SVGRenderer;
