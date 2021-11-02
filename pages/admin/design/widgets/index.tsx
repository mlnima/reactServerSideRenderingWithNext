import {useState,useEffect} from 'react';
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import WidgetGroupByPosition from "../../../../components/adminIncludes/widgetPageComponents/WidgetGroupByPosition/WidgetGroupByPosition";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

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

    .widgets {
      margin: auto;
      width: 100%;
      display: flex;
      justify-content: flex-start;
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

    const widgets = useSelector((store:StoreTypes) => store?.widgets.widgets)
    const [availablePositions,setAvailablePositions] = useState( [])

    useEffect(() => {
        // @ts-ignore
        setAvailablePositions(()=>{
            // @ts-ignore
            return [...new Set(widgets.map(widgets => widgets?.data?.position).sort())]
        })
    }, [widgets]);


    return (
        <StyledDiv className='admin-widgets-page'>
            <h1>Widgets Settings</h1>
            <div className='widget-setting'>
                <h2>Add New Widget</h2>
                <div className="top-panel">
                    <AddWidgetMenu/>
                </div>
                <h2>Widgets:</h2>
                <div className="widgets">
                    {availablePositions.map((position) => {
                        return (
                            <WidgetGroupByPosition key={position} position={position}/>
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