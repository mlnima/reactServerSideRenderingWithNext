import styled from "styled-components";
const FormatStyledDiv = styled.div`
.custom-select{
  width: 100%;
}
`
const Format = props => {

    return (
        <FormatStyledDiv className='format-section'>
            <select className={'custom-select'} name='postType' value={props.postData.postType} onChange={e => props.onChangeHandler(e)}>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
                <option value='product'>Product</option>
                <option value='redirect'>Redirect</option>
                <option value='promotion'>promotion</option>
                <option value='article'>Article</option>
                <option value='code'>Code</option>
            </select>
        </FormatStyledDiv>
    );
};

export default Format;