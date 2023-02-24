import React, {FC, useMemo} from 'react';
import styled from "styled-components";
import parse from 'html-react-parser'
import {useRouter} from "next/router";

interface PropTypes{
    translations:{},
    text:string
}

const Style = styled.div`
  color: var(--main-text-color);
  max-width: 100vw;
`

const WidgetText:FC<PropTypes> = ({translations, text}) => {

    const {locale} = useRouter();

    const stringToRender = useMemo(() => {
        //@ts-ignore
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? text : translations?.[locale]?.text || text || '';
    }, [text,translations,locale])

    return (
        <Style>
            {parse(stringToRender)}
        </Style>
    )
};

export default WidgetText;
