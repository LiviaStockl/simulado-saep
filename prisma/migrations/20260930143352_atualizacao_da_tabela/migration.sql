-- CreateTable
CREATE TABLE "Eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "palestranteId" INTEGER NOT NULL,
    CONSTRAINT "Eventos_palestranteId_fkey" FOREIGN KEY ("palestranteId") REFERENCES "Palestrante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Palestrante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Palestrante_email_key" ON "Palestrante"("email");
