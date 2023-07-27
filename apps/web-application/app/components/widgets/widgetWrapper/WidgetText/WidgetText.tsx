import {FC} from "react";
import parse from 'html-react-parser'
import WidgetTextStyles from "@components/widgets/widgetWrapper/WidgetText/WidgetText.styles";

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
        <WidgetTextStyles className={'widgetText widget-text'} >
            {parse(
                locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                    text :
                    translations?.[locale]?.text || text || '')
            }
        </WidgetTextStyles>
    );

};

export default WidgetText;
