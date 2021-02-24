import 'reflect-metadata';
import express from 'express';
import "./database";

const app = express();

/**
 * GET => Buscar
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração especifica
 */
app.get("/", (request, response) => {
    return response.json({ message: "Hello world - NLW#04"});
});

// 1 param => Rota(Recurso API))
// 2 param => request, response

app.post("/", (request, response) => {
    // Recebeu os dados para salvar
    return response.json({message: "Os dados foram salvos com sucesso!"});
});

app.listen(3000, () => console.log("Server ir running! (http://localhost:3000)"));