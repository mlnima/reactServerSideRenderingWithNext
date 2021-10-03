import WidgetHeader from "./WidgetHeader/WidgetHeader";
//import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import styled from "styled-components";
import React from "react";

let StyledSection = styled.section`
${props => props.customStyles}
`



const Widget = props => {
    const idAttribute = props.data?.extraId ? {id: props.data?.extraId} : {}
    return (
        <StyledSection  className={'widget ' + (props.data?.extraClassName ?? '')}  {...idAttribute} customStyles={props.data?.customStyles || ''}>
            <WidgetHeader {...props.data}/>
            <WidgetText {...props.data} id={props._id}/>
            {props.widgetToRender ?
                <props.widgetToRender
                isMobile={props.isMobile}
                {...props.data}
                widgetId={props.widgetId}
                widget={true}
                viewType={props.viewType}
                postElementSize={props.data.postElementSize || props.postElementSize}
                postElementStyle={props.postElementStyle}
                postElementImageLoader={props.postElementImageLoader}
                postElementImageLoaderType={props.postElementImageLoaderType}
                referer={props.referer}
            /> : null}
            {/*<WidgetFooter  {...props.data}/>*/}
        </StyledSection>
    );
};
export default Widget;
