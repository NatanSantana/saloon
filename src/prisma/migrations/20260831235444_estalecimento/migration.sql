-- CreateTable
CREATE TABLE "estabelecimento" (
    "idEstabelecimento" SERIAL NOT NULL,
    "dono" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "idEndereco" INTEGER NOT NULL,

    CONSTRAINT "estabelecimento_pkey" PRIMARY KEY ("idEstabelecimento")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "idEndereco" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("idEndereco")
);

-- CreateIndex
CREATE UNIQUE INDEX "estabelecimento_cnpj_key" ON "estabelecimento"("cnpj");

-- AddForeignKey
ALTER TABLE "estabelecimento" ADD CONSTRAINT "estabelecimento_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "enderecos"("idEndereco") ON DELETE RESTRICT ON UPDATE CASCADE;
