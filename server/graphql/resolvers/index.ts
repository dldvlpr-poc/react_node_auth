import bookResolver from "./books.resolver";
import {mergeResolvers} from "@graphql-tools/merge";

export default mergeResolvers([bookResolver]);
