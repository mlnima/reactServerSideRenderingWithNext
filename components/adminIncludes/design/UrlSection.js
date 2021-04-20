import { useContext } from 'react';
import { convertVariableNameToName } from '../../../_variables/_variables'
import { AppContext } from '../../../context/AppContext'
import { DelayInput } from 'react-delay-input';
import SaveDesignChangesBtn from './SaveDesignChangesBtn'
import styled from "styled-components";
let StyledDiv = styled.div`
  background-color:var(--admin-color-8);
  color: var(--admin-color-0);
  padding: 10px;
  border-radius: 10px;
`
const UrlSection = props => {
    const contextData = useContext(AppContext);

    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]: e.target.value
        })
    }

    return (
        <StyledDiv className='url-setting-Section'>
            <div>
                <p>{props.designName?convertVariableNameToName(props.designName):''} : </p>
                <DelayInput className='admin-input' name={ props.designName } value={contextData.siteDesign[props.designName]} onChange={ e => onChangeHandler(e) }/>
            </div>
            <SaveDesignChangesBtn/>
        </StyledDiv>
    );
};
export default UrlSection;
