// import parse from 'html-react-parser';
import styled from "styled-components";
import {useRouter} from "next/router";
import {FC, useMemo} from "react";
import {Suspense} from 'react'

const WidgetTextTextDataStyledDiv = styled.div`
  color: var(--main-text-color);
  max-width: 100vw;
`

interface TextPropTypes {
    translations: {},
    text: string
}

const Text: FC<TextPropTypes> = ({translations, text}) => {
    const {locale} = useRouter();

    // const textToRender = useMemo(() => {
    //     return parse(locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || '');
    // }, [])
    const textToRender = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || '';
    }, [])

    return (
        <Suspense fallback={<p>Loading....</p>}>
            {/*<WidgetTextTextDataStyledDiv className={'widgetText widget-text'}>*/}
            {/*    {textToRender}*/}
            {/*</WidgetTextTextDataStyledDiv>*/}
            {textToRender ?
                <WidgetTextTextDataStyledDiv className={'widgetText widget-text'}
                                             dangerouslySetInnerHTML={{ __html: textToRender }}
                />
                :null
            }


        </Suspense>
    );

};

export default Text;
