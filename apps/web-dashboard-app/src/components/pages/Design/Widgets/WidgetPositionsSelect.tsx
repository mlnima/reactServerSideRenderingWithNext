import styled from "styled-components";
import {FC} from "react";
import {convertVariableNameToName} from "@repo/utils";

const PositionSelectorStyledDiv = styled.div`


  .check-boxes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2px 5px;
    align-items: center;
    justify-content: space-between;

    .btn {
      display: flex;
      align-items: center;
      justify-content: space-between;


      border-radius: 3px;
      padding: 1px;
      margin: 1px;
      text-overflow: ellipsis;
      cursor: pointer;

      p {
        padding: 1px;
        margin: 1px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.5s ease;

        //&:hover {
        //  text-overflow: clip;
        //  white-space: pre-wrap;
        //}

      }

    }
  }

  .unselect-all, .select-all {
    width: 100px;
    margin: auto;
  }
`

interface PositionSelectorPropTypes {
    onChangeHandler: any,
    onSelectAll: any,
    filters: string[],
    allPositions: string[],
    availablePositions: string[],
}

const PositionSelector: FC<PositionSelectorPropTypes> = ({
                                                             onChangeHandler,
                                                             filters,
                                                             onSelectAll,
                                                             allPositions,
                                                             availablePositions
                                                         }) => {

    const renderCheckBoxes = availablePositions?.sort((a, b) => a.localeCompare(b))?.map(position => {
        return (
            <div className={`btn ${filters.includes(position) ? 'btn-primary' : 'btn-dark'}`}
                 key={position}
                 title={position}
                 onClick={() => onChangeHandler(position)}>
                <p>{convertVariableNameToName(position)}</p>
            </div>
        )
    })

    return (
        <PositionSelectorStyledDiv className={'position-selector'}>
            <button onClick={() => onSelectAll(true)} className={'btn btn-primary select-all'}>+</button>
            <button onClick={() => onSelectAll(false)} className={'btn btn-primary unselect-all'}>-</button>
            <div className={'check-boxes'}>
                {renderCheckBoxes}
            </div>

        </PositionSelectorStyledDiv>
    )
};
export default PositionSelector
