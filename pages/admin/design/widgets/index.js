import {useEffect, useState, useContext} from 'react';
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import {AppContext} from '../../../../context/AppContext'
import {getMultipleSetting, getMultipleWidgetWithData, getPagesData} from '../../../../_variables/ajaxVariables'
import WidgetGroupByPosition from "../../../../components/adminIncludes/widgetPageComponents/WidgetGroupByPosition/WidgetGroupByPosition";
import _ from 'lodash';
import styled from "styled-components";
let StyledDiv = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  #widget-setting {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .sidePanel{
      width: 100%;
      .AddWidgetMenu{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 5px;
        .AddWidgetWithPositionMenu{
          //justify-self: stretch;
          //width: 200px;
          position: relative;
          //margin: auto;
          .positionsOpener{
            justify-self: stretch;
            width: 100%;
            background-color: var(--admin-darkcolor70);
            color: var(--admin-text-color);
            border :none;
            padding: 5px 10px;
          }
          .AddWidgetWithPositionMenuPositions{
           // position: absolute;
            z-index: 1;
            background-color: var(--admin-darkcolor70);
            //width: 200px;
            display: grid;
            grid-template-columns: 1fr;
            .AddWidgetWithPositionMenuPositionsBtn{
              padding: 2px ;
            }
          }
        }
      }
    }

    .saveBtn {
      @include greenActionBtn;
    }
    .widgets {
      margin: 20px 0;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-gap: 10px;
    }
  }
  
  @media only screen and (min-width: 768px) {
    #widget-setting {
      h2{
        justify-self: end;
        width: 98%;
      }
      .widgets {
       grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
       display:flex;
       flex-wrap:wrap;
      }
    }
}
`

const HomePageWidgets = props => {
    const contextData = useContext(AppContext);

    const [siteIdentity, setSiteIdentity] = useState({
        translationLanguages: []
    })
    const [customPages, setCustomPages] = useState([])

    useEffect(() => {
        getAndSetCustomPagesData()
      
        setSiteIdentity({
            ...siteIdentity,
            ...props.identity.data
        })

        contextData.dispatchWidgetsSettings({
            ...contextData.widgetsSettings,
            widgets: [...(props.widgets || [])]
        })
    }, []);

    const getAndSetData = () => {
        getAndSetCustomPagesData()
        contextData.dispatchWidgetsSettings({
            ...contextData.widgetsSettings,
            widgets: [...(props.widgets || [])]
        })

    }

    const getAndSetWidgetsData = () => {
        getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(widgetsData => {
            if (widgetsData.data.widgets) {
                contextData.dispatchWidgetsSettings({
                    ...contextData.widgetsSettings,
                    widgets: [...(widgetsData?.data?.widgets|| [])]
                })
            }
        })
    }
    const getAndSetCustomPagesData = () => {
        getPagesData().then(res => {
            if (res.data) {
                if (res.data.pages) {
                    const pagesNames = res.data.pages.map(page => page.pageName)
                    setCustomPages(pagesNames)
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const renderWidgetsInPosition = [...new Set((contextData?.widgetsSettings?.widgets || []).map(widgets => {
        return widgets?.data?.position
    }))].map(position => {
        const widgetsInGroupByPosition = contextData.widgetsSettings?.widgets?.filter(widgets => widgets?.data?.position === position)
        const widgetsOnThisType = widgetsInGroupByPosition.sort((a, b) => (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
        return (
            <WidgetGroupByPosition widgetsInGroupByPosition={widgetsInGroupByPosition} key={_.uniqueId('id_')} siteIdentity={siteIdentity} position={position}
                                   widgets={widgetsOnThisType} customPages={customPages} getAndSetWidgetsData={getAndSetWidgetsData}/>
        )
    })


    return (
        <StyledDiv className='admin-widgets-page'>
            <h1>Widgets Settings</h1>

            <div id='widget-setting'>
                <h2>Add New Widget</h2>
                <div className="sidePanel">
                    <AddWidgetMenu getAndSetData={getAndSetData} customPages={customPages}/>
                </div>
                <h2>Widgets:</h2>
                <div className="widgets">
                    {renderWidgetsInPosition}
                </div>
            </div>
        </StyledDiv>
    );
};

export const getServerSideProps = async (context) => {
    const settingsData = await getMultipleSetting({settings: ['identity']},process.env.REACT_APP_PRODUCTION_URL, false, 'adminPostPage')
    const widgetsData = await getMultipleWidgetWithData({widgets: ['all']}, process.env.REACT_APP_PRODUCTION_URL, false, Date.now())
    const settingsArr = settingsData?.data?.settings
    let finalSettings = {}
    settingsArr.forEach(setting => {
        if (setting) {
            finalSettings[setting.type] = setting
        }
    })



    return {props: {widgets: widgetsData?.data?.widgets || null, identity: finalSettings?.identity||null}}
}


export default HomePageWidgets;
