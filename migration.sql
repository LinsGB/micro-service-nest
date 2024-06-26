-- CreateTable
CREATE TABLE "Saldo" (
    "id" SERIAL NOT NULL,
    "valor" TEXT NOT NULL,
    "vercao" INTEGER NOT NULL,

    CONSTRAINT "Saldo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacoes" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "saldoId" INTEGER,

    CONSTRAINT "Transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saldo_vercao_key" ON "Saldo"("vercao");

-- AddForeignKey
ALTER TABLE "Transacoes" ADD CONSTRAINT "Transacoes_saldoId_fkey" FOREIGN KEY ("saldoId") REFERENCES "Saldo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
