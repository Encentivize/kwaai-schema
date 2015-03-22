//*********************************************************************************************************************************************************************
//requires
//*********************************************************************************************************************************************************************

var tv4=require('tv4');
var jsonpath=require('JSONPath');
var deepcopy=require('deepcopy');


var formatters=require("./formatters.js");
for (var k in formatters){
    tv4.addFormat(k,formatters[k]);
}


//*********************************************************************************************************************************************************************
//exports
//*********************************************************************************************************************************************************************

var tools=
{
    validateToSchema:
        function(document,schema)
        {
            //argument checks
            if (!document){return new ArgumentError("document");}
            if (!schema){return new ArgumentError("schema");}

            if (!tv4.validate(document, schema,true))
            {
                var retErr={}

                if (tv4.error.message){retErr.message=tv4.error.message;}
                if (tv4.error.schemaPath){retErr.schemaPath=tv4.error.schemaPath;}
                if (tv4.error.dataPath){retErr.dataPath=tv4.error.dataPath;}

                return retErr;
            }
            else
            {
                return null;
            }
        }

    ,coerceToSchema:
    function(document,schema)
    {
        //argument checks
        if (!document){return new ArgumentError("document");}
        if (!schema){return new ArgumentError("schema");}

        //todo implement coerce logic
        return document;
    }

    ,mergeSchemaLinks:
    function(document,schema)
    {
        //argument checks
        if (!document){return new ArgumentError("document");}

        if (!schema){return document;}

        if (!schema.links||!Array.isArray(schema.links))
        {
            return document;
        }
        document.links=deepcopy(schema.links);

        for(var i=0;i<document.links.length;i++)
        {
            var link=document.links[i];

            var  rxp = /{([^}]+)}/g,
                curMatch;

            while( curMatch = rxp.exec( link.href ) )
            {
                var foundVal=jsonpath.eval(document, "$." + curMatch[1]);
                if(foundVal.length>0)
                {
                    link.href=link.href.replace(curMatch[0],foundVal[0]);
                }
            }

            if(link.schema&&link.schema.$ref)
            {
                var foundVal=jsonpath.eval(schema,link.schema.$ref.replace("#","$."));
                if(foundVal.length>0)
                {
                    link.schema=foundVal[0];
                }
            }
        }



    }

}

module.exports=tools;






function ArgumentError(argument) {
    var message=("no %s specified").replace(/%s/g, argument);
    this.name = "ArgumentError";
    this.message = (message || "");
    this.argument=argument;
}
ArgumentError.prototype = new Error();