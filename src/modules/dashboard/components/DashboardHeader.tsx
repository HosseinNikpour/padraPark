import { ReactNode } from "react";

interface Props {

    title: string;

    subtitle?: string;

    actions?: ReactNode;

}

export function DashboardHeader({

    title,

    subtitle,

    actions,

}: Props) {

    return (

        <div className="mb-8 flex items-start justify-between">

            <div>

                <h1 className="text-3xl font-bold">

                    {title}

                </h1>

                {

                    subtitle && (

                        <p className="mt-2 text-gray-500">

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {actions}

        </div>

    );

}