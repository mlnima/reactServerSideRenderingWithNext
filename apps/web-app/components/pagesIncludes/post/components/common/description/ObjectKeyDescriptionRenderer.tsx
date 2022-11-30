import styled from "styled-components";
import CodeSnippet from "../../../../../global/CodeSnippet";
// import parse from "html-react-parser";

const ObjectKeyDescriptionRendererStyledDiv = styled.div`

  display: flex;
  flex-direction: column;

  .learn-description-element {
    width: 98%;
    max-width: 100vw;

    .learn-description-element-child {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 98vw;
      iframe {
        max-width: 90vw;
        height: calc(90vw / 1.777);
        //aspect-ratio: 16 / 9;
      }
    }
    ul, li, ol, blockquote,p >*{
      max-width: 80vw;
    }

    ul, li, ol, blockquote {
      max-width: 80vw;
      margin: 0 10px;
      padding: 0;
      word-break: break-word;
      *{
        max-width: 80vw;
        *{
          max-width: 80vw;
          *{
            max-width: 80vw;
          }
        }
        img{
          height: auto;
        }
      }
    }
  }

  pre {
    border-radius: 3px;
  }

  @media only screen and (min-width: 768px) {
    .learn-description-element {
      width: 100%;
      .learn-description-element-child {
        iframe, video {
          width: 700px;
          height: calc(700px / 1.777);
        }
        img {
          max-width: 450px;
        }
      }
      .learn-description-element-image {
        max-width: 450px;
      }
    }
  }
`

interface ComponentPropTypes {
    description: any
}

const ObjectKeyDescriptionRenderer = ({description}: ComponentPropTypes) => {

    const renderParts = description.map((elementObject,index) => {
        const ElementType = Object.keys(elementObject)[0] as any

        return (
            <div className={'learn-description-element'} key={ElementType + index}>
                {
                    ElementType === 'img' ?
                        <img  className={'learn-description-element-child learn-description-element-image'} src={elementObject?.[ElementType]}/> :
                        ElementType === 'code' ?
                            <CodeSnippet code={elementObject?.[ElementType]}
                                         language={elementObject?.language || 'js'}
                            /> :
                            <ElementType  className={'learn-description-element-child'}
                                          dangerouslySetInnerHTML={{__html:elementObject?.[ElementType]}}
                            />
                }
            </div>
        )
    })

    return (
        <ObjectKeyDescriptionRendererStyledDiv>
            {renderParts}
        </ObjectKeyDescriptionRendererStyledDiv>
    );
};

export default ObjectKeyDescriptionRenderer;

//
// <ElementType  className={'learn-description-element-child'}>
//     {parse(elementObject?.[ElementType])}
// </ElementType>