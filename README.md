
## ${TRIV\color{blue}IA}$

**Requisitos:**
- Node.js
- npm o yarn
- API key de OpenAI
- URL de conexión para una base de datos PostgreSQL

## 1. Clonar el repositorio
```bash
git clone https://github.com/Francokv/trivia
cd trivia
```

## 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

## 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
```plaintext
OPENAI_API_KEY=tu-api-key-de-openai
DATABASE_URL=tu-url-de-conexion-postgresql
```

## 4. Migrar la base de datos
Asegúrate de que tu base de datos PostgreSQL esté corriendo y migra la base de datos utilizando Prisma.
```bash
npx prisma migrate deploy
```

## 5. Iniciar el servidor de desarrollo
```bash
npm run dev
# o
yarn dev
```

## 6. Acceder al proyecto
Abre tu navegador y ve a `http://localhost:3000` para acceder al juego de trivia.

## Notas Adicionales

- **API Key de OpenAI:** Asegúrate de obtener una API key válida de OpenAI desde su [página de administración](https://platform.openai.com/account/api-keys).
- **Base de datos PostgreSQL:** Puedes configurar una base de datos PostgreSQL localmente o utilizar un servicio en la nube como Heroku, AWS RDS, o DigitalOcean.
