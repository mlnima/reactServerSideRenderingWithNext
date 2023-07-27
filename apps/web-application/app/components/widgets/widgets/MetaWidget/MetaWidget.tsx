import {FC} from "react";
import {Meta} from "typescript-types";
import MetasRenderer from "@components/metas/MetasRenderer";

interface MetaWidgetPropType {
    uniqueData?: {
        metaData?: Meta[],
    },
    metaType: string
}

const MetaWidget: FC<MetaWidgetPropType> = ({metaType, uniqueData}) => {
    return(
        <MetasRenderer metaData={uniqueData?.metaData} metaType={metaType}/>
    )
};

export default MetaWidget;

