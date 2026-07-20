"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {

    SaveChecklistSchema,

    SaveChecklistForm,

} from "../validation/saveChecklistSchema";

import { ChecklistType } from "@prisma/client";

export function useChecklistForm(

    groupId: number,

    type: ChecklistType,

    questionIds: number[]

) {

    return useForm<SaveChecklistForm>({

        resolver: zodResolver(SaveChecklistSchema),

        mode: "onChange",

        defaultValues: {

            groupId,

            type,

            description: "",

            attachment: "",

            answers: questionIds.map(id => ({

                questionId: id,

                checked: false,

                description: "",

            })),

        },

    });

}