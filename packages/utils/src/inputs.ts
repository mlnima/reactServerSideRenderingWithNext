
import { isNumericString } from './strings';

export const inputValueSimplifier = (event: any): string | number | boolean => {
  const target = event.target as HTMLInputElement;

  if (!target) {
    throw new Error('Event target is not an HTMLInputElement');
  }

  let value: string | boolean;

  if (target.type === 'checkbox') {
    value = target.checked;
  } else {
    if (target.value === 'true') {
      value = true;
    } else if (target.value === 'false') {
      value = false;
    } else {
      value = target.value;
    }
  }

  const stringValue = typeof value === 'string' ? value : String(value);

  return isNumericString(stringValue) ? parseInt(stringValue, 10) : value;
};

