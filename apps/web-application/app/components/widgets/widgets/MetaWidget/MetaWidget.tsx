import {FC} from "react";
import {Meta} from "typescript-types";
import MetasRenderer from "@components/metas/MetasRenderer";

interface MetaWidgetPropType {
    uniqueData?: {
        metaData?: Meta[],
    },
    metaType: string,
    locale:string
}

const MetaWidget: FC<MetaWidgetPropType> = ({metaType, uniqueData,locale}) => {
    return(
        <MetasRenderer locale={locale} metaData={uniqueData?.metaData} metaType={metaType}/>
    )
};

export default MetaWidget;

