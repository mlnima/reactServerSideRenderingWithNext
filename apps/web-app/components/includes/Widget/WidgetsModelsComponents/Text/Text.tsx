import styled from "styled-components";
import {useRouter} from "next/router";
import {FC, useMemo} from "react";
import parse from 'html-react-parser'

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

    const textToRender = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || '';
    }, [text,translations])

    return (
        <WidgetTextTextDataStyledDiv className={'widgetText widget-text'} >
            {parse(textToRender)}
        </WidgetTextTextDataStyledDiv>
    );

};

export default Text;
