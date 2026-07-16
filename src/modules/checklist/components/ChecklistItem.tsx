"use client";

import { useState } from "react";

import { Card } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

interface Props {

    id: number;

    title: string;

    description: string | null;

    value: boolean;

    note: string;

    onCheckedChange: (checked: boolean) => void;

    onNoteChange: (value: string) => void;

}

export default function ChecklistItem({

    title,

    description,

    value,

    note,

    onCheckedChange,

    onNoteChange,

}: Props) {

    return (

        <Card className="p-5 space-y-4">

            <div className="flex items-start gap-4">

                <Checkbox

                    checked={value}

                    onCheckedChange={(v) => onCheckedChange(Boolean(v))}

                />

                <div className="flex-1">

                    <Label className="text-base font-semibold">

                        {title}

                    </Label>

                    {

                        description &&

                        <p className="mt-2 text-sm text-muted-foreground">

                            {description}

                        </p>

                    }

                </div>

            </div>

            {!value && (
                <>
                    <Textarea
                        placeholder="علت عدم تایید را وارد کنید..."
                        value={note}
                        onChange={(e) => onNoteChange(e.target.value)}
                    />

                    {note.trim() === "" && (
                        <p className="mt-2 text-sm text-red-500">
                            وارد کردن توضیحات الزامی است.
                        </p>
                    )}
                </>
            )}

        </Card>

    );

}