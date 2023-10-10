import {MDXProvider} from '@mdx-js/react';
import Image from 'next/image';
import {FC} from "react";

const ResponsiveImage = (props: any) => (
    <Image alt={props.alt} layout="responsive" {...props} />
);

const components = {
    img: ResponsiveImage,
    em: (props: any) => <i {...props} />,
    h1: (props: any) => <h1 {...props} />,
    h2: (props: any) => <h2 {...props} />,
    p: (props: any) => <p {...props} />,
    code: (props: any) => <pre {...props} />,
    // inlineCode: Code,
};

interface IProps{
    content:any
}
const MarkDownProvider:FC<IProps> = ({content}) => {
    return (
        <MDXProvider components={components}>
            {content && content}
        </MDXProvider>
    );
}

export default MarkDownProvider;