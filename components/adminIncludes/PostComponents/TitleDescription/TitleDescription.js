import loadable from '@loadable/component';
import NoSSR from 'react-no-ssr';
const TextEditor = loadable(() => import('../../TextEditor/TextEditor'))
import styled from "styled-components";
let StyledDiv = styled.div`
  width: 98%;
  padding:  1%;
  margin: auto;
  .quill {
    width: 100%;
    margin-left: -1%;
  }
  .TitleDescriptionTitle {
    @include inputNormalWithRadius;
    width: 98% ;
    padding: 0 1%;
    background-color: white;
    border: .1px solid rgba(0,0,0,.2);
  }

  .TitleDescriptionDescription {
    margin-top: 10px;
    min-height: 600px;
    @include inputNormalWithRadius;
    width: 95%;
    background-color: white;
  }
  .editor-switcher{
    margin-top: 10px ;
    button{
     outline: none;
      margin: 0 5px;
      padding: 5px 10px ;

    }
  }
  .text-editor{

    .container{
      //min-height: 600px !important;
    }
  }
`


const TitleDescription = props => {


    return (
        <StyledDiv className='title-description'>
            <input type="text" name='title'
                   value={(props.activeEditingLanguage === 'default' ? props.textInputsState.title : props.textInputsState?.translations?.[props.activeEditingLanguage]?.title) || ''}
                   className='TitleDescriptionTitle' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            <NoSSR>
                <TextEditor
                    state={props.textInputsState}
                    activeEditingLanguage={props.activeEditingLanguage}
                    onChangeHandler={props.onDescriptionChangeHandler}
                    rendering={true}
                    valueData={ (props.activeEditingLanguage === 'default' ? props.textInputsState.description : props?.textInputsState.translations?.[props.activeEditingLanguage]?.description) || ''}
                />
            </NoSSR>
        </StyledDiv>
    );
};

export default TitleDescription;
