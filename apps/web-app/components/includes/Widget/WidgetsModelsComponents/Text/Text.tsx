import styled from "styled-components";
import {useRouter} from "next/router";
import {FC} from "react";
import parse from 'html-react-parser'

const WidgetTextTextDataStyledDiv = styled.div`
  color: var(--main-text-color);
  max-width: 100vw;
`

interface TextPropTypes {
    translations: {},
    text: string
}

//not in use for now-
const Text: FC<TextPropTypes> = ({translations, text}) => {
    const {locale} = useRouter();

    // const textToRender = useMemo(() => {
    //     return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || '';
    // }, [text,translations,locale])

    return (
        <WidgetTextTextDataStyledDiv className={'widgetText widget-text'} >
            {parse(locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || '')}
        </WidgetTextTextDataStyledDiv>
    );

};

export default Text;
