'use client';

import React, { useEffect } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { DashboardStore } from "@repo/typescript-types";
import { getFormAction } from "@storeDashboard/reducers/formsReducer";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@storeDashboard/hooks";
import { dashboardAPIRequestDeleteForm } from "@repo/api-requests";

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
`;

const Form = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>()
  const router = useRouter();

  const formData = useSelector(({ forms }: DashboardStore) => forms.form);

  useEffect(() => {
    if (params.id){
      dispatch(getFormAction(params.id));
    }

  }, [searchParams]);

  const onDeleteHandler = async () => {
    if (params.id) {
      await dashboardAPIRequestDeleteForm(params.id).then(() => {
        router.push(`/dashboard/assets?assetsType=forms&size=20&lastUpdate=${Date.now()}`, { scroll: false });
      });
    }
  };

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
          );
        })}
      </div>
      <button className={'btn btn-danger'} onClick={onDeleteHandler}>Delete</button>
    </StyledDiv>
  );
};

export default Form;