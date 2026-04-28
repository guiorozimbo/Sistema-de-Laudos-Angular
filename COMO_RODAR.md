# Como rodar o teste Sistema de Laudos

## 1. Requisitos

- Node.js instalado (recomendado 18 ou superior)
- npm instalado
- Nada além do frontend é necessário; o projeto é uma aplicação Angular que roda localmente no navegador.

## 2. Instalação

No diretório do projeto, execute:

```bash
npm install
```

## 3. Rodar a aplicação

Para iniciar o servidor local do Angular, execute:

```bash
npm start
```

Se a porta `4200` estiver ocupada, use:

```bash
npx ng serve --port 4201
```

Depois, abra no navegador:

```text
http://localhost:4201/
```

## 4. Fluxo da aplicação

1. Selecione o tipo de veículo: Automóvel, Caminhão ou Motocicleta.
2. Preencha os dados do proprietário.
3. Preencha os dados do veículo.
4. Preencha os dados do agente vistoriador.
5. Marque o checklist correspondente ao tipo de veículo.
6. Finalize e visualize o relatório.
7. Exporte o resultado em JSON clicando em "Exportar JSON".

## 5. Testes

Para executar os testes unitários, use:

```bash
npm test -- --watch=false --browsers=ChromeHeadless --progress=false
```

## 6. Validação de build

Para verificar se o projeto compila corretamente:

```bash
npm run build
```

## 7. Módulo e dados

- `src/app/app.module.ts` importa `ReactiveFormsModule` para trabalhar com formulários reativos.
- `src/app/services/laudo.service.ts` fornece:
  - `getChecklist(tipo: TipoVeiculo)` para obter o checklist por tipo de veículo
  - `createLaudo(...)` para montar o objeto final do laudo
  - `exportJson(laudo)` para gerar o JSON final
- `AppComponent` injeta `LaudoService` e alimenta a interface com os dados do formulário.
- Não há backend implementado nem requisitos no PDF que exijam server-side; tudo roda no cliente.

## 8. Observações

- O projeto está em Angular 15.2.11 conforme exigido no PDF.
- A configuração TypeScript foi ajustada para evitar avisos de `rootDir` e deprecações futuras.
- O arquivo `README.md` também contém instruções básicas de execução.
