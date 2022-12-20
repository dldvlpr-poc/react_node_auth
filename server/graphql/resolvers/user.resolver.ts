// @ts-ignore
import {GraphQLObjectType} from "graphql";
import {IRegisterUserInput, IUser} from "./user.resolver.spec";
import bcrypt from "bcrypt";
import {ApolloError} from "apollo-server-express";

let users: Array<IUser> = [];

export default {
    Query: {
        listUsers: () => users,
    },
    Mutation: {
        register: async (
            _: GraphQLObjectType,
            { registerUserInput }: IRegisterUserInput
        ) => {
            let newUser = { ...registerUserInput };
            const { password, username } = newUser;
            if (users.some((e) => e.username === username)) {
                throw new ApolloError("Un utilisateur existe déjà");
            }
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            //Token à générer
            //newUser à ajouter aux users
            return newUser;
        },
    },
};