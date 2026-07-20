"use client";

import {

    FieldValues,

    Path,

    useFormContext,

} from "react-hook-form";

import { Input } from "@/shared/ui/input";

interface Props<T extends FieldValues> {

    name: Path<T>;

    label: string;

    placeholder?: string;

    type?: string;

}

export default function FormInput<T extends FieldValues>({

    name,

    label,

    placeholder,

    type = "text",

}: Props<T>) {

    const {

        register,

        formState: {

            errors,

        },

    } = useFormContext<T>();

    return (

        <div className="space-y-2">

            <label className="text-sm font-medium">

                {label}

            </label>

            <Input

                type={type}

                placeholder={placeholder}

                {...register(name)}

            />

            {

                errors[name] && (

                    <p className="text-red-500 text-xs">

                        {String(errors[name]?.message)}

                    </p>

                )

            }

        </div>

    );

}