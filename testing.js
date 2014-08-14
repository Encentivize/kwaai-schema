var kwaaiSchema=require('./lib/schema.js');

var schema={
    $schema: "http://json-schema.org/draft-04/schema#",
    title: "test",
    description:"test",
    properties: {
        name: {type: "string", pattern: "^[a-z0-9_\-]+$"},
        description: {type: "string"}
    }
}

var doc={
   name:"ab5%%c",
   description:"test"
}
var invalid=kwaaiSchema.validateToSchema(doc,schema);
console.log(invalid)