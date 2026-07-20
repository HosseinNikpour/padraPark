"use client";

import { useRouter } from "next/navigation";

import { saveChecklist } from "../actions";

import { SaveChecklistForm } from "../validation/saveChecklistSchema";

export function useChecklist() {

    const router = useRouter();

    async function submit(

        values: SaveChecklistForm

    ) {

        await saveChecklist(values);

        router.refresh();

        router.push("/");

    }

    return {

        submit,

    };

}