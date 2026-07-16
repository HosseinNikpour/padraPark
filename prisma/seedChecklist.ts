import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    //-----------------------------------
    // Groups
    //-----------------------------------

    // await prisma.checklistGroup.createMany({

    //     data: [

    //         {
    //             id: 1,
    //             title: "عمومی",
    //             sortOrder: 1,
    //         },

    //         {
    //             id: 2,
    //             title: "گرید",
    //             sortOrder: 2,
    //         },

    //         {
    //             id: 3,
    //             title: "لیزر تگ",
    //             sortOrder: 3,
    //         },

    //         {
    //             id: 4,
    //             title: "گردونه",
    //             sortOrder: 4,
    //         },

    //         {
    //             id: 5,
    //             title: "لیزرمیز",
    //             sortOrder: 5,
    //         },

    //         {
    //             id: 6,
    //             title: "آرنا",
    //             sortOrder: 6,
    //         },
             

    //     ],

    //   //  skipDuplicates: true,

    // });

    //-----------------------------------
    // Questions
    //-----------------------------------

    await prisma.checklistQuestion.createMany({

        data: [

            {
                title: "بررسی عملکرد درب های ورودی",
                description: "عملکرد صحیح باز و بسته شدن درب ها بررسی شود.",
                type: "START",
                groupId:2,
                sortOrder: 1,
            },

            {
                title: "تمیز بودن درب های ورودی",
                description: "شیشه، دستگیره و چهارچوب تمیز باشد.",
                type: "START",
                groupId: 2,
                sortOrder: 2,
            },

            {
                title: "تمیز بودن اتاق کنترل",
                description: "وسایل اضافی داخل اتاق کنترل وجود نداشته باشد.",
                type: "START",
                groupId: 2,
                sortOrder: 3,
            },

            {
                title: "تمیز و سالم بودن کمدها",
                description: "سلامت قفل و تمیزی کمدها بررسی شود.",
                type: "START",
                groupId: 2,
                sortOrder: 4,
            },

            {
                title: "سلامت پنل های نوری",
                description: "تمام پنل ها روشن و سالم باشند.",
                type: "START",
                groupId: 2,
                sortOrder: 5,
            },

            {
                title: "تمیزی پنل ها",
                description: "روی پنل ها گرد و غبار یا اثر انگشت نباشد.",
                type: "START",
                groupId: 2,
                sortOrder: 6,
            },

            {
                title: "سلامت نمایشگر و LCD",
                description: "نمایشگرها بدون خطا و سالم باشند.",
                type: "START",
                groupId: 2,
                sortOrder: 7,
            },

            {
                title: "عدم وجود گرد و غبار و اثر انگشت",
                description: "تمام تجهیزات تمیز باشند.",
                type: "START",
                groupId: 2,
                sortOrder: 8,
            },

            {
                title: "عملکرد صحیح سیستم صوتی",
                description: "صدای سیستم مناسب و بدون نویز باشد.",
                type: "START",
                groupId: 2,
                sortOrder: 9,
            },

            {
                title: "بررسی VRF",
                description: "سیستم سرمایش و گرمایش بررسی شود.",
                type: "START",
                groupId: 2,
                sortOrder: 10,
            },

            {
                title: "بررسی تهویه ها",
                description: "تمام تهویه ها در حال کار باشند.",
                type: "START",
                groupId: 2,
                sortOrder: 11,
            },

            {
                title: "سلامت دیوارها",
                description: "دیوارها شکستگی یا آسیب نداشته باشند.",
                type: "START",
                groupId: 2,
                sortOrder: 12,
            },

            {
                title: "بررسی سطح زمین",
                description: "کف سالن تمیز و بدون خطر باشد.",
                type: "START",
                groupId: 2,
                sortOrder: 13,
            },

        ],

       // skipDuplicates: true,

    });

}

main()
    .then(() => console.log("Checklist Seeded"))
    .finally(async () => {

        await prisma.$disconnect();

    });