import express from 'express';

const app = express();

/**
 * GET => Buscar
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração especifica
 */
app.get("/users", (request, response) => {
    return response.json({ message: "Hello world - NLW#04"});
});

app.listen(3000, () => console.log("Server ir running! (PORT: 3000)"));