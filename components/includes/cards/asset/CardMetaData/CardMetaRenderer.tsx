import {FC} from "react";
import CardMetaItem from "./CardMetaItem";
import {Meta} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";

interface CardMetaRendererPropTypes {
    metas?: Meta[]
}

const CardMetaRenderer: FC<CardMetaRendererPropTypes> = ({metas}) => {
    return (
        <>
            {(metas || []).filter((meta: Meta) => meta?.name?.length > 1).map((meta, index) => {
                return (
                    <CardMetaItem meta={meta} key={index}/>
                )
            })}
        </>
    );
};

export default CardMetaRenderer;