import {ApolloServer} from "apollo-server-express";
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core";
import {getUser} from "./lib/utilities";
import express from "express";
import http from "http";

import typeDefs from "./graphql/typeDefs/";
import resolvers from "./graphql/resolvers";
import {makeExecutableSchema} from "@graphql-tools/schema";

import cors from "cors";
import cookieParser from "cookie-parser";

const corsConfig =
    process.env.NODE_ENV !== "production"
        ? {
            origin: ["http://localhost:3000", "https://studio.apollographql.com"],
            credentials: true,
        }
        : {
            origin: "https://mon-site.com",
            credentials: true,
        };

async function startApolloServer() {
    const app = express();
    app.use(cors(corsConfig));
    app.use(cookieParser());

    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    const server = new ApolloServer({
        schema,
        context: ({req, res}) => {
            // @ts-ignore
            let userLogged = getUser(req.cookies.token);
            return {
                req,
                res,
                userLogged,
            };
        },
        csrfPrevention: true,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });

    await server.start();

    server.applyMiddleware({app, cors: false});

    const port = process.env.PORT || 4000;
    await new Promise<void>((resolve) =>
        httpServer.listen({port: 4000}, resolve)
    );

    console.log(
        `Serveur OK sur l'url suivante : http://localhost:${port}${server.graphqlPath}`
    );
}

startApolloServer();
