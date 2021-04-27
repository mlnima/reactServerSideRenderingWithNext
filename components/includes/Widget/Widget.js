import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import styled from "styled-components";
let StyledSection = styled.section`
  .small-posts-content {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(140px, 1fr));
    .small {
      width: 140px;
      height: 140px;
      margin: auto;
      .post-element {
        width: 100%;
        height: 140px;
        .image {
          img, video {
            width: 140px;
            height: 79px;
            object-fit: cover;
          }
        }
        h3 {
          width: 130px;
        }
      }
    }
  }
  .list-posts-content {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    .post-element-div {
      width: 98%;
      max-width: 240px;
      height: 90px;
      margin: 2px 0;
      a {
        width: 98%;
        height: 90px;
        .post-element {
          width: 100%;
          height: 90px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .image {
            margin: 0;
            img, video {
              width: 130px ;
              aspect-ratio:16/9;
          
            }
            .top-right ,.bottom-right{
              display: none;
            }
          }

          .progressParent {
            display: none;
          }

          h2 {
            -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin: 0 0 0 2px;
          }
        }
      }
      
    }

  }
${props => props.customStyles}
`

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
