/*
  Warnings:

  - Added the required column `groupId` to the `ChecklistQuestion` table without a default value.
  - Added the required column `groupId` to the `ChecklistResponse` table without a default value.

*/

-- ----------------------------------------------------
-- ChecklistGroup
-- ----------------------------------------------------

CREATE TABLE "ChecklistGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "ChecklistGroup"
("id","title","sortOrder","isActive")
VALUES
(1,'عمومی',1,1),
(2,'گرید',2,1),
(3,'لیزر تگ',3,1),
(4,'گردونه',4,1),
(5,'لیزرمیز',5,1),
(6,'آرنا',6,1);

PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- ----------------------------------------------------
-- ChecklistQuestion
-- ----------------------------------------------------

CREATE TABLE "new_ChecklistQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChecklistQuestion_groupId_fkey"
        FOREIGN KEY ("groupId")
        REFERENCES "ChecklistGroup" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

INSERT INTO "new_ChecklistQuestion"
(
    id,
    title,
    description,
    type,
    groupId,
    sortOrder,
    isActive,
    createdAt
)
SELECT
    id,
    title,
    description,
    type,
    1,
    sortOrder,
    isActive,
    createdAt
FROM "ChecklistQuestion";

DROP TABLE "ChecklistQuestion";

ALTER TABLE "new_ChecklistQuestion"
RENAME TO "ChecklistQuestion";

-- ----------------------------------------------------
-- ChecklistResponse
-- ----------------------------------------------------

CREATE TABLE "new_ChecklistResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "description" TEXT,
    "attachment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChecklistResponse_userId_fkey"
        FOREIGN KEY ("userId")
        REFERENCES "User" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "ChecklistResponse_groupId_fkey"
        FOREIGN KEY ("groupId")
        REFERENCES "ChecklistGroup" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

INSERT INTO "new_ChecklistResponse"
(
    id,
    userId,
    type,
    groupId,
    description,
    attachment,
    createdAt
)
SELECT
    id,
    userId,
    type,
    1,
    description,
    attachment,
    createdAt
FROM "ChecklistResponse";

DROP TABLE "ChecklistResponse";

ALTER TABLE "new_ChecklistResponse"
RENAME TO "ChecklistResponse";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;