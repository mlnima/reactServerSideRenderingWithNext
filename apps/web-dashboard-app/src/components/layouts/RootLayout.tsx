import React from "react";
import styled from "styled-components";
import Topbar from "./Navigation/Topbar";
import Main from "./Main/Main";
import Menu from "./Navigation/Menu";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import {ActiveLoading} from "ui";
import {useAppDispatch} from "@store/hooks";
import {loading} from '@store/reducers/globalStateReducer'

const Style = styled.div`
  grid-area: main-content;
`

const RootLayout = () => {
    const dispatch = useAppDispatch()
    const isLoading = useSelector(({globalState}:DashboardStore)=>globalState.loading)
    return (
        <Style>
            {isLoading && <ActiveLoading onClickEvent={()=>dispatch(loading(false))} color={'var(--main-active-color,#f90)'}/>}
            <Topbar/>
            <Menu/>
            <Main/>
        </Style>
    )
};

export default RootLayout