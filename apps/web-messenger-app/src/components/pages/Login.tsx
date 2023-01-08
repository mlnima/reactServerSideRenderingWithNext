import React, {FC, FormEvent, useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "@store/hooks";
import {loginUserAction} from "@store/reducers/usersReducer";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;

  height: 100vh;
  width: 100vw;

  .loginForm {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 5px;
  }
`;

interface PropTypes {
}

const Login: FC<PropTypes> = ({}) => {

    const dispatch = useAppDispatch()

    const [state, setState] = useState({
        username: '',
        password: '',
    })

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onLoginHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(loginUserAction({
            username: state.username,
            password: state.password
        }))
    }

    return (
        <Style>
            <form onSubmit={e => onLoginHandler(e)} className={'loginForm'}>
                <input className={'form-control-input'} value={state.username} type="text" name={'username'}
                       placeholder={'username'}
                       onChange={(e) => onChangeHandler(e)}/>
                <input className={'form-control-input'} value={state.password} type="password" name={'password'}
                       placeholder={'password'}
                       onChange={(e) => onChangeHandler(e)}/>
                <button type={'submit'} className={'btn btn-primary'} onClick={onLoginHandler}>Login</button>
            </form>
        </Style>
    )
};
export default Login;