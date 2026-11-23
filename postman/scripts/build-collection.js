/**
 * Gera collections/serverest.postman_collection.json a partir desta definição.
 *
 * Por que um gerador? Scripts de teste ficam legíveis aqui (JS de verdade, com
 * diff limpo no Git) em vez de arrays de strings escapadas no JSON exportado.
 * O arquivo gerado continua 100% importável no Postman.
 *
 * Uso: node scripts/build-collection.js
 */
const fs = require("fs");
const path = require("path");

// ---------- helpers ----------
const lines = (fn) => {
  // extrai o corpo da função como linhas de script do Postman
  const src = fn.toString();
  const body = src.slice(src.indexOf("{") + 1, src.lastIndexOf("}"));
  const arr = body.split("\n");
  const indent = Math.min(...arr.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
  return arr.map((l) => l.slice(indent)).join("\n").trim().split("\n");
};

const ev = (listen, fn) => ({ listen, script: { type: "text/javascript", exec: lines(fn) } });

const url = (raw) => {
  const [base, query] = raw.split("?");
  const u = { raw: `{{baseURL}}${raw}`, host: ["{{baseURL}}"], path: base.split("/").filter(Boolean) };
  if (query) u.query = query.split("&").map((p) => { const [key, value] = p.split("="); return { key, value }; });
  return u;
};

const req = (name, method, rawUrl, { body, auth = false, pre, test, description } = {}) => {
  const header = [];
  if (body) header.push({ key: "Content-Type", value: "application/json" });
  if (auth) header.push({ key: "Authorization", value: "{{token}}" });
  const item = { name, request: { method, header, url: url(rawUrl) } };
  if (description) item.request.description = description;
  if (body) item.request.body = { mode: "raw", raw: JSON.stringify(body, null, 2), options: { raw: { language: "json" } } };
  item.event = [];
  if (pre) item.event.push(ev("prerequest", pre));
  if (test) item.event.push(ev("test", test));
  return item;
};

const folder = (name, description, item) => ({ name, description, item });

// ---------- Usuários ----------
const usuarios = folder("Usuario", "CRUD de usuários. Cria o usuário principal usado no restante da execução.", [
  req("Cadastro Usuarios_Sucesso", "POST", "/usuarios", {
    body: { nome: "QA Automação {{timestamp}}", email: "{{user_email}}", password: "{{user_password}}", administrador: "true" },
    pre: () => {
      const timestamp = Date.now();
      pm.environment.set("timestamp", timestamp);
      pm.environment.set("user_email", `qa_${timestamp}@qa.com.br`);
      pm.environment.set("user_password", "teste123");
    },
    test: () => {
      pm.test("Status code is 201", () => pm.response.to.have.status(201));
      const json = pm.response.json();
      pm.test("Mensagem de cadastro realizado", () => pm.expect(json.message).to.eql("Cadastro realizado com sucesso"));
      pm.test("Retorna o _id do usuário", () => pm.expect(json._id).to.be.a("string").and.not.empty);
      pm.environment.set("userId", json._id);
    },
  }),
  req("Cadastro Usuarios_Email_Já_Cadastrado", "POST", "/usuarios", {
    body: { nome: "QA Duplicado", email: "{{user_email}}", password: "teste", administrador: "true" },
    test: () => {
      pm.test("Status code is 400", () => pm.response.to.have.status(400));
      pm.test("Mensagem de e-mail já utilizado", () => pm.expect(pm.response.json().message).to.eql("Este email já está sendo usado"));
    },
  }),
  req("Trazer todos Usuarios", "GET", "/usuarios", {
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Body have quantidade", () => pm.expect(json.quantidade).to.be.a("number").and.above(0));
      pm.test("Body have lista de usuarios", () => pm.expect(json.usuarios).to.be.an("array").that.is.not.empty);
      pm.test("Usuário tem nome, email, password, administrador e _id", () =>
        pm.expect(json.usuarios[0]).to.include.all.keys("nome", "email", "password", "administrador", "_id"));
    },
  }),
  req("Trazer_Param", "GET", "/usuarios?_id={{userId}}", {
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Filtro por _id retorna exatamente 1 usuário", () => pm.expect(json.quantidade).to.eql(1));
      pm.test("Usuário retornado é o cadastrado", () => pm.expect(json.usuarios[0].email).to.eql(pm.environment.get("user_email")));
    },
  }),
  req("Busca usuario por ID Sucesso", "GET", "/usuarios/{{userId}}", {
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Retorna o usuário correto", () => {
        pm.expect(json._id).to.eql(pm.environment.get("userId"));
        pm.expect(json.email).to.eql(pm.environment.get("user_email"));
      });
    },
  }),
  req("Busca usuario por ID 400", "GET", "/usuarios/idInexistente000", {
    test: () => {
      pm.test("Status code is 400", () => pm.response.to.have.status(400));
      pm.test("Mensagem de usuário não encontrado", () => pm.expect(pm.response.json().message).to.eql("Usuário não encontrado"));
    },
  }),
  req("Editar Usuario sucesso_200", "PUT", "/usuarios/{{userId}}", {
    body: { nome: "QA Automação Editado", email: "{{user_email}}", password: "{{user_password}}", administrador: "true" },
    pre: () => {
      // troca o e-mail para um novo valor único e guarda para o login
      pm.environment.set("user_email", `qa_editado_${Date.now()}@qa.com.br`);
    },
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      pm.test("Mensagem de registro alterado", () => pm.expect(pm.response.json().message).to.eql("Registro alterado com sucesso"));
    },
  }),
  req("Editar Usuario_400", "PUT", "/usuarios/{{userId}}", {
    body: { nome: "QA Automação", email: "{{outro_email}}", password: "teste", administrador: "true" },
    description: "Tenta trocar o e-mail do usuário principal para um e-mail que já pertence a outro usuário.",
    pre: () => {
      // cria um segundo usuário para gerar o conflito de e-mail
      const outroEmail = `qa_outro_${Date.now()}@qa.com.br`;
      pm.environment.set("outro_email", outroEmail);
      pm.sendRequest({
        url: pm.environment.get("baseURL") + "/usuarios",
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: { mode: "raw", raw: JSON.stringify({ nome: "QA Outro", email: outroEmail, password: "teste", administrador: "false" }) },
      }, (err, res) => {
        if (!err) pm.environment.set("outroUserId", res.json()._id);
      });
    },
    test: () => {
      pm.test("Status code is 400", () => pm.response.to.have.status(400));
      pm.test("Mensagem de e-mail já utilizado", () => pm.expect(pm.response.json().message).to.eql("Este email já está sendo usado"));
    },
  }),
  req("Excluir usuario", "DELETE", "/usuarios/{{outroUserId}}", {
    test: () => {
      pm.test("Usuário deletado com sucesso", () => {
        pm.expect(pm.response.code).to.eql(200);
        pm.expect(pm.response.json().message).to.include("Registro excluído com sucesso");
      });
      pm.test("Resposta deve estar em formato JSON", () => pm.response.to.be.json);
    },
  }),
]);

// ---------- Login ----------
const login = folder("Login", "Autenticação. Gera o token usado nas rotas protegidas.", [
  req("Login_Success", "POST", "/login", {
    body: { email: "{{user_email}}", password: "{{user_password}}" },
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Body matches string", () => pm.expect(json.message).to.eql("Login realizado com sucesso"));
      pm.test("Body have authorization (Bearer)", () => pm.expect(json.authorization).to.match(/^Bearer\s.+/));
      pm.test("Tempo de resposta abaixo de 2s", () => pm.expect(pm.response.responseTime).to.be.below(2000));
      pm.environment.set("token", json.authorization);
    },
  }),
  req("Login E-mail e/ou senha inválidos", "POST", "/login", {
    body: { email: "{{user_email}}", password: "senhaErrada" },
    test: () => {
      pm.test("Status code is 401", () => pm.response.to.have.status(401));
      pm.test("Mensagem de credenciais inválidas", () => pm.expect(pm.response.json().message).to.eql("Email e/ou senha inválidos"));
      pm.test("Não retorna token", () => pm.expect(pm.response.json()).to.not.have.property("authorization"));
    },
  }),
  req("Login_Email_Incorrect", "POST", "/login", {
    body: { email: "zuado", password: "teste" },
    test: () => {
      pm.test("Status code is 400", () => pm.response.to.have.status(400));
      pm.test("Valida formato de e-mail", () => pm.expect(pm.response.json().email).to.eql("email deve ser um email válido"));
    },
  }),
]);

// ---------- Produtos ----------
const produtos = folder("Produto", "CRUD de produtos (rotas protegidas por token de administrador).", [
  req("cadastrar produto", "POST", "/produtos", {
    auth: true,
    body: { nome: "{{produto_nome}}", preco: "{{produto_preco}}", descricao: "Produto criado automaticamente", quantidade: "{{produto_quantidade}}" },
    pre: () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 100000);
      pm.environment.set("produto_nome", `Produto QA ${timestamp}-${random}`);
      pm.environment.set("produto_preco", Math.floor(Math.random() * 1000) + 50);
      pm.environment.set("produto_quantidade", Math.floor(Math.random() * 100) + 10);
    },
    test: () => {
      pm.test("Status code deve ser 201", () => pm.response.to.have.status(201));
      const json = pm.response.json();
      pm.test("Resposta contém mensagem de sucesso", () => pm.expect(json.message).to.eql("Cadastro realizado com sucesso"));
      pm.test("Resposta contém ID do produto", () => pm.expect(json._id).to.be.a("string").and.not.empty);
      pm.environment.set("produto_id", json._id);
    },
  }),
  req("cadastrar produto sem token", "POST", "/produtos", {
    body: { nome: "Produto sem token", preco: 10, descricao: "teste", quantidade: 1 },
    test: () => {
      pm.test("Status code deve ser 401", () => pm.response.to.have.status(401));
      pm.test("Mensagem de token ausente/inválido", () => pm.expect(pm.response.json().message).to.include("Token de acesso ausente"));
    },
  }),
  req("cadastrar produto com nome duplicado", "POST", "/produtos", {
    auth: true,
    body: { nome: "{{produto_nome}}", preco: 10, descricao: "duplicado", quantidade: 1 },
    test: () => {
      pm.test("Status code deve ser 400", () => pm.response.to.have.status(400));
      pm.test("Mensagem de produto já existente", () => pm.expect(pm.response.json().message).to.eql("Já existe produto com esse nome"));
    },
  }),
  req("Listar produtos cadastrados", "GET", "/produtos", {
    test: () => {
      pm.test("Status code 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Lista de produtos não está vazia", () => pm.expect(json.produtos).to.be.an("array").that.is.not.empty);
      pm.test("Produto tem nome, preco, descricao, quantidade e _id", () =>
        pm.expect(json.produtos[0]).to.include.all.keys("nome", "preco", "descricao", "quantidade", "_id"));
    },
  }),
  req("Listar produto por parametro", "GET", "/produtos?_id={{produto_id}}", {
    test: () => {
      pm.test("Status code 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Filtro retorna exatamente o produto cadastrado", () => {
        pm.expect(json.quantidade).to.eql(1);
        pm.expect(json.produtos[0].nome).to.eql(pm.environment.get("produto_nome"));
      });
    },
  }),
  req("buscar por ID", "GET", "/produtos/{{produto_id}}", {
    test: () => {
      pm.test("Status code 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Retorna o produto cadastrado", () => {
        pm.expect(json._id).to.eql(pm.environment.get("produto_id"));
        pm.expect(json.preco).to.eql(Number(pm.environment.get("produto_preco")));
      });
    },
  }),
  req("Editar Produto", "PUT", "/produtos/{{produto_id}}", {
    auth: true,
    body: { nome: "{{produto_nome}} EDITADO", preco: 500, descricao: "Produto editado via teste", quantidade: 20 },
    test: () => {
      pm.test("Status code 200", () => pm.response.to.have.status(200));
      pm.test("Mensagem de sucesso retornada", () => pm.expect(pm.response.json().message).to.eql("Registro alterado com sucesso"));
    },
  }),
]);

// ---------- Carrinhos ----------
const criarCarrinhoPre = () => {
  // garante que o usuário tenha um carrinho antes de concluir a compra
  pm.sendRequest({
    url: pm.environment.get("baseURL") + "/carrinhos",
    method: "POST",
    header: { "Content-Type": "application/json", Authorization: pm.environment.get("token") },
    body: { mode: "raw", raw: JSON.stringify({ produtos: [{ idProduto: pm.environment.get("produto_id"), quantidade: 1 }] }) },
  }, () => {});
};

const carrinhos = folder("Carrinho", "Fluxo de carrinho: cadastrar, consultar, cancelar e concluir compra.", [
  req("Cadastrar carrinho", "POST", "/carrinhos", {
    auth: true,
    body: { produtos: [{ idProduto: "{{produto_id}}", quantidade: 2 }] },
    test: () => {
      pm.test("Status code is 201", () => pm.response.to.have.status(201));
      const json = pm.response.json();
      pm.test("Mensagem de cadastro realizado", () => pm.expect(json.message).to.eql("Cadastro realizado com sucesso"));
      pm.environment.set("carrinho_id", json._id);
    },
  }),
  req("Cadastrar segundo carrinho (não permitido)", "POST", "/carrinhos", {
    auth: true,
    body: { produtos: [{ idProduto: "{{produto_id}}", quantidade: 1 }] },
    test: () => {
      pm.test("Status code is 400", () => pm.response.to.have.status(400));
      pm.test("Regra: só 1 carrinho por usuário", () => pm.expect(pm.response.json().message).to.eql("Não é permitido ter mais de 1 carrinho"));
    },
  }),
  req("Listar Carinhos cadastrados", "GET", "/carrinhos", {
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      pm.test("Lista de carrinhos é um array", () => pm.expect(pm.response.json().carrinhos).to.be.an("array"));
    },
  }),
  req("Buscar carrinhos por ID", "GET", "/carrinhos/{{carrinho_id}}", {
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      const json = pm.response.json();
      pm.test("Carrinho pertence ao usuário logado", () => pm.expect(json.idUsuario).to.eql(pm.environment.get("userId")));
      pm.test("Preço total = preço do produto x quantidade", () =>
        pm.expect(json.precoTotal).to.eql(json.produtos[0].precoUnitario * json.produtos[0].quantidade));
    },
  }),
  req("Excluir Carrinho e retornar produto para estoque", "DELETE", "/carrinhos/cancelar-compra", {
    auth: true,
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      pm.test("Estoque reabastecido", () => pm.expect(pm.response.json().message).to.include("Estoque dos produtos reabastecido"));
    },
  }),
  req("Excluir Carrinho (concluir compra)", "DELETE", "/carrinhos/concluir-compra", {
    auth: true,
    pre: criarCarrinhoPre,
    test: () => {
      pm.test("Status code is 200", () => pm.response.to.have.status(200));
      pm.test("Compra concluída", () => pm.expect(pm.response.json().message).to.eql("Registro excluído com sucesso"));
    },
  }),
]);

// ---------- Limpeza ----------
const limpeza = folder("Limpeza", "Remove apenas os dados criados nesta execução (a ServeRest pública é compartilhada).", [
  req("Excluir produto", "DELETE", "/produtos/{{produto_id}}", {
    auth: true,
    test: () => {
      pm.test("Status code 200", () => pm.response.to.have.status(200));
      pm.test("Mensagem de sucesso", () => pm.expect(pm.response.json().message).to.eql("Registro excluído com sucesso"));
    },
  }),
  req("Excluir usuario principal", "DELETE", "/usuarios/{{userId}}", {
    test: () => {
      pm.test("Status code 200", () => pm.response.to.have.status(200));
      pm.test("Mensagem de sucesso", () => pm.expect(pm.response.json().message).to.eql("Registro excluído com sucesso"));
    },
  }),
]);

const collection = {
  info: {
    name: "ServeRest – Testes de API",
    description:
      "Testes de API da ServeRest (https://serverest.dev). A coleção é autossuficiente: cria os próprios dados, " +
      "encadeia IDs e token entre as requisições e limpa tudo ao final. Executada no CI com Newman.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: [usuarios, login, produtos, carrinhos, limpeza],
};

const out = path.join(__dirname, "..", "collections", "serverest.postman_collection.json");
fs.writeFileSync(out, JSON.stringify(collection, null, 2) + "\n");
const reqs = collection.item.reduce((n, f) => n + f.item.length, 0);
const tests = JSON.stringify(collection).match(/pm\.test\(/g).length;
console.log(`Coleção gerada: ${reqs} requisições, ${tests} asserções -> ${path.relative(process.cwd(), out)}`);
