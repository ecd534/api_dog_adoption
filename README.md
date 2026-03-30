# API Dog Adoption

API REST para cadastro e gestão de cães para adoção.

## Stack

- Node.js
- Express
- PostgreSQL
- pg-promise
- Jest

## Pré-requisitos

- Node.js 18+
- PostgreSQL em execução

## Instalação

```bash
npm install
```

## Variáveis de ambiente

A aplicação usa as seguintes variáveis:

- `PORT` (opcional, default `3333`)
- `DB_HOST`
- `DATABASE`
- `DB_USER`
- `DB_PASS`
- `DB_PORT`

Exemplo de `.env`:

```env
PORT=3333
DB_HOST=localhost
DATABASE=dog_adoption
DB_USER=postgres
DB_PASS=postgres
DB_PORT=5432
```

## Banco de dados

### Rodar migration

```bash
npm run migrate
```

A migration cria:

1. `dog_adoption_centers`
2. `dogs_adoption` com FK para `dog_adoption_centers`

Também é inserido um centro padrão com `id = 1` para facilitar testes e uso local.

## Rodando a aplicação

### Desenvolvimento

```bash
npm run dev
```

### Produção local

```bash
npm start
```

API sobe por padrão em: `http://localhost:3333`

## Testes

```bash
npm test
```

## Endpoints

### GET /dogs

Retorna todos os cães.

### GET /dog/:id

Retorna um cão por id.

### POST /dogs

Cria um novo cão.

Body esperado:

```json
{
  "name": "Bidu",
  "age": "2",
  "characteristics": "brincalhao",
  "health": "vacinado",
  "gender": "male",
  "size": "medium",
  "primary_color": "brown",
  "photo": "opcional",
  "id_dog_adoption_center": "1",
  "breeds": "affenpinscher"
}
```

Observação:

- A foto é buscada na API externa Dog CEO usando o campo `breeds`.
- Se a API externa falhar, o cadastro continua com `photo = null`.

### PUT /dog/:id

Atualiza todos os campos do cão.

Body esperado:

```json
{
  "name": "Bidu",
  "age": "3",
  "characteristics": "calmo",
  "health": "vacinado",
  "gender": "male",
  "size": "medium",
  "primary_color": "black",
  "photo": null,
  "id_dog_adoption_center": "1",
  "breeds": "beagle"
}
```

### DELETE /dog/:id

Remove um cão por id.

## Estrutura principal

```txt
src/
  app.js
  server.js
  route/
    dogsRoute.js
  services/
    dogsService.js
  data/
    dogsData.js
  infra/
    config.js
    database.js
  database/
    migrate.js
    migrations/
      001_initial_schema.sql
  __tests__/
    dogs.test.js
```

## Scripts

- `npm run dev` - sobe servidor com nodemon
- `npm start` - sobe servidor
- `npm run migrate` - executa migrations SQL
- `npm test` - roda testes com Jest
- `npm run lint` - lint do código
- `npm run lint:fix` - corrige lint automaticamente
