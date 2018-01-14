import { buildSchema, graphql, ExecutionResult, GraphQLFieldResolver, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLObjectType, GraphQLBoolean, GraphQLList, GraphQLResolveInfo } from 'graphql'
import * as assert from 'assert'
import GraphQLNodes from '../'

let info : GraphQLResolveInfo

let schema = buildSchema(`
type Address {
    line1: String
    line2: String
    city: String
    state: String
    country: String
}

type Availability {
    requestedHours: Int
}

interface Employee {
    id: ID
    firstName: String
    lastName: String
    birthday: String
    address: Address
}

type Crew implements Employee {
    id: ID
    firstName: String
    lastName: String
    birthday: String
    address: Address
    availability: Availability
}

enum ManagerRole {
    SHIFT_SUPERVISOR
    RESTAURANT_MANAGER
    GENERAL_MANAGER
}

type Manager implements Employee {
    id: ID
    firstName: String
    lastName: String
    birthday: String
    address: Address
    role : ManagerRole
}

union SearchResult = Manager | Crew

type Store {
    id: ID
    address: Address
    crew : [Crew]
    managers : [Manager]
}

type Query {
    stores: [Store]
    employees: [SearchResult]
}

schema {
    query: Query
}
`)

let resolver : GraphQLFieldResolver<any, any> = (source, args, context, i: GraphQLResolveInfo) : object => {
    info = i
    return []
}

describe('GraphQLNodes', () => {
    afterEach(() => {
        info = null
    })
    it('Creates map for simple query', async () => {
        let query = `
            query {
                stores {
                    crew {
                        firstName
                        lastName
                    }
                }
            }
        `
        let expected = {
            "crew" : {
                "firstName" : {},
                "lastName" : {}
            }
        }

        let graphqlArgs = {
            schema: schema,
            source: query,
            fieldResolver : resolver
        }
        
        let response : ExecutionResult = await graphql(graphqlArgs)
    
        let graphqlNodes = new GraphQLNodes(info)
        let map = graphqlNodes.createMap()

        assert.deepStrictEqual(map, expected)
    })
    it('Creates map for query with fragment definition', async () => {
        let query = `
            fragment profile on Crew {
                firstName
                lastName
                birthday
            }

            query {
                stores {
                    crew {
                        ... profile 
                    }
                }
            }
        `
        let expected = {
            "crew" : {
                "firstName" : {},
                "lastName" : {},
                "birthday" : {}
            }
        }

        let graphqlArgs = {
            schema: schema,
            source: query,
            fieldResolver : resolver
        }
            
        let response : ExecutionResult = await graphql(graphqlArgs)

        let graphqlNodes = new GraphQLNodes(info)
        let map = graphqlNodes.createMap()

        assert.deepStrictEqual(map, expected)
    })
    it('Creates map for query with inline fragment', async () => {
        let query = `
            query {
                employees {
                    ... on Crew {
                        firstName
                        availability {
                            requestedHours
                        }
                    }
                    ... on Manager {
                        firstName
                        role
                    }
                }
            }
        `

        let expected = {
            "firstName" : {},
            "availability" : {
                "requestedHours" : {}
            },
            "role" : {}
        }

        let graphqlArgs = {
            schema: schema,
            source: query,
            fieldResolver : resolver
        }

        let response : ExecutionResult = await graphql(graphqlArgs)

        let graphqlNodes = new GraphQLNodes(info)
        let map = graphqlNodes.createMap()

        assert.deepStrictEqual(map, expected)
    })
    it('Creates map for complex query with fragment definitions and inline fragments', async () => {
        let query = `
            fragment name on Employee {
                firstName
                lastName
            }

            query {
                employees { 
                    ... on Crew {
                        ... name
                    }
                    ... on Manager {
                        ... name
                    }
                }
            }
        `

        let expected = {
            "firstName" : {},
            "lastName" : {}
        }

        let graphqlArgs = {
            schema: schema,
            source: query,
            fieldResolver : resolver
        }

        let response : ExecutionResult = await graphql(graphqlArgs)

        let graphqlNodes = new GraphQLNodes(info)
        let map = graphqlNodes.createMap()

        assert.deepStrictEqual(map, expected)
    })
})