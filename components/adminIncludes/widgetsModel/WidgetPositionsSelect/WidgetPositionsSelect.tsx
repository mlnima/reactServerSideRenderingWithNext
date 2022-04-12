import staticPositions from "../staticPositions";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import capitalizeFirstLetter from "../../../../_variables/util/capitalizeFirstLetter";

import styled from "styled-components";
import {FC} from "react";
import convertVariableNameToName from "@_variables/util/convertVariableNameToName";

const PositionSelectorStyledDiv = styled.div`
  .custom-select {
    margin: 20px 0;
  }

  .positions-buttons {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 20px 0;
    button {
      width: 150px;
      font-size: 12px;
    }

  }
`

interface PositionSelectorPropTypes {
    onChangeHandler: any,
    onFilterByButton: any,
    filter: string
}

const PositionSelector: FC<PositionSelectorPropTypes> = ({onChangeHandler, filter, onFilterByButton}) => {
    const customPages = useSelector((store: StoreTypes) => store?.adminPanelGlobalState?.customPages)
    const quickFilterPositions = [
        'all',
        'deactivated',
        'topBar',
        'header',
        'navigation',
        'home',
        'underPost',
        'footer',
    ]


    const allPositions = ['all', ...staticPositions, ...(customPages || [])]

    const renderOptions = allPositions.sort((a, b) => a > b ? 1 : -1).map(position => {

        return (
            <option key={allPositions.indexOf(position)} value={position}>
                {position}
            </option>
        )
    })





    const renderStaticPositionsButton = quickFilterPositions.map(position => {
        return (
            <button className={'btn btn-primary'} key={position} onClick={() => onFilterByButton(position)}>
                {convertVariableNameToName(position)}
            </button>
        )
    })


    return (
        <PositionSelectorStyledDiv className={'position-selector'}>
            <select onChange={e => onChangeHandler(e)} className={'custom-select'} value={filter}>
                {renderOptions ? capitalizeFirstLetter(renderOptions) : ''}
            </select>
            <div className={'positions-buttons'}>
                {renderStaticPositionsButton}
            </div>

        </PositionSelectorStyledDiv>
    )
};
export default PositionSelector
