import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Connection, createConnection } from 'typeorm'
import { config } from 'dotenv'
config()


const defaultOptions: TypeOrmModuleOptions  = {
  host: 'localhost',
  port: 5432,
  username: 'vlad',
  password: 'password',
  synchronize: true,
  autoLoadEntities: true,
}

type createDbProviderType = {
  provide: string
  dbName: string
}

type Provider = {
  provide: string
  useFactory: () => Promise<Connection>
}

export const createDbProvider = ({ provide, dbName }: createDbProviderType): Provider => ({
  provide,
  useFactory: async () =>
    await createConnection({
      ...defaultOptions,
      type: 'postgres',
      name: dbName,
      database: dbName,
      entities: [__dirname + `/../lib/${dbName}/**/entitys/*.entity{.ts,.js}`],
    }),
})
