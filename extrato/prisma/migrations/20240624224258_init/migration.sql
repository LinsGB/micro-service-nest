-- CreateTable
CREATE TABLE "Saldo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" INTEGER NOT NULL,
    "vercao" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Transacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "saldoId" INTEGER,
    CONSTRAINT "Transacoes_saldoId_fkey" FOREIGN KEY ("saldoId") REFERENCES "Saldo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Saldo_vercao_key" ON "Saldo"("vercao");
