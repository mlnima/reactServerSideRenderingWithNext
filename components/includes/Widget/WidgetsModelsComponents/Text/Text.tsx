import styled from "styled-components";
import {useRouter} from "next/router";
import {FC, useMemo} from "react";

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
    }, [])

    return (
            <WidgetTextTextDataStyledDiv className={'widgetText widget-text'} dangerouslySetInnerHTML={{__html:textToRender}}/>
    );

};

export default Text;
