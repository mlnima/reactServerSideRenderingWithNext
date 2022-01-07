import styled from "styled-components";
import CodeSnippet from "../../../../adminIncludes/TextEditors/TextEditorReactPage/components/CodeSnippet";
import parse from "html-react-parser";
import _ from "lodash";

const ObjectKeyDescriptionRendererStyledDiv = styled.div`

  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    margin: auto;
    max-width: 98vw;
  }
  
  .learn-description-element {
    width: fit-content;
    iframe{
      width: fit-content;
    }
  }

  pre {
    border-radius: 3px;
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
        return ElementType === 'img' ?
            <img className={'learn-description-element'} src={elementObject?.[ElementType]}/> :
            ElementType === 'code' ?
                <CodeSnippet key={_.uniqueId('id_')} code={elementObject?.[ElementType]}
                             language={elementObject?.language || 'js'}
                /> :
                <ElementType key={_.uniqueId('id_')} className={'learn-description-element'}>
                    {parse(elementObject?.[ElementType])}
                    {/*{elementObject?.[ElementType]}*/}
                </ElementType>
    })

    return (
        <ObjectKeyDescriptionRendererStyledDiv>
            {renderParts}
        </ObjectKeyDescriptionRendererStyledDiv>
    );
};

export default ObjectKeyDescriptionRenderer;