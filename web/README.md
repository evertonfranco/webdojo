# Testes Automatizados Webdojo --- Cypress

## 1. Sobre o projeto

Este projeto contém testes automatizados de interface para a aplicação
Webdojo, utilizando o [Cypress](https://www.cypress.io/).

A aplicação Webdojo faz parte do mesmo repositório. Por isso, antes de
executar os testes, é necessário iniciar a aplicação localmente.

Os testes podem ser executados pelo terminal ou pela interface gráfica
do Cypress. Há também comandos específicos para os testes de login em
diferentes dimensões de viewport.

## 2. Pré-requisitos

Antes de começar, verifique se o ambiente possui:

-   [Node.js](https://nodejs.org/) instalado;
-   npm, normalmente instalado junto com o Node.js;
-   dependências do projeto instaladas;
-   repositório Webdojo disponível localmente.

Na raiz do projeto, instale as dependências com:

``` bash
npm install
```

## 3. Estrutura do projeto Cypress

A estrutura de testes apresentada é organizada da seguinte forma:

``` text
web/
└── cypress/
    ├── e2e/
    ├── fixtures/
    │   ├── cep.json
    │   ├── consultancy.json
    │   └── document.pdf
    └── support/
        ├── actions/
        │   └── consultancy.actions.js
        ├── commands.js
        ├── e2e.js
        └── utils.js
```

### `cypress/e2e/`

Diretório destinado aos testes end-to-end (E2E), que verificam os fluxos
da aplicação pela perspectiva de quem a utiliza.

O projeto inclui o arquivo `login.cy.js`, utilizado nos comandos
específicos de teste de login.

### `cypress/fixtures/`

Armazena arquivos de dados e recursos utilizados pelos testes,
permitindo separar os dados de teste da implementação dos cenários.

-   `cep.json`: dados relacionados a CEP;
-   `consultancy.json`: dados relacionados a consultorias;
-   `document.pdf`: arquivo PDF disponível para cenários que precisem
    utilizar um documento.

A finalidade exata e o conteúdo desses arquivos dependem de como são
referenciados nos testes.

### `cypress/support/`

Reúne recursos de apoio reutilizáveis pelos testes.

-   `actions/consultancy.actions.js`: arquivo destinado a ações
    relacionadas aos fluxos de consultoria;
-   `commands.js`: local para definição de comandos personalizados do
    Cypress;
-   `e2e.js`: arquivo de suporte carregado na configuração dos testes
    E2E;
-   `utils.js`: funções utilitárias reutilizáveis.

Essa organização ajuda a evitar duplicação de código e facilita a
manutenção dos testes.

## 4. Inicialização da aplicação

A aplicação Webdojo deve estar em execução antes de iniciar os testes
automatizados.

Em um terminal, na raiz do projeto, execute:

``` bash
npm run dev
```

O script `dev` inicia a aplicação a partir do diretório `dist`, servindo
os arquivos estáticos na porta `3000`.

Mantenha esse terminal aberto durante a execução dos testes. Caso a
aplicação não esteja disponível, os testes que dependem dela poderão
falhar.

> **Importante:** o script de desenvolvimento serve o conteúdo já
> existente em `dist`. Se esse diretório precisar ser gerado ou
> atualizado, execute previamente o processo de build definido pelo
> projeto.

## 5. Scripts disponíveis

Os comandos abaixo estão definidos na seção `scripts` do `package.json`.

  -----------------------------------------------------------------------
  Comando                             Finalidade
  ----------------------------------- -----------------------------------
  `npm run dev`                       Inicia a aplicação Webdojo na porta
                                      3000.

  `npm test`                          Executa os testes Cypress em modo
                                      headless, com viewport de 1400 ×
                                      900 pixels.

  `npm run test:ui`                   Abre a interface gráfica do Cypress
                                      para selecionar e acompanhar os
                                      testes.

  `npm run test:login`                Executa somente
                                      `cypress/e2e/login.cy.js`, com
                                      viewport de 1400 × 900 pixels.

  `npm run test:login:mobile`         Executa somente
                                      `cypress/e2e/login.cy.js`, com
                                      viewport de 414 × 896 pixels.
  -----------------------------------------------------------------------

### 5.1 Executar todos os testes

Com a aplicação em execução, abra outro terminal na raiz do projeto e
rode:

``` bash
npm test
```

O comando executa `npx cypress run` e define a viewport como 1400 × 900
pixels. A execução ocorre no terminal, sem abrir a interface interativa
do Cypress.

### 5.2 Abrir a interface gráfica

Para abrir o Cypress e executar os testes pela interface gráfica:

``` bash
npm run test:ui
```

Na interface, selecione o teste desejado para acompanhar sua execução e
visualizar os resultados.

### 5.3 Executar os testes de login --- desktop

Para executar apenas o teste de login com viewport de 1400 × 900 pixels:

``` bash
npm run test:login
```

Esse comando é útil durante o desenvolvimento e a depuração do fluxo de
autenticação, pois evita executar toda a suíte.

### 5.4 Executar os testes de login --- mobile

Para executar o mesmo arquivo de teste com viewport de 414 × 896 pixels:

``` bash
npm run test:login:mobile
```

Essa configuração permite verificar o comportamento do fluxo de login em
uma área de visualização reduzida, representativa de um dispositivo
móvel.

> **Observação:** alterar a viewport não equivale, por si só, a testar
> um dispositivo físico. O comando verifica o comportamento da aplicação
> na dimensão configurada pelo Cypress.

## 6. Fluxo recomendado de execução

Siga esta sequência para executar os testes localmente:

1.  Abra um terminal na raiz do repositório.
2.  Instale as dependências, se necessário, com `npm install`.
3.  Inicie a aplicação com `npm run dev`.
4.  Mantenha a aplicação em execução.
5.  Abra outro terminal na raiz do repositório.
6.  Execute `npm test`, ou escolha um dos comandos específicos para
    login.
7.  Analise o resultado apresentado no terminal ou na interface do
    Cypress.

## 7. Boas práticas

-   Mantenha os cenários E2E organizados por funcionalidade.
-   Utilize fixtures para dados e arquivos de teste que possam ser
    reutilizados.
-   Centralize ações comuns e comandos reutilizáveis nos arquivos de
    suporte apropriados.
-   Evite depender da ordem de execução entre testes; cada cenário deve
    ser o mais independente possível.
-   Utilize seletores estáveis, preferencialmente atributos dedicados a
    testes, quando disponíveis na aplicação.
-   Verifique se a aplicação está acessível antes de iniciar a suíte.
-   Ao investigar uma falha, execute primeiro o teste específico
    relacionado ao problema e, depois, a suíte completa.
-   Mantenha os dados de teste atualizados quando houver mudanças nos
    fluxos da aplicação.

## 8. Solução de problemas

### A aplicação não está disponível

-   Confirme se `npm run dev` está em execução.
-   Verifique se a aplicação pode ser acessada localmente na porta
    `3000`.
-   Confira se o diretório `dist` contém a versão esperada da aplicação.

### O Cypress não é encontrado ou não inicia

-   Execute `npm install` na raiz do projeto.
-   Verifique se o Cypress está declarado nas dependências do projeto.
-   Consulte a mensagem de erro exibida no terminal para identificar
    problemas de instalação ou configuração.

### Um teste falha

-   Verifique se a aplicação está em execução e se os dados utilizados
    pelo cenário são válidos.
-   Execute apenas o arquivo relacionado à falha, quando houver um
    script específico.
-   Confira seletores, mensagens esperadas, fixtures e possíveis
    alterações recentes na interface.
-   Se o erro ocorrer somente na viewport mobile, investigue também o
    comportamento responsivo da aplicação.

## 9. Resumo rápido

Para iniciar a aplicação e executar os testes de login em desktop,
utilize dois terminais:

**Terminal 1 --- aplicação**

``` bash
npm run dev
```

**Terminal 2 --- testes**

``` bash
npm run test:login
```

Para testar o login na viewport mobile:

``` bash
npm run test:login:mobile
```

Para executar a suíte completa:

``` bash
npm test
```
