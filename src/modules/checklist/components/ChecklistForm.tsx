"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChecklistType, Prisma } from "@prisma/client";

import ChecklistItem from "./ChecklistItem";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Textarea } from "@/shared/ui/textarea";
import { Input } from "@/shared/ui/input";

import { saveChecklist } from "../actions";

type Question = Prisma.ChecklistQuestionGetPayload<{}>;

interface Props {
    type: ChecklistType;
    groupId: number;
    questions: Question[];
}

export default function ChecklistForm({
    type,
    groupId,
    questions,
}: Props) {

    const router = useRouter();

    const [description, setDescription] = useState("");

    const [answers, setAnswers] = useState(
        questions.map((q) => ({
            questionId: q.id,
            checked: false,
            note: "",
        }))
    );

    async function handleSubmit() {

        const invalid = answers.find(
            (a) => !a.checked && a.note.trim() === ""
        );

        if (invalid) {
            alert("برای گزینه‌هایی که تیک نخورده‌اند توضیح وارد کنید.");
            return;
        }

        await saveChecklist({
            groupId,
            type,
            description,
            answers: answers.map((a) => ({
                questionId: a.questionId,
                checked: a.checked,
                description: a.note,
            })),
        });

        alert("چک لیست ثبت شد.");

        router.refresh();

        router.push("/");
    }

    return (
        <div className="space-y-6">

            {questions.map((q, index) => (

                <ChecklistItem
                    key={q.id}
                    id={q.id}
                    title={q.title}
                    description={q.description}
                    value={answers[index].checked}
                    note={answers[index].note}
                    onCheckedChange={(checked) => {

                        const copy = [...answers];

                        copy[index].checked = checked;

                        setAnswers(copy);

                    }}
                    onNoteChange={(note) => {

                        const copy = [...answers];

                        copy[index].note = note;

                        setAnswers(copy);

                    }}
                />

            ))}

            <Card className="p-6 space-y-5">

                <Textarea
                    placeholder="توضیحات کلی"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input type="file" />

                <Button
                    onClick={handleSubmit}
                    className="w-full"
                >
                    ثبت چک لیست
                </Button>

            </Card>

        </div>
    );
}