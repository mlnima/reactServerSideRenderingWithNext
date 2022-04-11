import parse from 'html-react-parser';
import styled from "styled-components";
import {useRouter} from "next/router";
import {FC, useMemo} from "react";
import {Suspense} from 'react'

const WidgetTextTextDataStyledSpan = styled.span`
  color: var(--main-text-color);
  max-width: 100vw;
`

interface TextPropTypes {
    translations: {},
    text: string
}

const Text: FC<TextPropTypes> = ({translations, text}) => {
    const {locale} = useRouter();

    const textToRender = useMemo(() => {
        return parse((locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || '').replaceAll('\n',''), { trim: true });
    }, [])

    return (
        <Suspense fallback={<span>Loading....</span>}>
            <WidgetTextTextDataStyledSpan className={'widgetText widget-text'}>
                {textToRender}
            </WidgetTextTextDataStyledSpan>
        </Suspense>
    );

};

export default Text;
