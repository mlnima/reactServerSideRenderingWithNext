import styled from "styled-components";
import {FC} from "react";
import convertVariableNameToName from "@_variables/util/convertVariableNameToName";

const PositionSelectorStyledDiv = styled.div`
  .btn{
    width: 100px;
    margin: auto;
  }
  .check-boxes{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    align-items: center;
    justify-content: space-between;
    .position-check-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: var(--default-border);
      padding: 1px ;
      margin: 1px ;
      p{
        padding: 1px ;
        margin: 1px ;
      }
    }
  }

@media only screen and (min-width: 768px) {
  margin: auto;
  .check-boxes{
    margin: auto;
    width: 90%;
  }
 
}

`

interface PositionSelectorPropTypes {
    onChangeHandler: any,
    onSelectAll: any,
    filters: string[],
    allPositions: string[],
}

const PositionSelector: FC<PositionSelectorPropTypes> = ({onChangeHandler, filters,onSelectAll,allPositions}) => {

    const renderCheckBoxes = allPositions.sort((a, b) => a > b ? 1 : -1).map(position => {
        return (
            <div className={'position-check-box'}>
                <p>{convertVariableNameToName(position)}</p>
                <input type={'checkbox'} name={position} onChange={onChangeHandler}
                       checked={filters.includes(position)}/>
            </div>
        )
    })

    return (
        <PositionSelectorStyledDiv className={'position-selector'}>
            <button onClick={()=>onSelectAll(true)} className={'btn btn-primary'}>+</button>
            <button onClick={()=>onSelectAll(false)} className={'btn btn-primary'}>-</button>
            <div className={'check-boxes'}>
                {renderCheckBoxes}
            </div>

        </PositionSelectorStyledDiv>
    )
};
export default PositionSelector
