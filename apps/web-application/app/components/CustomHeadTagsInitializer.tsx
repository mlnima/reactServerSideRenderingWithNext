'use client';
import { useAppSelector } from '@store/hooks';
import parse from 'html-react-parser';

const CustomHeadTagsInitializer = () => {
    const customHeadTags = useAppSelector(
        ({ settings }) => settings?.initialSettings?.headDataSettings?.customHeadTags,
    );

    if (!customHeadTags) return null;

    return <span>{parse(customHeadTags)}</span>;
};
export default CustomHeadTagsInitializer;
