import { buildSchema, graphql, ExecutionResult, GraphQLFieldResolver, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLObjectType, GraphQLBoolean, GraphQLList, GraphQLResolveInfo } from 'graphql'
import * as assert from 'assert'
import GraphQLNodes from '../'

let query = `
query UsersRoute {
    viewer {
        users(userId:"123",first:25,includeInactive:true) @skip(if:false) {
            ...A
            ...D
            pageInfo {
            totalResults
            }

        }
    }
}

fragment A on UserConnection {
    edges {
    node {
        addressBook {
        apiType
        }
    }
    }
    ...B
}
fragment B on UserConnection {
    ...C
    edges {
    cursor
    }
}

fragment C on UserConnection {
    edges {
    cursor,
    node {
        profile {
            displayName,
            email
        }
    }
    }
}
fragment D on UserConnection {
    edges {
    node {
        proProfile {
        apiType
        }
    }
    }
    ...B
}
`;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            viewer: {
                type: new GraphQLObjectType({
                    name: 'Viewer',
                    fields: {
                        users: {
                            args: {
                                userId: {type: GraphQLString},
                                first: {type: GraphQLInt},
                                includeInactive: {type: GraphQLBoolean}
                            },
                            type: new GraphQLObjectType({
                                name: 'UserConnection',
                                fields: {
                                    pageInfo: {
                                        type: new GraphQLObjectType({
                                            name: 'PageInfo',
                                            fields: {
                                                totalResults: {type: GraphQLInt}
                                            }
                                        })
                                    },
                                    edges: {
                                        type: new GraphQLList(
                                            new GraphQLObjectType({
                                                name: 'UserEdge',
                                                fields: {
                                                    cursor: {type: GraphQLString},
                                                    node: {
                                                        type: new GraphQLObjectType({
                                                            name: 'User',
                                                            fields: {
                                                                addressBook: {
                                                                    type: new GraphQLObjectType({
                                                                        name: 'AddressBook',
                                                                        fields: {
                                                                            apiType: {type: GraphQLString}
                                                                        }
                                                                    })
                                                                },
                                                                profile: {
                                                                    type: new GraphQLObjectType({
                                                                        name: 'Profile',
                                                                        fields: {
                                                                            displayName: {type: GraphQLString},
                                                                            email: {type: GraphQLString}
                                                                        }
                                                                    })
                                                                },
                                                                proProfile: {
                                                                    type: new GraphQLObjectType({
                                                                        name: 'ProProfile',
                                                                        fields: {
                                                                            apiType: {type: GraphQLString}
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        )
                                    }
                                }
                            })
                        }
                    }
                }),
                resolve(root, args, context, i) {
                    info = i;
                    return {};
                }
            }
        }
    })
});

const expected = {
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

let info : GraphQLResolveInfo

let resolver : GraphQLFieldResolver<any, any> = (source, args, context, i: GraphQLResolveInfo) : object => {
    info = i
    return {}
}

describe('GraphQLNodes', () => {
    it('Creates map as expected', async () => {
        let graphqlArgs = {
            schema: schema,
            source: query
        }
        
        let response : ExecutionResult = await graphql(graphqlArgs)
    
        let graphqlNodes = new GraphQLNodes(info)
        let map = graphqlNodes.createMap()

        assert.deepStrictEqual(map, expected)
    })
})