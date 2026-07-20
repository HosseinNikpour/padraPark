import { z } from "zod";

export const ChecklistAnswerSchema = z.object({

    questionId: z.number(),

    checked: z.boolean(),

    description: z.string().optional(),

});

export const SaveChecklistSchema = z.object({

    groupId: z.number(),

    type: z.enum([

        "START",

        "END",

    ]),

    description: z.string().optional(),

    attachment: z.string().optional(),

    answers: z.array(

        ChecklistAnswerSchema

    ),

});

export type SaveChecklistForm = z.infer<
    typeof SaveChecklistSchema
>;