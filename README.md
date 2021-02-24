# nlwapi

![](https://img.shields.io/badge/Made_With-_-grey)
![](https://img.shields.io/badge/_-Typescript-blue)
![](https://img.shields.io/badge/_-Javascript-yellow)
![](https://img.shields.io/badge/_-TypeORM-orange)
![](https://img.shields.io/badge/_-Git-red)
![](https://img.shields.io/badge/_-Github-black)

Curso Rocketseat

<img src="https://cdn.discordapp.com/attachments/694609874197151754/813851700011335730/NLW04_pack_divulgacao_-_Github.png" alt="Banner NLW#4 Rocketseat">

## Meu passo à passo

#### Estou anotando, versionando e compartilhando aqui no Github a fim de aprender mais explicando ele. Estarei atualizando até finalizar.

Criar Pasta do projeto

> cria um package, o -y criar as informações com o que tem, default.
~~~~Shell
yarn init -y 
~~~~

> micro framework e mais utilizados
~~~~Shell
yarn add express 
~~~~

criar pasta src

criar dentro da pasta src/ o arquivo server.ts

> com -D a dependencia vai ficar apenas em desenvolvimento.
~~~~Shell
yarn add @types/express -D
~~~~

add no arquivo 
~~~~Typescript
server.ts: app.Listen(porta, () => mensagem)
~~~~

para o node identificar o arquivo server.ts ao rodar o servidor criado.
~~~~Shell
yarn add typescript -D 
~~~~

inicializa o typescript na aplicação
~~~~Shell
yarn tsc --init
~~~~

alterar arquivo tsconfig.json, 
~~~~Json
strict = false.
~~~~

converte o arquivo em tempo de execução.
~~~~Shell
yarn add ts-node-dev -D 
~~~~

package.json - criar linha:
~~~~Json
scripts {
    "dev": "ts-node-dev src/server.ts"
}
~~~~

package.json - adicionar no scripts 
~~~~Json
dev: "--trasnspile-only --ignore-watch node_modules"
~~~~

~~~~Typescript
server.ts {
//    app.get("/users", (request, response) => {
//       return response.send("Hello world - NLW#04")
//    }); Antigo

    app.get("/", (request, response) => {
        return response.json({ message: "Hello world - NLW#04"});
    }); Novo

    app.post("/", (request, response) => {
        return response.json({message: "Os dados foram salvos com sucesso!"});
    });

}
~~~~

Install Insomnia: [Site Insomnia](https://insomnia.rest/)

*Configurando com TypeORM*

[Site TypeORM](https://typeorm.io/#/)

Adicionar ao projeto TypeORM e a dependencia reflect-metadata
~~~~Shell
yarn add typeorm reflect-metadata
~~~~

Adicionar o sqlite como DB por ser fácil de utilizar sem grandes configurações.
~~~~Shell
yarn add sqlite3
~~~~

criar arquivo ormconfig.json
~~~~Json
{
    "type": "sqlite",
    "database": "./src/database/database.sqlite"
}
~~~~

criar dentro de src um diretório database com o arquivo index.ts

add no arquivo index.ts
~~~~Typescript
{
    import { createConnection } from "typeorm";

        createConnection();
}
~~~~

add no arquivo server.ts 
~~~~Typescript
import "reflect-metadata"
import "./database"
~~~~
obs.: reflect-metadata torna-se o primeiro import do arquivo.

add no arquivo package.json em scripts
~~~~Typescript
"typeorm": "ts-node-dev node_modules/typeorm/cli.js"
~~~~

criar diretório .src/database/migrateions/

add no arquivo ormconfig.json
~~~~Json
"cli": {
    "migrationsDir": "./src/database/migrations"
}
~~~~

o caminha para direcionar as migrations criadas.

Criando a primeira migration Users
~~~~Typescript
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable (
        new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                ...
            ],
        })
    );
}
~~~~

add em ormconfig.json o caminho para salvar os arquivos criados pela migration:rum
~~~~Json
{
    "migrations": ["./src/database/migrations/**.ts"],
}
~~~~

Criar os dados no DB Sqlite
~~~~Shell
yarn typeorm migration:run
~~~~
