/*
  Warnings:

  - You are about to drop the column `nome` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `idColaborador` on the `estabelecimento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataEmissao` to the `colaborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `colaborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "estabelecimento" DROP CONSTRAINT "estabelecimento_idColaborador_fkey";

-- AlterTable
ALTER TABLE "colaborador" DROP COLUMN "nome",
ADD COLUMN     "dataEmissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "idUser" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "estabelecimento" DROP COLUMN "idColaborador";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "agendamentos" (
    "idAgendamento" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idHorario" INTEGER NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("idAgendamento")
);

-- CreateTable
CREATE TABLE "horariosDisponiveis" (
    "idHorario" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "ocupado" BOOLEAN NOT NULL,
    "minutosDuracao" INTEGER NOT NULL,
    "idEstabelecimento" INTEGER NOT NULL,
    "idColaborador" INTEGER NOT NULL,

    CONSTRAINT "horariosDisponiveis_pkey" PRIMARY KEY ("idHorario")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_idHorario_fkey" FOREIGN KEY ("idHorario") REFERENCES "horariosDisponiveis"("idHorario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horariosDisponiveis" ADD CONSTRAINT "horariosDisponiveis_idEstabelecimento_fkey" FOREIGN KEY ("idEstabelecimento") REFERENCES "estabelecimento"("idEstabelecimento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horariosDisponiveis" ADD CONSTRAINT "horariosDisponiveis_idColaborador_fkey" FOREIGN KEY ("idColaborador") REFERENCES "colaborador"("idColaborador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador" ADD CONSTRAINT "colaborador_idEstabelecimento_fkey" FOREIGN KEY ("idEstabelecimento") REFERENCES "estabelecimento"("idEstabelecimento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador" ADD CONSTRAINT "colaborador_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
