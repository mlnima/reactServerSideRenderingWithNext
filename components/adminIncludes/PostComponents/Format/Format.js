import styled from "styled-components";
let StyledDiv = styled.div`
  select{
    border: none;
    background-color: #f1f1f1;
    padding: 4px;
    border-radius: 5px;
  }
`
const Format = props => {

    return (
        <StyledDiv className='Format'>
            <select name='postType' value={ props.postData.postType } onChange={ e => props.onChangeHandler(e) }>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
                <option value='product'>Product</option>
                <option value='redirect'>Product</option>
                <option value='article'>Article</option>
                <option value='code'>Code</option>
            </select>
        </StyledDiv>
    );
};


export default Format;