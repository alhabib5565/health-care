import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type FormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TPHForm = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & FormConfig;

const PHForm = ({ children, onSubmit, resolver, defaultValues }: TPHForm) => {
  let formConfig: FormConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const method = useForm(formConfig);
  const handleFormSubmit = (data: FieldValues) => {
    onSubmit(data);
  };
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleFormSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
