import { notFound } from "next/navigation";
import { ChecklistType } from "@prisma/client";

import { ChecklistService } from "@/modules/checklist/services/ChecklistService";
import ChecklistForm from "@/modules/checklist/components/ChecklistForm";

interface Props {
    params: Promise<{
        groupId: string;
    }>;
}

const service = new ChecklistService();

export default async function Page({ params }: Props) {

    const { groupId } = await params;

    const id = Number(groupId);

    if (isNaN(id)) {
        notFound();
    }

    const questions = await service.getQuestions(
        ChecklistType.END,
        id
    );

    if (!questions.length) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-2xl font-bold mb-6">
                چک لیست پایان شیفت
            </h1>

            <ChecklistForm
                type={ChecklistType.END}
                groupId={id}
                questions={questions}
            />

        </div>
    );
}