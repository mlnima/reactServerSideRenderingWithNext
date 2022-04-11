import parse from 'html-react-parser';
import styled from "styled-components";
import {useRouter} from "next/router";
import {FC, useState} from "react";

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

    const [textToRender,setTextToRender] = useState(()=>{
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || ''
    })

    //const textData = translations ? translations[locale] ? translations[locale].text || text : text : text;
    // const textData = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || ''

    const data = parse(textToRender);

    //remove widgetText className after live project custom styles updated
    return (
        <WidgetTextTextDataStyledDiv className='widgetText widget-text'>
            {data}
        </WidgetTextTextDataStyledDiv>
    );

};

export default Text;
