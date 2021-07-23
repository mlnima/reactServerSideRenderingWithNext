import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import {  getSetting, updateSetting } from '../../../_variables/ajaxVariables'
import { AppContext } from '../../../context/AppContext'
import { getAbsolutePath } from '../../../_variables/_variables'
import styled from "styled-components";
let StyledForm = styled.form`
  .colorsContent {
    @include adminDesignPageItems;

    .adminDesignSection {
      border-radius: 10px;

      .adminDesignSectionItems {
        .adminDesignSectionItem {
          padding: 20px;
          border-radius: 10px;
          background-color: $dark80;
          color: $light100;
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
    }
  }

  .submitBtn {
    @include greenActionBtn;
  }
  .customStyle {
  textarea {
    width: 90%;
    min-height: 300px;
    background-color: $light100;
    font-weight: bold;
  }

  .submitBtn {
    @include greenActionBtn;
  }
}
`

const design = props => {
    const contextData = useContext(AppContext);
    const [ colors, setColors ] = useState({
        themeColor: props.design.themeColor || '',
    });

    const renderColorsFields = Object.keys(colors).map(element => {
        return (
            <div key={ element } className="adminDesignSection">
                <div className="adminDesignSectionItems">
                    <div className="adminDesignSectionItem">
                        <p className='adminDesignSectionItemTitle'>{ element.replace(/([A-Z])/g, " $1") } :</p>
                        <input name={ element } value={ colors[element] } onChange={ e => onChangeHandler(e) }/>
                        <div className="previewColor" style={ { backgroundColor: colors[element] } }/>
                    </div>
                </div>
            </div>
        )
    })

    return null;
};

export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let design;
    let customStyles;
    const designData = await getSetting('design', domainName, false);
    const customStylesData = await getSetting('customStyle', domainName, false);

    design = designData.data.setting ? designData.data.setting.data : {}
    customStyles = customStylesData.data.setting ? customStylesData.data.setting : {}
    return {props:{ design, customStyles }}
}

export default design;
