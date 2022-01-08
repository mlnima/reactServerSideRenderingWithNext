import styled from "styled-components";
import CodeSnippet from "../../../../adminIncludes/TextEditors/TextEditorReactPage/components/CodeSnippet";
import parse from "html-react-parser";
import _ from "lodash";

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
        aspect-ratio: 16 / 9;
      }
    }
    ul, li, ol, blockquote,p >*{
      max-width: 90vw;
    }

    ul, li, ol, blockquote,p {
      max-width: 98vw;
      margin: 0;
      padding: 0;
      *{
        max-width: 90vw;
        *{
          max-width: 90vw;
          *{
            max-width: 90vw;
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
          width: 450px;
          height: calc(450px / 1.777);
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
    description: {
        language: string;
    }[]
}

const ObjectKeyDescriptionRenderer = ({description}: ComponentPropTypes) => {

    const renderParts = description.map(elementObject => {
        const ElementType = Object.keys(elementObject)[0] as any

        return (
            <div className={'learn-description-element'}>
                {
                    ElementType === 'img' ?
                        <img key={_.uniqueId('id_')} className={'learn-description-element-child learn-description-element-image'} src={elementObject?.[ElementType]}/> :
                        ElementType === 'code' ?
                            <CodeSnippet key={_.uniqueId('id_')} code={elementObject?.[ElementType]}
                                         language={elementObject?.language || 'js'}
                            /> :
                            <ElementType key={_.uniqueId('id_')} className={'learn-description-element-child'}>
                                {parse(elementObject?.[ElementType])}
                                {/*{elementObject?.[ElementType]}*/}
                            </ElementType>
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


// return ElementType === 'img' ?
//        <img key={_.uniqueId('id_')} className={'learn-description-element'} src={elementObject?.[ElementType]}/> :
//        ElementType === 'code' ?
//         <CodeSnippet key={_.uniqueId('id_')} code={elementObject?.[ElementType]}
//                      language={elementObject?.language || 'js'}
//         /> :
//         <ElementType key={_.uniqueId('id_')} className={'learn-description-element'}>
//             {parse(elementObject?.[ElementType])}
//             {/*{elementObject?.[ElementType]}*/}
//         </ElementType>