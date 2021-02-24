# nlwapi

Curso Rocketseat

<img src="https://cdn.discordapp.com/attachments/694609874197151754/813851700011335730/NLW04_pack_divulgacao_-_Github.png" alt="Banner NLW#4 Rocketseat">

## Meu passo à passo

#### Estou anotando, versionando e compartilhando aqui no Github a fim de aprender mais refazendo ele.

Criar Pasta #

run ~ yarn init -y #cria um package, o -y criar as informações com o que tem, default.

run ~ yarn add express #micro framework e mais utilizados

criar pasta src

criar dentro da pasta src/ o arquivo server.ts

run ~ yarn add @types/express -D # com -D a dependencia vai ficar apenas em desenvolvimento.

add no arquivo server.ts: app.Listen(porta, () => mensagem)

run ~ yarn add typescript -D # para o node identificar o arquivo server.ts a rodar o servidor criado.

run ~ yarn tsc --init # inicializa o typescript na aplicação

alterar arquivo tsconfig.json, strict = false.

run ~ yarn add ts-node-dev -D # converte o arquivo o arquivo em tempo de execução.

package.json - criar linha "scripts {dev: ts-node-dev src/server.ts}"

package.json - adicionar no scripts dev: "--trasnspile-only --ignore-watch node_modules"

server.ts {
app.get("/users", (request, response) => {
return response.send("Hello world - NLW#04")
}); Antigo

    app.get("/", (request, response) => {
        return response.json({ message: "Hello world - NLW#04"});
    }); Novo

    app.post("/", (request, response) => {
        return response.json({message: "Os dados foram salvos com sucesso!"});
    });

}

Install Insomnia: [Site Insomnia](https://insomnia.rest/)

Configurando com TypeORM

[Site TypeORM](https://typeorm.io/#/)

run ~ yarn add typeorm reflect-metadata

run ~ yarn add sqlite3

criar arquivo ormconfig,json {
{
"type": "sqlite",
"database": "./src/database/database.sqlite"
}
}

criar dentro de src um diretório database com o arquivo index.ts

add no arquivo index.ts {
import { createConnection } from "typeorm";

    createConnection();

}

add no arquivo server.ts importar reflect-metadata e ./database
obs.: reflect-metadata torna-se o primeiro import do arquivo.

add no arquivo package.json em scripts {
"typeorm": "ts-node-dev node_modules/typeorm/cli.js"
}

criar diretório .src/database/migrateions/

add no arquivo ormconfig.json {
"cli": {
"migrationsDir": "./src/database/migrations"
}
}

o caminha para direcionar as migrations criadas.

Criando a primeira migration Users

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
]
})
)
}
