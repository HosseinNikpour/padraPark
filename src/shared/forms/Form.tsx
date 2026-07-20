"use client";

import { FormProvider, UseFormReturn } from "react-hook-form";

interface Props<T extends object> {

    form: UseFormReturn<T>;

    onSubmit: (values: T) => void | Promise<void>;

    children: React.ReactNode;

    className?: string;

}

export default function Form<T extends object>({

    form,

    onSubmit,

    children,

    className,

}: Props<T>) {

    return (

        <FormProvider {...form}>

            <form

                className={className}

                onSubmit={form.handleSubmit(onSubmit)}

            >

                {children}

            </form>

        </FormProvider>

    );

}