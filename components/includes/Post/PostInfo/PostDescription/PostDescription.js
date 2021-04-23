import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
let StyledDiv = styled.div`
 .ql-indent-1{
    margin: 0 10px;
  }
  .ql-indent-1{
    margin: 0 20px;
  }
  .ql-indent-2{
    margin: 0 30px;
  }
  .ql-indent-3{
    margin: 0 40px;
  }
  .ql-indent-4{
    margin: 0 50px;
  }
  .ql-indent-5{
    margin: 0 60px;
  }
  .ql-indent-6{
    margin: 0 70px;
  }
  .ql-indent-7{
    margin: 0 80px;
  }
  .ql-indent-8{
    margin: 0 90px;
  }
  .ql-indent-9{
    margin: 0 100px;
  }
  .ql-indent-10{
    margin: 0 110px;
  }
  .ql-indent-11{
    margin: 0 120px;
  }
  .ql-indent-12{
    margin: 0 130px;
  }
  .ql-indent-13{
    margin: 0 140px;
  }
  .ql-indent-14{
    margin: 0 150px;
  }
  .ql-indent-15{
    margin: 0 160px;
  }
  .ql-indent-16{
    margin: 0 170px;
  }
  .ql-indent-17{
    margin: 0 180px;
  }
  .ql-indent-18{
    margin: 0 190px;
  }
  .ql-indent-19{
    margin: 0 200px;
  }
  .ql-indent-20{
    margin: 0 210px;
  }
  .ql-indent-21{
    margin: 0 220px;
  }
${props => props.stylesData}
`;

const PostDescription = ({description,translations}) => {
    const contextData = useContext(AppContext);
    const descriptionElement = useRef(null);

    const [state, setState] = useState({
        description: ''
    })

    useEffect(() => {
        if (description){
            setState({
                ...state,
                description: translations ? translations[contextData.state.activeLanguage] ? translations[contextData.state.activeLanguage].description || description : description : description
            })
        }
    }, [description]);

    useEffect(() => {
        if (descriptionElement){
            if (state.description.includes('</')){
                descriptionElement.current.innerHTML = state.description
            }else {
                descriptionElement.current.innerHTML = `<p>${state.description}</p>`
            }
        }
    }, [state.description]);

    return (
        <StyledDiv ref={descriptionElement} className="description"/>
    )
};
export default PostDescription;
