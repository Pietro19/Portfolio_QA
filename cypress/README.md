# 🧪 Cypress – Portfólio de Automação de Testes QA
---

## 👤 Visão Geral 

- 🔹 **Ferramenta principal:** Cypress  
- 🔹 **Linguagem:** JavaScript  
- 🔹 **Tipo de testes:** Funcionais, End-to-End (E2E), Conteúdo, Negativos e Responsividade  
- 🔹 **Projetos testados:** 3 sites reais  
- 🔹 **Total aproximado:** **+100 testes automatizados**

---

## 🎯 O que este projeto demonstra

✔ Capacidade de testar aplicações reais, não apenas exemplos  
✔ Criação de **baterias de testes completas**, não testes isolados  
✔ Validação de **fluxos reais do usuário**  
✔ Pensamento crítico em cenários positivos e negativos  
✔ Organização e leitura clara dos testes  
✔ Conhecimento prático de Cypress no dia a dia de QA  

---

### 🔧 Fundamentos do Cypress
- Instalação e configuração do Cypress
- Estrutura de testes com `describe`, `it` e `beforeEach`
- Navegação com `cy.visit`
- Seleção de elementos com `cy.get` e `cy.contains`
- Assertions com `should` e `expect`
- Organização de testes por páginas e fluxos

---
<details>
 <summary><strong>🧪 Aplicação de Testes – Scoder </strong></summary>

<br>

### 🔗 URL testada
https://www.scoder.com.br

---

### 🧪 Tipos de testes realizados

#### 🧭 Navegação por Scroll e Menu
- Botão **Início** (retorno ao topo)
- Botão **Sobre nós**
- Botão **Serviços**
- Botão **Scoder Way**
- Botão **Cases**
- Navegação para seções sem URL dedicada (apenas scroll)

---

#### 📝 Testes de Formulário (Agendar Call)
- Existência de todos os campos
- Campos preenchíveis (nome, telefone, email, empresa, nicho, produto)
- Bloqueio de envio sem preenchimento
- Validação de campos obrigatórios
- Comportamento do botão **Enviar**

---

#### 🌍 Testes de Internacionalização
- Troca de idioma (Português / Inglês)
- Validação de textos em inglês
- Persistência da versão correta da página

---

#### 📱 Testes de Layout e Responsividade
- Alteração de viewport
- Comportamento do layout em diferentes resoluções
- Scroll funcional em telas menores

---

#### 🔻 Testes de Rodapé (Footer)
- Exibição do footer
- Logo e slogan visíveis
- Links institucionais
- Informações de contato
- Ícones de redes sociais
- Link para Política de Privacidade

---

### 📊 Quantidade aproximada de testes

- 🧭 Navegação e scroll: **8+ testes**
- 📜 Conteúdo obrigatório: **6+ testes**
- 📝 Formulário: **6+ testes**
- 🌍 Idioma: **2 testes**
- 🔻 Rodapé: **6+ testes**

📌 **Total:** mais de **25 cenários automatizados**

---

### ✅ Resultado

- Cobertura completa do site institucional
- Testes robustos e bem segmentados
- Forte demonstração de domínio em:
  - Cypress E2E
  - Testes funcionais
  - Testes de UI
  - Testes baseados em comportamento do usuário

</details>

<details>
<summary><strong>🧪 Aplicação de Testes – Site do INATEL</strong></summary>


<br>


### 🔗 URL testada
https://www.inatel.br


---


### 🎯 Objetivo dos testes


Validar o funcionamento e a integridade de um **site institucional educacional**, garantindo que as principais informações estejam acessíveis e corretas para o usuário.


---


### 🧪 Principais testes realizados


- Verificação de carregamento da página
- Validação de elementos visíveis (menus, banners e seções)
- Testes de links internos
- Validação de conteúdos institucionais
- Verificação de textos obrigatórios
- Testes básicos de navegação e scroll


---


### 📊 Quantidade aproximada de testes


- 📜 Conteúdo e UI: **5+ testes**
- 🔁 Navegação e links: **4+ testes**
- 🧭 Scroll e layout: **3+ testes**


📌 **Total:** cerca de **12 cenários automatizados**


---


### ✅ Resultado


- Conteúdo institucional validado
- Navegação funcional
- Testes estáveis focados em experiência do usuário


📌 **Resumo técnico:**
Automação de testes em site institucional, com foco em validação de conteúdo, navegação e elementos de interface.


</details>

<details>
<summary><strong>🧪 Aplicação de Testes – Sauce Demo</strong></summary>

<br>

### 🔗 URL testada
https://www.saucedemo.com

---

### 🎯 Objetivo dos testes

Validar uma aplicação web de **e-commerce**, simulando o fluxo real do usuário, desde o login até a interação com produtos e carrinho.

---

### 🧪 Principais testes realizados

- Login com usuário válido e inválido
- Validação de acesso à página de produtos
- Existência e visualização de itens
- Verificação de nome, preço, descrição e imagem
- Adição e remoção de produtos do carrinho
- Navegação para página de detalhes do produto
- Validação de scroll da página
- Verificação do rodapé

---

### 📊 Quantidade aproximada de testes

- 🔐 Autenticação: **2 testes**
- 🛒 Funcionais (produtos e carrinho): **8+ testes**
- 🔁 Navegação: **4+ testes**
- 📜 Conteúdo e UI: **4+ testes**
- 🧭 Scroll: **3 testes**

📌 **Total:** mais de **20 cenários automatizados**

---

### ✅ Resultado

- Fluxo principal do e-commerce validado
- Interface e interações funcionando corretamente
- Testes estáveis e bem estruturados

📌 **Resumo técnico:**  
Automação de testes end-to-end em aplicação de e-commerce, cobrindo autenticação, navegação, produtos, carrinho e comportamento da interface.

</details>

## 🛠️ Tecnologias Utilizadas

- Cypress  
- JavaScript  
- Node.js  
- cypress-real-events  
- Postman (testes de API em projetos complementares)

