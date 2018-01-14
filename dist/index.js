"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphQLNodes = /** @class */ (function () {
    function GraphQLNodes(info) {
        this.info = info;
        /**
         * Field Nodes.
         *
         * Top-level nodes.
         */
        this.fieldNodes = [];
        this.fragments = info.fragments;
        this.fieldNodes = info.fieldNodes || info['fieldASTs']; // To maintain compatability with older versions of Graphql
    }
    /**
     * Create Node Map.
     *
     * @param nodeMap Optional, to preserve parameter signature of original project.
     */
    GraphQLNodes.prototype.createMap = function (nodeMap) {
        var _this = this;
        if (nodeMap === void 0) { nodeMap = {}; }
        var parentNodes = this.fieldNodes;
        var getSelections = function (node) { return node.selectionSet ? node.selectionSet.selections : []; };
        var isFragment = function (node) {
            return (node.kind === 'InlineFragment') || (node.kind === 'FragmentSpread') || (node.kind === 'FragmentDefinition');
        };
        var isFragmentSpread = function (node) {
            return node.kind === 'FragmentSpread';
        };
        var getNodeFromFragment = function (node) {
            var fragmentNode = node;
            if (isFragmentSpread(node)) {
                var name = node.name.value;
                fragmentNode = _this.fragments[name];
            }
            return fragmentNode;
        };
        var reducer = function (nodes, currentNode) {
            if (isFragment(currentNode)) {
                nodes = constructMap(getNodeFromFragment(currentNode), nodes);
            }
            else {
                var name = currentNode.name.value;
                if (nodes[name]) {
                    Object.assign(nodes[name], constructMap(currentNode, nodes[name]));
                }
                else {
                    nodes[name] = constructMap(currentNode);
                }
            }
            return nodes;
        };
        var constructMap = function (node, mapValue) {
            if (mapValue === void 0) { mapValue = {}; }
            return getSelections(node)
                .reduce(reducer, mapValue);
        };
        return parentNodes.reduce(function (nodes, currentNode) {
            return constructMap(currentNode, nodes);
        }, nodeMap);
    };
    return GraphQLNodes;
}());
exports.default = GraphQLNodes;
//# sourceMappingURL=index.js.map