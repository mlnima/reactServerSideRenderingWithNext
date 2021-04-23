import  { useState } from 'react';
import Switch from "react-switch";
import styled from "styled-components";
let StyledDiv = styled.div`
  .editor{
    display: flex;
    justify-content: center;
    img{
      margin: auto;
      width: 320px;
      height: 180px ;
    }
  }
`

const ImagePreview = props => {

    const [ state, setState ] = useState({
        open: false
    })

    if (props.postData.mainThumbnail) {

        if (state.open) {
            return (
                <StyledDiv className='ImagePreview VideoInformationSection'>


                    <div className="title">
                        <p>Image Preview</p>
                        <Switch onChange={ () => state.open ? setState({ ...state, open: false }) : setState({ ...state, open: true }) } checked={ state.open  }/>
                    </div>
                    <div className="editor">

                        <img src={ props.postData.mainThumbnail }/>
                    </div>
                </StyledDiv>
            );
        } else return (

                <StyledDiv className='ImagePreview VideoInformationSection'>
                    <div className="title">
                        <p>Image Preview</p>
                        <Switch onChange={ () => state.open ? setState({ ...state, open: false }) : setState({ ...state, open: true }) } checked={ state.open  }/>
                    </div>
                    <div className="editor">

                    </div>
                </StyledDiv>

        )

    } else return null

};
export default ImagePreview;