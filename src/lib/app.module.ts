import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConnectModule } from '~server/lib/connect/connection.module'
import { PortfolioModule } from '~server/lib/portfolio/portfolio.module'
import { AuthMiddleware } from '~server/lib/connect/auth/middleware/auth.middleware'
import { CosmoModule } from '~server/lib/cosmo/cosmo.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      installSubscriptionHandlers: true,
      // cors: {
      //   origin: 'https://studio.apollographql.com',
      //   credentials: true,
      // },
      context: ({ req, res }) => ({ req, res })
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
