import {FC, useEffect, useMemo} from "react";
import {Meta} from "typescript-types";
import MetasRenderer from "../../metasPage/MetasRenderer";

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

