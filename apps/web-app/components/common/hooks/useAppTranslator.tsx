import useTranslation from 'next-translate/useTranslation';

interface WordTranslatorProps {
    nameSpace?: string;
    word: string;
}

const useAppTranslator=({ nameSpace, word }: WordTranslatorProps): string =>{
    const { t } = useTranslation(nameSpace || 'common');

    return t(
        `${nameSpace || 'common'}:${word}`,
        {},
        {
            fallback: t(`customTranslation:${word}`, {}, {fallback: word})
        },
    );
}

export default useAppTranslator;