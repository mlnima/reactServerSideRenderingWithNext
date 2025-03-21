import { FC } from 'react';
import parse from 'html-react-parser';
import './WidgetText.scss';
import { textContentReplacer } from '@repo/utils';
import { rtlLanguages } from '@repo/data-structures';


interface TextPropTypes {
  translations: {
    [key: string]: {
      [key: string]: string
    }
  },
  locale: string
  text: string
}

const WidgetText: FC<TextPropTypes> = ({ translations, text, locale }) => {
//  locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE
  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
  return (
    <div className={'widgetText widget-text'} style={{
      textAlign: rtlLanguages.includes(locale) &&
      (rtlLanguages.includes(defaultLocale) || !!translations?.[locale]?.text) ?
        'right' :
        'left',
    }}>
      {parse(`${textContentReplacer(translations?.[locale]?.text || text || '')}`)}
    </div>
  );

};

export default WidgetText;
// {parse(`${translations?.[locale]?.text || text || ''}`)}