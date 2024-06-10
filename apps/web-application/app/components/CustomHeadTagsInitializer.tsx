'use client';
import { FC } from 'react';
import { useAppSelector } from '@store/hooks';
import parse from 'html-react-parser';

interface PropTypes {}

const CustomHeadTagsInitializer: FC<PropTypes> = ({}) => {
    const customHeadTags = useAppSelector(
        ({ settings }) =>
            //@ts-ignore
            settings?.initialSettings?.headDataSettings?.customHeadTags
    );

    if (!customHeadTags) return null;

    return <span>{parse(customHeadTags)}</span>;
};
export default CustomHeadTagsInitializer;
