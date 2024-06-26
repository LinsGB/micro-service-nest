# micro-service-node

<img src="_doc/arq.jpeg" alt="ARQ">

> No projeto foi utilizado NestJs tanto para o BFF como para os Microservissos, RabbitMq para mensageria e eventos, Swagger para documentação, Postgres para o DB, Prisma como o ORM. 
Para solucionar o caso de muitas requisições para os microsservissos, onde é necessário garantir que o valor alvo não é alterado no meio do processo, foi utilizado a estratégia de lock optimista.

### O que eu fiz e o que pretendia fazer se tivesse mais tempo

O projeto foi feito no tempo que eu tive disponível:

- [x] Criar um BFF que será a api que o front se comunicara e tera como responsabilidade chamar todos microsserviços.
    - [ ] Adicionar validação prévia dos dados que serão enviados para os microsserviços
- [x] Criar um micro serviço para geração de extrato
    - [ ] Possibilitar o retorno de um buffer de um PDF
- [x] Criar um micro serviço para criação de saldo e transações
- [x] Conectar BFF e microsserviços utilizando eventos e mensageria a partir do Rabbit MQ
- [x] Dockerizar a aplicação 
- [ ] Criar testes de integração 

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou o `<docker | pnpm>`
- O projeto foi desenvolvido em uma máquina Linux então o melhor é que seja usado no `<Linux>`.

## 🚀 Instalando e Executando micro-service-node

Para instalar o micro-service-node, siga estas etapas:

Linux

```
DOCKER_BUILDKIT=1 docker compose up -d --build
```

## ☕ Usando micro-service-node

Para usar micro-service-node, siga estas etapas:

### Rodar migrations:
Para executar as migrations existem 2 opções, uma é rodando a query dentro do PGadmin e outra é utilizando o ORM prisma. Vou mostrar ambas abaixo.

#### PG Admin:
```
acesse o pgadmin: http://localhost:5050

logue com as credênciais:
    login: admin@admin.com
    senha: pgadmin4

copie a query do arquivo migration.sql na raiz do projeto e execute dentro do PG Admin.
```

#### Prisma:
```
Abra o arquivo de schema do saldo: saldo/prisma/schema.prisma

Altere o 'datasource db' para o valor abaixo:
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:postgres@localhost:5432/postgres"
}

Entre na pasta do saldo e baixe as dependências: $pnpm i

Baixe o cliente do prisma: $pnpm i @prisma/client

Atualize o prisma: $npx prisma generate --schema=./prisma/schema.prisma

Execute as migrations: $npx prisma migrate dev --name init

Altere o 'datasource db' novamente para o valor anterior:
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:postgres@db:5432/postgres"
}
```
Em algumas situações acontece conflito quando existe a pasta node_modules, então recomendo deletar ela quando for usar o Docker.

### Rodar containers:

```
DOCKER_BUILDKIT=1 docker compose up -d
```

### Acessar Swagger:
```
acesse a url http://localhost:3000/api
```

### Acessar PG Admin:
```
acesse a url http://localhost:5050
    login: admin@admin.com
    senha: pgadmin4
```
### Acessar RabbitMQ Management:
```
acesse a url http://localhost:15672
    login: guest
    senha: guest
```

## 📫 Comandos que podem ser úteis e informações Extras

No projeto o saldo faz o papel de uma carteira, então antes de tentar fazer transações é necessário criar um saldo.

As mensagens de retorno dos eventos indicam que o evento foi disparado não que o fluxo foi executado com sucesso.

Para parar aplicação que esteja rodando em alguma porta mesmo depois de parar o container:
```
#fuser -k <porta>/tcp 
```
