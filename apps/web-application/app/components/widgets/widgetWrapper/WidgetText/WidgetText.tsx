import {FC} from "react";
import parse from 'html-react-parser'
import './WidgetText.scss'
import { textContentReplacer } from 'shared-util';

interface TextPropTypes {
    translations: {
        [key: string]: {
            [key: string]:string
        }
    },
    locale:string
    text: string
}

const WidgetText: FC<TextPropTypes> = ({translations, text,locale}) => {

    return (
        <div className={'widgetText widget-text'} >
            {parse(`${ textContentReplacer(translations?.[locale]?.text || text || '')}`)}
        </div>
    );

};

export default WidgetText;
// {parse(`${translations?.[locale]?.text || text || ''}`)}