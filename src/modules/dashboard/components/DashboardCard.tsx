import Link from "next/link";
import { ReactNode } from "react";

interface DashboardCardProps {

    title: string;

    value: ReactNode;

    description?: ReactNode;

    icon?: ReactNode;

    href?: string;

    footer?: ReactNode;

}

export function DashboardCard({

    title,

    value,

    description,

    icon,

    href,

    footer,

}: DashboardCardProps) {

    const card = (

        <div className="rounded-xl border bg-white p-6 transition-all hover:shadow-md">

            <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">

                    {title}

                </h3>

                {icon}

            </div>

            <div className="mt-5">

                <div className="text-2xl font-bold">

                    {value}

                </div>

                {

                    description && (

                        <div className="mt-2 text-sm text-gray-500">

                            {description}

                        </div>

                    )

                }

            </div>

            {

                footer && (

                    <div className="mt-5 border-t pt-4">

                        {footer}

                    </div>

                )

            }

        </div>

    );

    if (!href) {

        return card;

    }

    return (

        <Link

            href={href}

            className="block"

        >

            {card}

        </Link>

    );

}