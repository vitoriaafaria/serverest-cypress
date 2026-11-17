# Automação de Testes Cypress - ServeRest

Projeto do desafio de automação com Cypress para o frontend e a API do ServeRest.

## Requisitos

- Node.js 20 ou superior
- npm
- Acesso à internet para acessar os ambientes públicos do ServeRest

## Instalação

Na raiz do projeto, instale as dependências conforme o `package-lock.json`:

```bash
npm ci
```

## Execução dos testes

Execute todos os cenários em modo headless:

```bash
npm run cy:run
```

Execute somente os cenários E2E do frontend:

```bash
npm run cy:e2e
```

Execute somente os cenários da API:

```bash
npm run cy:api
```

Abra a interface interativa do Cypress:

```bash
npm run cy:open
```

## Cenários cobertos

Os seis cenários usam a estrutura Dado/Quando/Então. Os passos também aparecem no log de comandos do Cypress.

### Frontend — E2E

| Cenário | Tipo | Dado | Quando | Então |
| --- | --- | --- | --- | --- |
| Cadastro, validação pela API e login | Positivo | Um usuário novo acessa o cadastro | Cadastra-se, a API autentica as mesmas credenciais e ele entra pela interface | A mensagem de cadastro aparece, o backend retorna HTTP 200 com token e a interface mostra Logout |
| Login com senha incorreta | Negativo | Existe um usuário válido, preparado pela API | O usuário tenta entrar pela interface com senha incorreta | A mensagem de credenciais inválidas fica visível |
| Cadastro pela interface | Positivo | Um visitante está na tela de login | Informa dados válidos e envia o formulário de cadastro | A interface confirma o cadastro |

O primeiro cenário cobre o fluxo completo entre interface e backend. No segundo, a API é usada apenas para preparar o usuário; o comportamento verificado é o login no frontend.

### Backend — API

| Cenário | Tipo | Dado | Quando | Então |
| --- | --- | --- | --- | --- |
| Listar produtos | Positivo | API disponível | Envia `GET /produtos` | Retorna HTTP 200, quantidade numérica e uma lista de produtos com quantidade correspondente |
| Cadastrar usuário | Positivo | Dados válidos e e-mail único | Envia `POST /usuarios` | Retorna HTTP 201, mensagem de sucesso e identificador `_id` |
| Rejeitar login inválido | Negativo | E-mail inexistente e senha incorreta | Envia `POST /login` | Retorna HTTP 401 e mensagem de credenciais inválidas |

## Organização

```text
cypress/
  e2e/
    api/usuarios.cy.js       # Cenários automatizados da API
    frontend/login.cy.js     # Cenários E2E do frontend
  evidence/cenarios/         # PDFs separados por cenário
  fixtures/                  # Dados de apoio
  support/
    commands.js              # Comando compartilhado de criação de usuário
    e2e.js                   # Carregamento do suporte Cypress
cypress.config.js            # URLs e configurações do Cypress
```

## Evidências

Os PDFs da execução aprovada estão em [`cypress/evidence/cenarios`](./cypress/evidence/cenarios). As capturas e os vídeos do Cypress são salvos em `cypress/screenshots` e `cypress/videos` durante a execução. Esses arquivos de saída são ignorados pelo Git.

Os PDFs registram uma execução aprovada e não são regenerados automaticamente pelo comando `cy:run`.

## Ambientes

- Frontend: <https://front.serverest.dev/>
- API e Swagger: <https://serverest.dev/>
