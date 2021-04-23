import React, {useState, useContext} from 'react';
import withRouter from 'next/dist/client/with-router'
import {AppContext} from "../../context/AppContext";
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {login} from "../../_variables/ajaxAuthVariables";
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
     color: var(--main-text-color);
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
    .submitBtn{
      background: linear-gradient(#67ae55, #578843);
      box-shadow: inset 0 1px 1px #a4e388;
      border-color: #3b6e22 #3b6e22 #2c5115;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      letter-spacing: 1px;
      position: relative;
      text-shadow: 0 1px 2px rgba(0, 0, 0, .5);
      width: 200px;
      height: 40px;
      min-width: 194px;
      padding: 7px 20px;
      text-align: center;
      line-height: 126%;
      box-sizing: border-box;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`
const Login = () => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({});
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
        e.preventDefault();
        login(state).then(res=>{
            if (res.data?.type === 'success') {
                if (res.data?.token) {
                    localStorage.setItem('wt', res.data.token)
                }
            }
        }).then(()=>{
            contextData.functions.getAndSetUserInfo().then(() => {
                router.back()
            })
        })
    };


    return (

            <StyledDiv className='login authPage main'>
                <form className='authForm' onSubmit={e => onSubmitHandler(e)}>
                    <label className='messageLabel'>{data.response}</label>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <button className='submitBtn' type='submit'>Login</button>
                </form>
            </StyledDiv>

    );
};

export const getServerSideProps = async ({req}) => {
    const firstLoadData = await getFirstLoadData(req,[])
    return {props: {widgets:firstLoadData.widgets,...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile),  referer:firstLoadData.referer}}
}


export default withRouter(Login);