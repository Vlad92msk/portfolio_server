import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {ConfigModule} from "@nestjs/config";

import {GraphQLModule} from '@nestjs/graphql'
import mainConfig from '@config/main.config'
import {ConnectModule} from "@lib/connect/connection.module";
import {PortfolioModule} from "@lib/portfolio/portfolio.module";
import {CosmoModule} from "@lib/cosmo/cosmo.module";
import {AuthMiddleware} from "@lib/connect/auth/middleware/auth.middleware";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mainConfig]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      installSubscriptionHandlers: true,
      // cors: {
      //   origin: 'https://studio.apollographql.com',
      //   credentials: true,
      // },
      context: ({req, res}) => ({req, res})
    }),
    ConnectModule,
    PortfolioModule,
    CosmoModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
