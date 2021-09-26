import React, {useState, useRef, useContext, useEffect} from 'react';
import withRouter from "next/dist/client/with-router";
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import {registerUser} from "../../_variables/ajaxAuthVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";

const RegisterStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .register-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--navigation-background-color,#18181b);
    height: 400px;
    width: 300px;
    padding: 10px;
  }

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

  .register-form-field {
    width: 90%;
  }

  .register-form-field > p {
    color: var(--main-text-color);
    width: 100%;
  }

  .register-form-field > input {
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 3px 5px;

    height: 30px;
    width: 100%;
  }

  .register-form-buttons {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .register-form-button {
    border: var(--main-text-color) solid 1px;
    padding: 10px 20px;
    width: 100px;
    margin: 30px 0;

  }

  .server-response {
    color: ${props => props.response.type === 'success' ? 'green' : props.response.type === 'error' ? 'red' : 'var(--main-text-color)'};
  }
`
const Register = props => {
    const contextData = useContext(AppContext);

    const router = useRouter()
    const [state, setState] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        password2: undefined
    });

    const [response, setResponse] = useState({
        message: null,
        type: null,
    });


    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };
    const onSubmitHandler = e => {

        e.preventDefault()
        if (state.username && state.email && (state.password === state.password2)) {
            registerUser(state).then(res => {
                setResponse({
                    ...response,
                    message: res.data.message,
                    type: 'success',
                })

            }).catch(err => {
                setResponse({
                    ...response,
                    message: err.response.data.message,
                    type: 'error',
                })
                console.log(err.response)
            })
        }


    };

    if (contextData.siteIdentity.anyoneCanRegister) {
        return (
            <RegisterStyledDiv className='register-page authPage main' response={response}>

                <p className='server-response'> {response.message}</p>
                <form className='register-form' onSubmit={e => onSubmitHandler(e)}>

                    <div className="register-form-field">
                        <p>username</p>
                        <input name='username' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="register-form-field">
                        <p>email</p>
                        <input name='email' type='email' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="register-form-field">
                        <p>password</p>
                        <input name='password' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="register-form-field">
                        <p>repeat password</p>
                        <input name='password2' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className='register-form-buttons'>
                        <button onClick={() => router.push('/login')} className='register-form-button simple-button'>Login</button>
                        <button type='submit' className='register-form-button simple-button'>Register</button>
                    </div>

                </form>

            </RegisterStyledDiv>

        );

    } else {
        return (
            <div className='Register authPage'/>
        )
    }
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['register'])
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            ...firstLoadData,
        }
    }
}


export default withRouter(Register);