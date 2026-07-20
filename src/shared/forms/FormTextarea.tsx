"use client";

import {

    FieldValues,

    Path,

    useFormContext,

} from "react-hook-form";

import { Textarea } from "@/shared/ui/textarea";

interface Props<T extends FieldValues> {

    name: Path<T>;

    label: string;

    placeholder?: string;

}

export default function FormTextarea<T extends FieldValues>({

    name,

    label,

    placeholder,

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

            <Textarea

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