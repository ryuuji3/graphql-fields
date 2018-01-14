import { SelectionNode, FragmentDefinitionNode, InlineFragmentNode, FragmentSpreadNode, FieldNode, GraphQLResolveInfo } from "graphql";

/**
 * All Nodes.
 */
type GraphQLNode = SelectionNode | FragmentDefinitionNode
/**
 * Fragment Nodes only.
 */
type GraphQLFragmentNode = InlineFragmentNode | FragmentSpreadNode | FragmentDefinitionNode

export default class GraphQLNodes {

    /**
     * Fragments.
     * 
     * Contains array of `FragmentDefinitionNode` type. 
     */
    private fragments : {
        [ fragmentName: string ] : FragmentDefinitionNode
    }
    /**
     * Field Nodes.
     * 
     * Top-level nodes.
     */
    private fieldNodes : FieldNode[] = []

    /**
     * Create Node Map.
     * 
     * @param nodeMap Optional, to preserve parameter signature of original project.
     */
    public createMap(nodeMap = {}) {
        let parentNodes = this.fieldNodes
        let getSelections = (node: GraphQLNode) : GraphQLNode[] => { 
            if ((node as FieldNode).selectionSet) {
                return (node as FieldNode).selectionSet.selections
            } else {
                return []
            }
        }
        let isFragment = (node : GraphQLNode) : node is GraphQLFragmentNode => {
            return (node.kind === 'InlineFragment') || (node.kind === 'FragmentSpread') || (node.kind === 'FragmentDefinition' )
        }
        let isFragmentSpread = (node : GraphQLNode) : node is FragmentSpreadNode => {
            return node.kind === 'FragmentSpread'
        }

        let getNodeFromFragment = (node : GraphQLFragmentNode) => {
            let fragmentNode = node
            if (isFragmentSpread(node)) {
                let name = node.name.value
                fragmentNode = this.fragments[name]
            }
            return fragmentNode
        }

        let reducer = (nodes, currentNode) => {
            if (isFragment(currentNode)) {
                nodes = constructMap(getNodeFromFragment(currentNode), nodes)
            } else {
                let name = currentNode.name.value
                if (nodes[name]) {
                    Object.assign(nodes[name], constructMap(currentNode, nodes[name]))
                } else {
                    nodes[name] = constructMap(currentNode)
                }
            }
            return nodes
        }
        
        let constructMap = (node : GraphQLNode, mapValue : object = {}) => {
            return getSelections(node)
                .reduce(reducer, mapValue)
        }

        return parentNodes.reduce((nodes, currentNode) => {
            return constructMap(currentNode, nodes)
        }, nodeMap)
    }

    constructor(info: GraphQLResolveInfo) {
        this.fragments = info.fragments
        this.fieldNodes = info.fieldNodes || info['fieldASTs'] // To maintain compatability with older versions of Graphql
    }
}