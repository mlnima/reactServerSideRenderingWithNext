import React, { FC } from 'react';
import './FormWidgetField.scss';
import { convertVariableNameToName } from '@repo/utils/dist/src';

interface IProps {
  field: {
    required?: boolean;
    fieldPlaceHolder?: string;
    fieldName?: string;
    fieldType?: string;
  };
  dictionary: {
    [key: string]: string;
  };
  onFormFieldsChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  state: {
    data: {
      [key: string]: string | number;
    };
  };
}

const FormWidgetField: FC<IProps> = ({ field, dictionary, onFormFieldsChangeHandler, state }) => {
  const fieldPlaceholder = field.fieldPlaceHolder ? dictionary?.[field.fieldPlaceHolder] || field.fieldPlaceHolder || '' : '';

  return (
    <div className="formWidgetField">
      <p className="formWidgetFieldTitle">{field.fieldName && convertVariableNameToName(field.fieldName)}</p>
      {field.fieldType === 'textarea' ? (
        <textarea
          className={'primaryInput'}
          required={field.required ? Boolean(field.required) : false}
          placeholder={fieldPlaceholder}
          value={field.fieldName && state?.data?.[field.fieldName] ? state?.data?.[field.fieldName] : ''}
          name={field.fieldName}
          onChange={(e) => onFormFieldsChangeHandler(e)}
        />
      ) : (
        <input
          className={'primaryInput'}
          required={field.required ? Boolean(field.required) : false}
          placeholder={fieldPlaceholder}
          value={field.fieldName && state?.data?.[field.fieldName] ? state?.data?.[field.fieldName] : ''}
          name={field.fieldName}
          onChange={(e) => onFormFieldsChangeHandler(e)}
          type={field.fieldType || 'text'}
        />
      )}
    </div>
  );
};
export default FormWidgetField;
