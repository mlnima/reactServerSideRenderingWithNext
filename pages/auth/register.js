import React, {useState, useRef, useContext,useEffect} from 'react';
import withRouter from "next/dist/client/with-router";
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import {registerUser} from "../../_variables/ajaxAuthVariables";
import Link from "next/link";

const Register = props => {
    const contextData = useContext(AppContext);

    const router = useRouter()
    // const [state, setState] = useState({
    //     username: undefined,
    //     email: undefined,
    //     password: undefined,
    //     password2: undefined
    // });

    const [state, setState] = useState({
        username: 'test2',
        email: 'test2@test2.test2',
        password: 'test2',
        password2: 'test2'
    });
    const [response, setResponse] = useState({
        message: null,
        type: null,
    });

    useEffect(() => {
        console.log(router.pathname)
    }, [props]);

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };
    const onSubmitHandler = e => {
        e.preventDefault()

        registerUser(state).then(res => {
            setResponse({
                ...response,
                message: res.data.message,
                type: 'success',
            })
            console.log(res.data)
        }).catch(err => {
            setResponse({
                ...response,
                message: err.response.data.message,
                type: 'error',
            })
            console.log(err.response)
        })

    };

    if (contextData.siteIdentity.anyoneCanRegister) {
        return (
            <div className='register-page authPage main'>
                <style jsx>{`
                    .register-page{
                        display: flex;
                        justify-content: center;
                        align-items: center; 
                        flex-direction: column;
                        height: 100%;
                        width: 100%;
                    }
                    .register-form{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        background-color: var(--navigation-background-color);
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
                    .register-form-field{
                    width: 90%;
                    }
                    .register-form-field>p{
                        color: var(--main-text-color);
                        width: 100%;
                    }
                    .register-form-field>input{
                        border-radius: 5px;
                        outline: none;
                        border: none;
                        padding: 3px 5px;
                        
                        height: 30px;
                        width: 100%;
                    }
                    
                    .register-form-buttons{
                     display: flex;
                     justify-content: space-evenly;
                     width: 100%;
                    }
                    
                    .register-form-button{
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
                        <button onClick={()=>router.push('/login')} className='register-form-button simple-button'>Login</button>
                        <button type='submit' className='register-form-button simple-button'>Register</button>
                    </div>

                </form>

            </div>

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