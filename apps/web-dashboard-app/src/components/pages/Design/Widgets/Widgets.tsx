// @ts-nocheck
import React, {useState, useEffect, useMemo} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {widgetsStaticPositions} from "@repo/data-structures/dist/src";
import {DashboardStore, Store} from "@repo/typescript-types";
import {useAppDispatch} from "@store/hooks";
import {getWidgetsAction} from "@store/reducers/widgetsReducer";
import WidgetPositionsSelect from './WidgetPositionsSelect'
import WidgetGroupByPosition from './WidgetGroupByPosition'
import AddWidgetMenu from './AddWidgetMenu/AddWidgetMenu'

let StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  
  .widget-setting {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .top-panel {
      width: 100%;
    }

    .filter-positions {
      width: 100%;
    }

    .widgets {
      min-height: 600px;
      margin: auto;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }

  @media only screen and (min-width: 768px) {
    .widget-setting {
      h2 {
        justify-self: end;
        width: 98%;
      }
    }
  }
`

const AdminWidgets = () => {

    const dispatch = useAppDispatch()

    const {customPages, availablePositions} = useSelector(
        ({
             widgets,
             globalState
         }: DashboardStore) => {

            return {
                customPages: globalState?.customPages.reduce(
                    (customPositionsWithSidebars, currentPosition) => {
                        return [
                            ...customPositionsWithSidebars, currentPosition,
                            `${currentPosition}LeftSidebar`,
                            `${currentPosition}RightSidebar`
                        ]
                    }, []),
                availablePositions: Object.keys(widgets?.adminPanelWidgets)
            }
        })


    const allPositions = useMemo(() => ['all', ...widgetsStaticPositions, ...(customPages || [])],
        [customPages, availablePositions])


    const [filters, setFilters] = useState([])

    const onFilter = (position) => {
        setFilters(prevFilters => {
            const newSetOffData = prevFilters.includes(position) ?
                prevFilters.filter(p => p !== position) :
                [...prevFilters, position]

            localStorage.setItem('filterWidgetPosition', JSON.stringify(newSetOffData))
            return newSetOffData
        })
    }

    const onSelectAll = (actionType) => {
        if (actionType) {
            setFilters(allPositions)
            localStorage.setItem('filterWidgetPosition', '[all]')
        } else {
            setFilters([])
            localStorage.setItem('filterWidgetPosition', '[]')
        }
    }

    useEffect(() => {
        // dispatch(getWidgetsAction(null))
        if (typeof window !== 'undefined') {
            localStorage?.filterWidgetPosition === '[all]' && setFilters(allPositions);
            (localStorage?.filterWidgetPosition && localStorage?.filterWidgetPosition !== '[all]') &&
            setFilters(JSON.parse(localStorage?.filterWidgetPosition));
        }
    }, []);

    return (
        <StyledDiv className='admin-widgets-page'>
            <h1>Widgets Settings</h1>
            <div className='widget-setting'>
                <h2>Add New Widget:</h2>
                <div className="top-panel">
                    <AddWidgetMenu/>
                </div>
                <div className={'filter-positions'}>
                    <h2>Filter Position:</h2>
                    <WidgetPositionsSelect filters={filters}
                                           onChangeHandler={onFilter}
                                           onSelectAll={onSelectAll}
                                           availablePositions={availablePositions}
                                           allPositions={allPositions}
                    />
                </div>

                <h2>
                    Widgets:
                    <button onClick={() => dispatch(getWidgetsAction(null))} className={'btn btn-info'}>
                        Refresh
                    </button>
                </h2>
                <div className="widgets">
                    {availablePositions.map((position) => {
                        return (
                            <WidgetGroupByPosition filters={filters} key={position} position={position}/>
                        )
                    })}
                </div>
            </div>
        </StyledDiv>
    );
};



export default AdminWidgets;
