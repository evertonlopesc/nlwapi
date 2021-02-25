![](https://img.shields.io/badge/Maintenance-</>-brightgreen?style=flat-square)

# nlwapi

![](https://img.shields.io/badge/Made_With-_-grey?style=flat-square)
![](https://img.shields.io/badge/_-Typescript-blue?style=flat-square)
![](https://img.shields.io/badge/_-Javascript-yellow?style=flat-square)
![](https://img.shields.io/badge/_-TypeORM-orange?style=flat-square)
![](https://img.shields.io/badge/_-Git-red?style=flat-square)
![](https://img.shields.io/badge/_-Github-black?style=flat-square)

Curso Rocketseat

<img src="https://cdn.discordapp.com/attachments/694609874197151754/813851700011335730/NLW04_pack_divulgacao_-_Github.png" alt="Banner NLW#4 Rocketseat">

## Meu passo à passo

#### Estou anotando, versionando e compartilhando aqui no Github a fim de aprender mais explicando ele. Estarei atualizando até finalizar.

Criar Pasta do projeto

> cria um package, o -y criar as informações com o que tem, default.

```Shell
yarn init -y
```

> micro framework e mais utilizados

```Shell
yarn add express
```

criar pasta src

criar dentro da pasta src/ o arquivo server.ts

> com -D a dependencia vai ficar apenas em desenvolvimento.

```Shell
yarn add @types/express -D
```

add no arquivo

```Typescript
server.ts: app.Listen(porta, () => mensagem)
```

para o node identificar o arquivo server.ts ao rodar o servidor criado.

```Shell
yarn add typescript -D
```

inicializa o typescript na aplicação

```Shell
yarn tsc --init
```

alterar arquivo tsconfig.json,

```Json
strict = false.
```

converte o arquivo em tempo de execução.

```Shell
yarn add ts-node-dev -D
```

package.json - criar linha:

```Json
scripts {
    "dev": "ts-node-dev src/server.ts"
}
```

package.json - adicionar no scripts

```Json
dev: "--trasnspile-only --ignore-watch node_modules"
```

```Typescript
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
```

Install Insomnia: [Site Insomnia](https://insomnia.rest/)

_Configurando com TypeORM_

[Site TypeORM](https://typeorm.io/#/)

Adicionar ao projeto TypeORM e a dependencia reflect-metadata

```Shell
yarn add typeorm reflect-metadata
```

Adicionar o sqlite como DB por ser fácil de utilizar sem grandes configurações.

```Shell
yarn add sqlite3
```

criar arquivo ormconfig.json

```Json
{
    "type": "sqlite",
    "database": "./src/database/database.sqlite"
}
```

criar dentro de src um diretório database com o arquivo index.ts

add no arquivo index.ts

```Typescript
{
    import { createConnection } from "typeorm";

        createConnection();
}
```

add no arquivo server.ts

```Typescript
import "reflect-metadata"
import "./database"
```

obs.: reflect-metadata torna-se o primeiro import do arquivo.

add no arquivo package.json em scripts

```Typescript
"typeorm": "ts-node-dev node_modules/typeorm/cli.js"
```

criar diretório .src/database/migrateions/

add no arquivo ormconfig.json

```Json
"cli": {
    "migrationsDir": "./src/database/migrations"
}
```

o caminha para direcionar as migrations criadas.

Criando a primeira migration Users

```Typescript
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
```

add em ormconfig.json o caminho para salvar os arquivos criados pela migration:rum

```Json
{
    "migrations": ["./src/database/migrations/**.ts"],
}
```

Criar os dados no DB Sqlite

```Shell
yarn typeorm migration:run
```

Desfazendo a última migration

```Shell
yarn typeorm migration:revert
```

Criar diretório ./src/controllers com o arquivo UserController.ts

add no arquivo UserController.ts

```Typescript
import {Request, Response} from "express";

class UserController {
    async create(request: Request, response: Response) {
        const body = request.body;
        console.log(body);
        return response.send();
    }
}

export { UserController }
```

Criar o arquivo ./src/routes.ts

add no arquivo routes.ts

```Typescript
import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();

router.post("/users", userController.create);

export { router };
```

Deletar no arquivos server.ts o post e get

Incluir no arquivo server.ts chamadas as rotas para o controller e a opção de receber Json

```Typescript
app.use(express.json());
app.use(router);

```

Criar o arquivo ./src/models e o arquivo models/User.ts

add no arquivo User.ts

```Typescript
import { Entity } from "typeorm";

@Entity("users")
class User{

}

export { User }

```

No arquivo tsconfig.json, habilite a opção Experimental Options e stricPropertyInitialization, para o stric deixe ele com **false**

Alterar o arquivo User.ts incluindo os atributos na classe

```Typescript
@Entity("users")
class User{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;
}

```

Adicionar a biblioteca uuid e sua dependência

```Shell
yarn add uuid
```

```Shell
yarn add @types/uuid -D
```

Importar para o arquivo User.ts a biblioteca uuid

```Typescript
import { v4 as uuid } from "uuid";
```

Adicionar no arquivo User.ts readonly para o id do user

```Typescript
@PrimaryColumn()
readonly id: string;
```

Criar no arquivo User.ts um construtor para tornar o id único usnado a biblioteca uuid

```Typescript
constructor() {
    if(!this.id) {
        this.id = uuid();
    }
}
```

Incluir no arquivo ormconfig.json o entities informando a rota do models

```Json
"entities": ["./src/models/**.ts"],
```

Altualizando o arquivo UserController.ts com create user

```Typescript
const user = userRepository.create({
    name,
    email,
});
```

Altualizando o arquivo UserController.ts com save user

```Typescript
await userRepository.save(user);
```

Altualizando o arquivo UserController.ts com autenticação

```Typescript
//SELECT * FROM USERS WHERE EMAIL = "EMAIL"
const userAlreadyExists = await userRepository.findOne({
    email,
});

if (userAlreadyExists) {
    return response.status(400).json({
        error: "User already exists!",

    });
}
```

Adicionando para o ambiente de desenvolvimento no arquivo ormconfig.json a opção logging

```Json
"logging": true,
```
