import { GraphQLResolveInfo } from "graphql";
export default class GraphQLNodes {
    /**
     * Fragments.
     *
     * Contains array of `FragmentDefinitionNode` type.
     */
    private fragments;
    /**
     * Field Nodes.
     *
     * Top-level nodes.
     */
    private fieldNodes;
    /**
     * Create Node Map.
     *
     * @param nodeMap Optional, to preserve parameter signature of original project.
     */
    createMap(nodeMap?: {}): any;
    constructor(info: GraphQLResolveInfo);
}
