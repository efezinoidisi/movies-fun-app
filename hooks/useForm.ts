import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm as useDefaultForm,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function useCustomForm<T extends FieldValues>(
  schema: AnyObjectSchema,
  defaultValues: DefaultValues<T>
): UseFormReturn<T> {
  const form = useDefaultForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  return form;
}
