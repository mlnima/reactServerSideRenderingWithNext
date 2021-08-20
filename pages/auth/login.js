import React, {useState, useContext} from 'react';
import withRouter from 'next/dist/client/with-router'
import {AppContext} from "../../context/AppContext";
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {login} from "../../_variables/ajaxAuthVariables";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const Login = () => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({});
    const [response, setResponse] = useState({
        message: undefined,
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
            localStorage.setItem('wt',res.data.token)
            setResponse({
                ...response,
                message: res.data.message,
                type: 'success',
            })
        }).then(()=>{
            contextData.functions.getAndSetUserInfo().then(() => {
                router.back()
            })
        }).catch(err=>{
            setResponse({
                ...response,
                message: err.response.data.message,
                type: 'error',
            })
        })
    };


    return (

            <div className='login-page authPage main'>
            <style jsx>{`
                .login-page{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .login-form{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    background-color: var(--navigation-background-color);
                    padding: 10px;
                    width: 300px;
                    height: 300px;
                }
                .login-form-field{
                 width: 90%;
                }
                .login-form-field >p{
                    color: var(--main-text-color);
                    width: 100%;
                }
                .login-form-field >input{
                    border-radius: 5px;
                    outline: none;
                    border: none;
                    padding: 3px 5px;
                    width: 100%;
                    height: 30px;
                    
                }
                
                .submit-button{
                    border: var(--main-text-color) solid 1px;
                    padding: 10px 20px;
                    width: 100px;
                    margin: 30px 0;
                }
                .server-response {
                    color:  ${response.type === 'success' ? 'green' : response.type === 'error' ? 'red' : 'var(--main-text-color)' }                    ;
                }
            
            `}</style>
                <p className='server-response'> {response.message}</p>
                <form className='login-form' onSubmit={e => onSubmitHandler(e)}>

                    <div className="login-form-field">
                        <p>username</p>
                        <input name='username' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="login-form-field">
                        <p>password</p>
                        <input name='password' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <button className='submit-button simple-button' type='submit'>Login</button>
                </form>
            </div>

    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req,[])
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            widgets : firstLoadData?.widgets || [],
            ...firstLoadData?.settings,
            isMobile: firstLoadData?.isMobile ? Boolean(firstLoadData.isMobile) :false,
            referer: firstLoadData?.referer ? firstLoadData?.referer :false,
            requestProtocol: context.req.protocol
        }}
}


export default withRouter(Login);