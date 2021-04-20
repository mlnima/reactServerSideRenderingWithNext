import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';
import styled from "styled-components";
let StyledDiv = styled.div`
  max-width: 300px;
  .adminDesignSectionItems {
    .adminDesignSectionItem {
      padding: 20px;
      border-radius: 10px;
      background-color: var(--admin-dark-color-8);
      color: var(--admin-color-0);
      margin: 5px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      .adminDesignSectionItemTitle {
        font-size: small;
      }
      .previewColor {
        height: 30px;
        width: 30px;
        margin: 5px;
        border: .3px solid white;
      }
      input {
        margin: 5px;
      }
    }
  }
`



const AdminDesignSettingColorType = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});

    const onChangeHandler = e=>{
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]:e.target.value
        })
    }

    return (
        <StyledDiv className='AdminDesignSettingColorType'>
                <div className="adminDesignSectionItems">
                    <div className="adminDesignSectionItem">
                        <p className='adminDesignSectionItemTitle'>{ props.positionName.replace(/([A-Z])/g, " $1") } :</p>
                        <input name={ props.positionName } value={ contextData.siteDesign[props.positionName] } onChange={ e => onChangeHandler(e) }/>
                        <div className="previewColor" style={ {
                            background: [contextData.siteDesign[props.positionName]]
                        } }/>
                    </div>
                </div>
        </StyledDiv>
    );
};
export default AdminDesignSettingColorType;
