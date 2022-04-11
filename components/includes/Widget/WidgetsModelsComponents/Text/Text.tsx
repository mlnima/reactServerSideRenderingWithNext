import parse from 'html-react-parser';
import styled from "styled-components";
import {useRouter} from "next/router";
import {FC} from "react";

const TextStyledDiv = styled.div`
  color: var(--main-text-color);
  max-width: 100vw;
`

interface TextPropTypes {
    translations: {},
    text: string
}

const Text: FC<TextPropTypes> = ({translations, text}) => {
    const {locale} = useRouter();


    //const textData = translations ? translations[locale] ? translations[locale].text || text : text : text;
    const textData = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || ''

    const data = parse(textData);
    //remove widgetText className after live project custom styles updated
    return (
        <TextStyledDiv className='widgetText widget-text'>
            {data}
        </TextStyledDiv>
    );
};
export default Text;
