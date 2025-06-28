prisma migrate dev --name init

nest g resource author --no-spec

dotenv -e .env.production -- npx prisma migrate deploy
dotenv -e .env.faster -- npx prisma migrate deploy
dotenv -e .env -- npx prisma migrate dev
