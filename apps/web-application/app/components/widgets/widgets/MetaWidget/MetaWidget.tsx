import {FC} from "react";
import {IMeta, MetasType} from "@repo/typescript-types";
import MetasRenderer from "@components/metas/MetasRenderer";

interface MetaWidgetPropType {
    uniqueData?: {
        metaData?: IMeta[],
        grouping?:boolean,
        metaType?:string
    },
    metaType: MetasType,
    locale:string
}

const MetaWidget: FC<MetaWidgetPropType> = ({metaType, uniqueData,locale}) => {
    return(
        <MetasRenderer locale={locale} metaData={uniqueData?.metaData} metaType={metaType || uniqueData?.metaType} grouping={uniqueData?.grouping}/>
    )
};

export default MetaWidget;

