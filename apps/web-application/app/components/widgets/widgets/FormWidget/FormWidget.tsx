'use client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@store/hooks';
import './FormWidget.scss';
import FormWidgetField from '@components/widgets/widgets/FormWidget/FormWidgetField/FormWidgetField';
import { loading, setAlert } from '@store/reducers/globalStateReducer';
import saveFormWidgetData from '@lib/actions/database/operations/widgets/saveFormWidgetData';
import { useAppSelector } from '@storeDashboard/hooks';

interface FormWidgetPropTypes {
  locale: string;
  dictionary: {
    [key: string]: string;
  };
  widgetId: string;
  uniqueData: {
    formName: string;
    formTitle: string;
    afterSubmitMessage: string;
    submitButtonText: string;
    formFields: {
      required: boolean;
      fieldType: string;
      fieldIndex: number;
      fieldPlaceHolder: string;
      fieldName: string;
    }[];
  };
}

const FormWidget: FC<FormWidgetPropTypes> = (
  {
    widgetId,
    uniqueData,
    locale,
    dictionary,
  }) => {
  const dispatch = useAppDispatch();
  const { _id: userId, username, role } = useAppSelector(({ user }) => user?.userData || {});

  const [state, setState] = useState(() => {
    return {
      language: '',
      widgetId: '',
      formName: '',
      data: {},
    };
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      language: locale,
      widgetId: widgetId,
      formName: uniqueData.formName,
      data: {
        ...prevState.data,
        userId,
        username,
        role,
      },
    }));
  }, [userId, username, role]);

  const [isSubmit, setIsSubmit] = useState(false);

  const onFormFieldsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState(prevState => ({
      ...prevState,
      data: {
        ...prevState?.data,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loading(true));
    try {
      const formData = {
        ...state,
        date: performance.timeOrigin + performance.now(),
      };
      await saveFormWidgetData({ data: formData });
      setIsSubmit(true);
    } catch {
      dispatch(
        setAlert({
          message: 'Something went wrong, please try again later.',
          type: 'error',
        }),
      );
    } finally {
      dispatch(loading(false));
    }
  };

  const formFieldsToRender = useMemo(() => {
    return [...(uniqueData?.formFields || [])]?.sort((a, b) =>
      a?.fieldIndex > b?.fieldIndex ? 1 : -1,
    );
  }, []);

  return (
    <div className="formWidget">
      {isSubmit ? (
        <div className={'formSubmitted'}>
          <h3 className="afterSubmitMessage">
            {dictionary?.[
            uniqueData?.afterSubmitMessage ||
            'Your Form Has Been Submitted'
              ] || 'Your Form Has Been Submitted'}
          </h3>
        </div>

      ) : (
        <form
          onSubmit={e => onSubmitHandler(e)}
          className="formWidgetDynamicForm"
        >
          <h2>
            {dictionary?.[uniqueData?.formTitle] ||
              uniqueData?.formTitle}
          </h2>
          {formFieldsToRender.map(field => {
            return (
              <FormWidgetField
                key={field.fieldName}
                onFormFieldsChangeHandler={
                  onFormFieldsChangeHandler
                }
                field={field}
                state={state}
                dictionary={dictionary}
              />
            );
          })}
          <button
            type="submit"
            className="btn btn-primary submitButton"
          >
            {uniqueData?.submitButtonText || 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};
export default FormWidget;
