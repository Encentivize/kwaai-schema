#kwaai-schema

Json schema helpers

##Description
A set of helper tools to assist in working with json schema in node.

##API
###validateToSchema(document,schema)

```javascript
var schema={
    $schema: "http://json-schema.org/draft-04/schema#",
    title: "test",
    description:"test",
    properties: {
        name: {type: "string", pattern: "^[a-z0-9_\-]+$"},
        description: {type: "string"},
        id:{type:"string",format:"mongoid"},
        email:{type:"string",format:"email"}
    }
}

var doc={
   name:"ab5%%c",
   description:"test"
}

var invalid=kwaaiSchema.validateToSchema(doc,schema)


```

###coerceToSchema(document,schema)
Not implemented

###mergeSchemaLinks(document,schema)
Merges any hyperschema links in a schema into the document.
Replaces {attribute} with teh actual value.

