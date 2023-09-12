// @ts-nocheck
'use client';
import './ObjectKeyDescriptionRenderer.styles.scss';
import CodeSnippet from "@components/CodeSnippet/CodeSnippet";
import { v4 as uuidv4 } from 'uuid';

interface ComponentPropTypes {
    description: any
}

const ObjectKeyDescriptionRenderer = ({description}: ComponentPropTypes) => {

    const renderParts = description.map((elementObject) => {
        const ElementType = Object.keys(elementObject)[0] as any

        return (
            <div className={'learn-description-element'} key={uuidv4()}>
                {
                    ElementType === 'img' ?
                        //@ts-ignore
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
        <div>
            {renderParts}
        </div>
    );
};

export default ObjectKeyDescriptionRenderer;

//
// <ElementType  className={'learn-description-element-child'}>
//     {parse(elementObject?.[ElementType])}
// </ElementType>