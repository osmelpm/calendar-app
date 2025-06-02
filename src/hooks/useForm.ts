import { useEffect, useMemo, useState } from "react";

export type FormValidations<T> = {
  [K in keyof T]: [(value: T[K]) => boolean, string];
};

type FormCheckedValues<T> = {
  [K in keyof T as `${string & K}Valid`]?: string | null;
};

export const useForm = <T extends object>(
  initialForm: T,
  formValidations?: FormValidations<T>
) => {
  const [formState, setFormSate] = useState(initialForm);
  const [formValidation, setFormValidation] = useState<FormCheckedValues<T>>(
    {}
  );
  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormSate(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormSate({ ...formState, [name]: value });
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.values(formValidation)) {
      if (formValue !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onReset = () => setFormSate(initialForm);

  const createValidators = () => {
    const formCheckedValues: FormCheckedValues<T> = {};

    for (const field in formValidations) {
      const [fn, errorMessage] = formValidations[field];
      if (field) {
        (formCheckedValues as Record<string, string | null>)[`${field}Valid`] =
          fn(formState[field]) ? null : errorMessage;
        setFormValidation(formCheckedValues);
      }
    }
  };

  return {
    onReset,
    formState,
    isFormValid,
    ...formState,
    onInputChange,
    ...formValidation,
  };
};
