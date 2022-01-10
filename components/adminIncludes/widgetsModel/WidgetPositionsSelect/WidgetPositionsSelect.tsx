import staticPositions from "../staticPositions";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

interface ComponentPropTypes {
    onChangeHandler: any,
    filter:string
}

const Component = ({onChangeHandler,filter}: ComponentPropTypes) => {
    const customPages = useSelector((store: StoreTypes) => store?.adminPanelGlobalState?.customPages)
    const allPositions= ['all',...staticPositions, ...(customPages || [])]

    const renderOptions = allPositions.map(position => {
        return (
            <option key={allPositions.indexOf(position)} value={position}>
                {position}
            </option>
        )
    })

    return (
        <select onChange={e => onChangeHandler(e)} className={'custom-select'} value={filter}>
            {renderOptions}
        </select>
    )
};
export default Component
