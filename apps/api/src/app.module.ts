import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: `${process.cwd()}/src/graphql.types.ts`,
        outputAs: 'interface',
        enumsAsTypes: true,
      }
    }),
  ],
})
export class AppModule { }
