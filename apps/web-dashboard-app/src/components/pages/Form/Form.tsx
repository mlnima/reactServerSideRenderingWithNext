import React, {useEffect} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import { getFormAction} from "@store/reducers/formsReducer";
import {redirect, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch} from "@store/hooks";
import {dashboardAPIRequestDeleteForm} from "api-requests";

let StyledDiv = styled.div`
  .form-data-container {
    border-radius: 5px;
    padding: 5px;
    background-color: #333;
    margin: 30px 0;

    .form-field-data {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: white;
      padding: 5px;

      h3 {
        margin-right: 20px;
      }
    }
  }
`

const Form = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    const {id} = useParams()
    const formData = useSelector(({forms}: DashboardStore) => forms.form)

    useEffect(() => {
        dispatch(getFormAction(id))
    }, [search]);

    const onDeleteHandler = async () => {
        if(id){
            await dashboardAPIRequestDeleteForm(id).then(()=>{
                navigate(`/dashboard/assets?assetsType=forms&size=20&lastUpdate=${Date.now()}`)
            })
        }

    }

    return (
        <StyledDiv>
            <h1>{formData?.formName}</h1>
            <span>{formData?.date}</span>
            <div className='form-data-container'>
                {(formData?.data ? Object.keys(formData?.data) : []).map(fieldData => {
                    return (
                        <div key={fieldData} className='form-field-data'>
                            <h3>{fieldData} :</h3>
                            <p>{formData?.data?.[fieldData]}</p>
                        </div>
                    )
                })}
            </div>
            <button className={'btn btn-danger'} onClick={onDeleteHandler}>Delete</button>
        </StyledDiv>
    );
};

export default Form;
