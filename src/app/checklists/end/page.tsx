import ChecklistForm from "@/modules/checklist/components/ChecklistForm";
import { getChecklist } from "@/modules/checklist/actions";

export default async function Page() {

    const questions = await getChecklist("END");

    return (

        <ChecklistForm

            type="END"

            questions={questions}

        />

    );

}