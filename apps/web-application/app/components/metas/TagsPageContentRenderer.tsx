import React, { FC } from 'react';
import { IMeta } from "@repo/typescript-types";
import MetasRenderer from '@components/metas/MetasRenderer';

interface IProps {
    metas: IMeta[];
    locale: string;
    startWith?: string;
}

const TagsPageContentRenderer: FC<IProps> = ({ metas, locale, startWith }) => {
    return (
        <div className={'tagsContainer'}>
            <MetasRenderer
                metaData={metas}
                metaType={'tags'}
                locale={locale}
                startWith={startWith}
                grouping={true}
            />
        </div>
    );
};
export default TagsPageContentRenderer;
