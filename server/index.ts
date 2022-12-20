import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from  "express";
import http from  "http";

import  typeDefs  from  "./graphql/typeDefs";
import  resolvers  from  "./graphql/resolvers";
import { makeExecutableSchema } from  "@graphql-tools/schema";

async  function  startApolloServer() {
    const app  =  express();
    const httpServer  = http.createServer(app);
    const schema  =  makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    const server = new ApolloServer({
        schema,
        context: () => ({}),
        csrfPrevention:  true,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app });
    const  port  = process.env.PORT  ||  4000;
    await  new  Promise<void>(resolve => httpServer.listen({ port }, resolve));
    console.log(`
            Serveur OK sur l'url suivante : http://localhost:${port}${server.graphqlPath}`
    );
}
startApolloServer();