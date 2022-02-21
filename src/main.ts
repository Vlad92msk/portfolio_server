import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from '~server/lib/app.module'
import { config } from 'dotenv'

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.PORT, process.env.HOST)
  console.log(`Сервер доступен - http://${process.env.HOST}:${process.env.PORT}/graphql`)
}

bootstrap()
