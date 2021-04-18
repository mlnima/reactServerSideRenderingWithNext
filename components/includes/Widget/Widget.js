import React, {useEffect} from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import styled from "styled-components";

let StyledDiv = styled.div`${props => props.customStyles}`

const Widget = props => {
    const idAttribute = props.data?.extraId ? {id: props.data?.extraId} : {}

    return (
        <StyledDiv customStyles={props.data?.customStyles || ''}
                   className={'widget ' + (props.data?.extraClassName ?? '')}
                   {...idAttribute}>
            <WidgetHeader {...props.data}/>
            <WidgetText {...props.data} id={props._id}/>
            {props.component ?
                <props.component currentPageSidebar={props.currentPageSidebar}
                                 isMobile={props.isMobile} {...props.data}
                                 id={props._id} widget={true}
                                 postElementSize={props.postElementSize}
                                 referer={props.referer}/> : null}
            <WidgetFooter  {...props.data}/>
        </StyledDiv>
    );
};
export default Widget;

