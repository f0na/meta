CREATE TABLE "accounts" (
    "id" BLOB NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL,
    PRIMARY KEY ("id")
);
-- #[toasty::breakpoint]
CREATE TABLE "settings" (
    "id" BLOB NOT NULL,
    "theme" TEXT NOT NULL,
    "sidebar" BOOLEAN NOT NULL,
    "update" BOOLEAN NOT NULL,
    PRIMARY KEY ("id")
);
