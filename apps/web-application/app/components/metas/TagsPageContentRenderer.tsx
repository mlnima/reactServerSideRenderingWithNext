import React, {FC} from 'react';
import {Meta} from "typescript-types";
import MetasRenderer from "@components/metas/MetasRenderer";

interface MetasCardsRendererPropTypes {
    metas: Meta[],
    locale: string,
    startWith?:string
}

const TagsPageContentRenderer: FC<MetasCardsRendererPropTypes> =
    ({
         metas,
         locale,
         startWith
     }) => {

        return (
            <>
                <div className={'tagsContainer'}>
                    <MetasRenderer metaData={metas} metaType={'tags'} locale={locale} startWith={startWith} isWidget={false}/>
                </div>
            </>
        );
    };
export default TagsPageContentRenderer;