# graphql-nodes
Turns GraphQLResolveInfo into a map of the requested nodes. Flattens all fragments and duplicated nodes into a neat object to easily see which fields were requested at any level.

This project was originally created by Rob Richard [https://github.com/robrichard] and I take no credit for this project. I only 'ported' it to Typescript and re-organized it a bit. Thanks for your work, Rob! :clap:

## Usage

```typescript
import { GraphQLResolveInfo, GraphQLFieldResolver } from 'graphql'
import GraphQLNodes from 'graphql-nodes'

function resolver (source, args, context, info : GraphQLResolveInfo) {
    // ...

    let nodes = new GraphQLNodes(info)
    let map = nodes.createMap() // <-- There you have it!

    // ...
}
```

## Tests
```
npm test
```
