import React, {useState, useEffect, useMemo} from 'react';
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
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import staticPositions from "@components/adminIncludes/widgetsModel/staticPositions";


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

    const dispatch = useDispatch()

    const {customPages, availablePositions} = useSelector(({adminPanelWidgets, adminPanelGlobalState}: StoreTypes) => {
        return {
            customPages: adminPanelGlobalState?.customPages.reduce((customPositionsWithSidebars,currentPosition)=>{
                return [...customPositionsWithSidebars,currentPosition,`${currentPosition}LeftSidebar`,`${currentPosition}RightSidebar`]
            },[]),
            availablePositions: Object.keys(adminPanelWidgets?.adminPanelWidgets)
        }
    })

    const allPositions = useMemo(() => ['all', ...staticPositions, ...(customPages || [])], [customPages, availablePositions])

    const [filters, setFilters] = useState([])

    const onFilter = (e) => {
        setFilters(prevFilters => {
            const newSetOffData = prevFilters.includes(e.target.name) ?
                prevFilters.filter(p => p !== e.target.name) :
                [...prevFilters, e.target.name]

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
        dispatch(adminPanelGetWidgets())
        if (typeof window !== 'undefined') {
            localStorage?.filterWidgetPosition === '[all]' && setFilters(allPositions);
            (localStorage?.filterWidgetPosition && localStorage?.filterWidgetPosition !== '[all]') &&
            setFilters(JSON.parse(localStorage?.filterWidgetPosition));
        }
    }, []);

    useEffect(() => {
        // console.log(customPages)
        // localStorage.setItem('filterWidgetPosition',JSON.stringify(filters))
    }, [customPages]);

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
                    <WidgetPositionsSelect filters={filters}
                                           onChangeHandler={onFilter}
                                           onSelectAll={onSelectAll}
                                           allPositions={allPositions}
                    />
                </div>

                <h2>
                    Widgets:
                    <button onClick={() => dispatch(adminPanelGetWidgets())} className={'btn btn-info'}>
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

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

AdminWidgets.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export default AdminWidgets;
