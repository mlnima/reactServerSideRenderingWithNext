'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@store/hooks';
import './styles.scss';
import dashboardGetForm from '@lib/actions/database/forms/dashboardGetForm';
import { setAlert } from '@store/reducers/globalStateReducer';
import { IForm } from '@repo/typescript-types';
import dashboardDeleteForm from '@lib/actions/database/forms/dashboardDeleteForm';

const Form = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [formData, setFormData] = useState<IForm | null>(null);

  const getForm = async (_id: string) => {
    const { data, error, message, success } = await dashboardGetForm({ _id });
    if (!success || !data) {
      dispatch(
        setAlert({
          message,
          type: 'Error',
          err: error,
        }),
      );
      return;
    }
    setFormData(data.form);
  };

  useEffect(() => {
    const _id = params.id;
    if (_id) {
      getForm(_id);
    }
  }, [searchParams]);

  const onDeleteHandler = async () => {
    if (params.id) {
      const {success} = await dashboardDeleteForm({ _id })
      if (success) {
        router.push(`/admin/assets?assetsType=forms&size=20&lastUpdate=${performance.now()}`)
      }
    }
  };


  useEffect(() => {
    console.log(`formData=> `, formData);
  }, [formData]);
  return (
    <div className={'viewFormDataPage'}>
      <h1>{formData?.formName}</h1>
      <span>{formData?.date}</span>
      <div className="form-data-container">
        {(formData?.data ? Object.keys(formData?.data) : []).map(fieldData => {
          return (
            <div key={fieldData} className="form-field-data">
              <h3>{fieldData} :</h3>
              <p>{formData?.data?.[fieldData]}</p>
            </div>
          );
        })}
      </div>
      <button className={'btn btn-danger'} onClick={onDeleteHandler}>Delete</button>
    </div>
  );
};

export default Form;