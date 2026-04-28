# SIGA Laudos

Aplicação Angular SPA (Single Page Application) para cadastro de laudos de veículos sinistrados, com fluxo passo a passo, checklist específico por tipo de veículo e exportação para JSON.

## Tecnologias

- **Angular**: 15.2.0
- **TypeScript**: 4.9.4
- **Node.js/npm**: (confira a versão via `node -v` e `npm -v`)

## Funcionalidades implementadas

- Seleção de tipo de veículo: Automóvel, Caminhão ou Motocicleta
- Formulários reativos para dados do proprietário, veículo e agente
- Checklist dinâmico baseado no tipo de veículo selecionado
- Relatório final com resumo dos dados e itens do checklist
- Exportação do laudo em JSON

## Por que é uma SPA?

Este projeto é uma **Single Page Application (SPA)** porque:

- Toda a aplicação é servida através de um único arquivo HTML (`src/index.html`)
- A navegação entre etapas ocorre no navegador sem recarregar a página
- Utiliza roteamento Angular (`@angular/router`) para gerenciar diferentes estados da aplicação
- Os dados são gerenciados em memória e dinamicamente renderizados conforme o usuário navega

## Como executar

1. Instale dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm start
```

3. Abra `http://localhost:4200/` no navegador.

## Entrega do desafio

A entrega deve ser feita por e-mail para: `sistemas@arcoconsultoria.com`

Inclua o código-fonte, o arquivo `README.md` e instruções de uso.

## Autor

Desenvolvido por Guilherme da Silva Ramos.

## Rodar testes

```bash
npm test -- --watch=false --browsers=ChromeHeadless --progress=false
```

## Passo a passo completo

Consulte também `COMO_RODAR.md` para instruções detalhadas de instalação, execução, build e validação do módulo.

## Estrutura principal

- `src/app/app.component.ts`: lógica do fluxo e validações do formulário
- `src/app/services/laudo.service.ts`: geração de checklist e laudo JSON
- `src/app/models`: modelos e interfaces para veículo, proprietário, agente, checklist e laudo

## Observações

Este projeto utiliza `ReactiveFormsModule` para garantir validação robusta e experiência de usuário consistente em múltiplas etapas.
