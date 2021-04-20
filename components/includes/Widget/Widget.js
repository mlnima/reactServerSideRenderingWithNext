import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import styled from "styled-components";
let StyledSection = styled.section`${props => props.customStyles}`

const Widget = props => {
    const idAttribute = props.data?.extraId ? {id: props.data?.extraId} : {}
    return (
        <StyledSection customStyles={props.data?.customStyles || ''}
                       className={'widget ' + (props.data?.extraClassName ?? '')}
                       {...idAttribute}>
            <WidgetHeader {...props.data}/>
            <WidgetText {...props.data} id={props._id}/>
            {props.widgetToRender ? <props.widgetToRender
                currentPageSidebar={props.currentPageSidebar}
                isMobile={props.isMobile}
                {...props.data}
                id={props._id}
                widget={true}
                viewType={props.viewType}
                postElementSize={props.postElementSize}
                postElementStyle={props.postElementStyle}
                referer={props.referer}
            /> : null}
            <WidgetFooter  {...props.data}/>
        </StyledSection>
    );
};
export default Widget;
