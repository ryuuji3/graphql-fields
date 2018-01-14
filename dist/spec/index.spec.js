"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var assert = require("assert");
var _1 = require("../");
var query = "\nquery UsersRoute {\n    viewer {\n        users(userId:\"123\",first:25,includeInactive:true) @skip(if:false) {\n            ...A\n            ...D\n            pageInfo {\n            totalResults\n            }\n\n        }\n    }\n}\n\nfragment A on UserConnection {\n    edges {\n    node {\n        addressBook {\n        apiType\n        }\n    }\n    }\n    ...B\n}\nfragment B on UserConnection {\n    ...C\n    edges {\n    cursor\n    }\n}\n\nfragment C on UserConnection {\n    edges {\n    cursor,\n    node {\n        profile {\n            displayName,\n            email\n        }\n    }\n    }\n}\nfragment D on UserConnection {\n    edges {\n    node {\n        proProfile {\n        apiType\n        }\n    }\n    }\n    ...B\n}\n";
var schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'Query',
        fields: {
            viewer: {
                type: new graphql_1.GraphQLObjectType({
                    name: 'Viewer',
                    fields: {
                        users: {
                            args: {
                                userId: { type: graphql_1.GraphQLString },
                                first: { type: graphql_1.GraphQLInt },
                                includeInactive: { type: graphql_1.GraphQLBoolean }
                            },
                            type: new graphql_1.GraphQLObjectType({
                                name: 'UserConnection',
                                fields: {
                                    pageInfo: {
                                        type: new graphql_1.GraphQLObjectType({
                                            name: 'PageInfo',
                                            fields: {
                                                totalResults: { type: graphql_1.GraphQLInt }
                                            }
                                        })
                                    },
                                    edges: {
                                        type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                                            name: 'UserEdge',
                                            fields: {
                                                cursor: { type: graphql_1.GraphQLString },
                                                node: {
                                                    type: new graphql_1.GraphQLObjectType({
                                                        name: 'User',
                                                        fields: {
                                                            addressBook: {
                                                                type: new graphql_1.GraphQLObjectType({
                                                                    name: 'AddressBook',
                                                                    fields: {
                                                                        apiType: { type: graphql_1.GraphQLString }
                                                                    }
                                                                })
                                                            },
                                                            profile: {
                                                                type: new graphql_1.GraphQLObjectType({
                                                                    name: 'Profile',
                                                                    fields: {
                                                                        displayName: { type: graphql_1.GraphQLString },
                                                                        email: { type: graphql_1.GraphQLString }
                                                                    }
                                                                })
                                                            },
                                                            proProfile: {
                                                                type: new graphql_1.GraphQLObjectType({
                                                                    name: 'ProProfile',
                                                                    fields: {
                                                                        apiType: { type: graphql_1.GraphQLString }
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        }))
                                    }
                                }
                            })
                        }
                    }
                }),
                resolve: function (root, args, context, i) {
                    info = i;
                    return {};
                }
            }
        }
    })
});
var expected = {
    users: {
        pageInfo: {
            totalResults: {}
        },
        edges: {
            cursor: {},
            node: {
                addressBook: {
                    apiType: {}
                },
                proProfile: {
                    apiType: {}
                },
                profile: {
                    displayName: {},
                    email: {}
                }
            }
        }
    }
};
var info;
var resolver = function (source, args, context, i) {
    info = i;
    return {};
};
describe('GraphQLNodes', function () {
    it('Creates map as expected', function () { return __awaiter(_this, void 0, void 0, function () {
        var graphqlArgs, response, graphqlNodes, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    graphqlArgs = {
                        schema: schema,
                        source: query
                    };
                    return [4 /*yield*/, graphql_1.graphql(graphqlArgs)];
                case 1:
                    response = _a.sent();
                    graphqlNodes = new _1.default(info);
                    map = graphqlNodes.createMap();
                    assert.deepStrictEqual(map, expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map