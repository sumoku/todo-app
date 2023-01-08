import { FieldError } from 'react-hook-form/dist/types';

interface IInputError {
  field: FieldError | undefined;
}

export default function InputError({ field }: IInputError) {
  return <p className={`${field ? 'invalid' : ''}`}>{field?.message}&nbsp;</p>;
}
