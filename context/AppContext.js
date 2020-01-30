import React, { useEffect, useRef, useState } from 'react';
import jwtDecode from "jwt-decode";
import jwt from 'jsonwebtoken';
import axios from "axios";

export const AppContext = React.createContext();

const AppProvider = props => {

    const [ state, setState ] = useState({

    });

    const [ userData, setUserData ] = useState({
         username:'Guest'
    });

    return (
        <div>
            <AppContext.Provider
                value={ {
                    state,
                    setState,
                    userData,
                    setUserData
                } }>

                { props.children }
            </AppContext.Provider>
        </div>
    )
}

export const AppProviderWithRouter = AppProvider;