import {useState, useEffect} from 'react';
import AddWidgetMenu from '@components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import WidgetGroupByPosition
    from "../../../../components/adminIncludes/widgetPageComponents/WidgetGroupByPosition/WidgetGroupByPosition";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import WidgetPositionsSelect
    from "../../../../components/adminIncludes/widgetsModel/WidgetPositionsSelect/WidgetPositionsSelect";
import {adminPanelGetWidgets} from "@store/adminActions/adminWidgetsActions";


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

    const availablePositions = useSelector(({adminPanelWidgets}: StoreTypes) =>
        Object.keys(adminPanelWidgets?.adminPanelWidgets))

    const dispatch = useDispatch()

    const [filter, setFilter] = useState('all')

    const onFilter = (e) => {
        setFilter(e.target.value)
        localStorage.filterwidgetPosition = e.target.value
    }

    const onFilterByButton = (position: string) => {
        setFilter(position)
        localStorage.filterwidgetPosition = position
    }


    useEffect(() => {
        dispatch(adminPanelGetWidgets())
        typeof window !== 'undefined' && localStorage?.filterwidgetPosition !== 'all' ?
            setFilter(localStorage?.filterwidgetPosition) : null
    }, []);

    return (
        <StyledDiv className='admin-widgets-page'>
            <h1>Widgets Settings</h1>
            <div className='widget-setting'>
                <h2>Add New Widget</h2>
                <div className="top-panel">
                    <AddWidgetMenu/>
                </div>
                <div className={'filter-positions'}>
                    <h2>Filter Position:</h2>
                    <WidgetPositionsSelect filter={filter} onChangeHandler={onFilter}
                                           onFilterByButton={onFilterByButton}/>
                </div>

                <h2>Widgets: <button onClick={() => dispatch(adminPanelGetWidgets())}
                                     className={'btn btn-info'}>Refresh</button></h2>
                <div className="widgets">
                    {availablePositions.map((position) => {
                        return (
                            <WidgetGroupByPosition filter={filter} key={position} position={position}/>
                        )
                    })}
                </div>
            </div>
        </StyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default AdminWidgets;
