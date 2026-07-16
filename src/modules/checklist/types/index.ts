export type ChecklistType = "START" | "END";

export interface ChecklistQuestionDto {

    id:number;

    title:string;

    description:string | null;

    type:ChecklistType;

    sortOrder:number;

}

export interface ChecklistAnswerDto{

    questionId:number;

    checked:boolean;

    description?:string;

}

export interface SaveChecklistDto{

    type:ChecklistType;

    description?:string;

    attachment?:string;

    answers:ChecklistAnswerDto[];

}