import React, { FC } from 'react';
import { Meta } from 'typescript-types';
import MetasRenderer from '@components/metas/MetasRenderer';

interface IProps {
    metas: Meta[];
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
                isWidget={false}
            />
        </div>
    );
};
export default TagsPageContentRenderer;
