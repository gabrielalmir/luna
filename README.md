# Luna

Luna é um bot de música para Discord desenvolvido em TypeScript, utilizando a biblioteca `discord.js`. O objetivo do projeto é criar um bot modular e escalável, com suporte a reprodução de músicas, comandos personalizados e uma arquitetura bem organizada. O bot também contará com um sistema de assinatura para desbloquear funcionalidades premium.

## Funcionalidades

- **Reprodução de Música**: Suporte a reprodução de músicas em canais de voz do Discord.
- **Sistema de Assinatura**: Funcionalidades premium disponíveis para usuários com assinatura.
- **Registro de Comandos**: Os comandos são registrados automaticamente na API do Discord.
- **Arquitetura Modular**: Cada comando e evento é encapsulado em sua própria classe ou módulo.
- **Cache de Comandos**: Utiliza um sistema de cache para evitar registros desnecessários.

## Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [discord.js](https://discord.js.org/)
- [Bun](https://bun.sh/) para execução e gerenciamento de dependências
- [Zod](https://zod.dev/) para validação de variáveis de ambiente
- [Resulta](https://www.npmjs.com/package/resulta) para manipulação de resultados

## Status do Projeto

O projeto está em desenvolvimento ativo. Algumas funcionalidades ainda estão sendo implementadas, como o comando `play`, o sistema de assinatura e melhorias na arquitetura.

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/gabrielalmir/luna
   cd luna
   ```

2. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DISCORD_TOKEN=<seu-token>
   DISCORD_CLIENT_ID=<seu-client-id>
   DISCORD_CLIENT_SECRET=<seu-client-secret>
   ```

3. Instale as dependências:
   ```bash
   bun install
   ```

4. Inicie o bot:
   ```bash
   bun start
   ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

**Nota**: Este projeto está em fase inicial de desenvolvimento e pode sofrer alterações significativas.

