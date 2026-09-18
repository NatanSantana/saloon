-- AlterTable
ALTER TABLE "estabelecimento" ADD COLUMN     "idColaborador" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "colaborador" (
    "idColaborador" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idEstabelecimento" INTEGER NOT NULL,

    CONSTRAINT "colaborador_pkey" PRIMARY KEY ("idColaborador")
);

-- AddForeignKey
ALTER TABLE "estabelecimento" ADD CONSTRAINT "estabelecimento_dono_fkey" FOREIGN KEY ("dono") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estabelecimento" ADD CONSTRAINT "estabelecimento_idColaborador_fkey" FOREIGN KEY ("idColaborador") REFERENCES "colaborador"("idColaborador") ON DELETE RESTRICT ON UPDATE CASCADE;
