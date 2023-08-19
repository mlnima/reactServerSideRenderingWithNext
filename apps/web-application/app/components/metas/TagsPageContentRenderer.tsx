import React, {FC} from 'react';
import {Meta} from "typescript-types";
import MetasRenderer from "@components/metas/MetasRenderer";

interface MetasCardsRendererPropTypes {
    metas: Meta[],
    locale: string,
}

const TagsPageContentRenderer: FC<MetasCardsRendererPropTypes> =
    ({
         metas,
         locale,
     }) => {

        return (
            <>
                <div className={'tagsContainer'}>
                    <MetasRenderer metaData={metas} metaType={'tags'} locale={locale}/>
                </div>
            </>
        );
    };
export default TagsPageContentRenderer;