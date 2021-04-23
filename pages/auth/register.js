import React, {useState, useRef, useContext} from 'react';
import withRouter from "next/dist/client/with-router";
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import styled from "styled-components";

let StyledDiv = styled.div`
  display: flex;
  justify-content: center;

  .authForm {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .messageLabel {
      width: 250px;
      margin-top: 20px;
      padding: 10px 0;
      font-size: large;
      font-weight: bold;
      border-radius: 5px;
      background-color: transparent;
      text-align: center;
    }

    .authFormItem {
        p{
          color: var(--main-text-color);
        }
      input {
        border-radius: 5px;
        outline: none;
        border: none;
        padding: 3px 5px;
        width: 200px;
        height: 30px;
      }
    }
  }
`
const Register = props => {
    const contextData = useContext(AppContext);
    const messageLabel = useRef(null);
    const router = useRouter()
    const [state, setState] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        password2: undefined
    });
    const [data, setData] = useState({
        response: undefined,
        type: undefined,
    });

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };
    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post('/api/v1/users/register', state).then(res => {
            if (type === 'success') {
                messageLabel.current.style.backgroundColor = 'green'
            } else {
                messageLabel.current.style.backgroundColor = 'red'
            }

            setData({
                ...data,
                response: res.data.response,
                type: res.data.type,
            })
        }).catch(err => console.log(err))
    };

    if (contextData.siteIdentity.anyoneCanRegister) {
        return (
            <StyledDiv className='Register authPage main'>
                <form className='authForm' onSubmit={e => onSubmitHandler(e)}>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>email</p>
                        <input name='email' type='email' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>repeat password</p>
                        <input name='password2' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <button type='submit' className='submitBtn'>Register</button>
                </form>
            </StyledDiv>

        );

    } else {
        return (
            <div className='Register authPage'/>
        )
    }
};

export const getServerSideProps = async ({req}) => {
    const firstLoadData = await getFirstLoadData(req, [])
    return {props: {widgets: firstLoadData.widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer}}
}


export default withRouter(Register);