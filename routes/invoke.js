'use strict';


function executeRequest(params) 
{

var schema = require('opent2t-' + params.schema);
return schema.invokeTranslator(params);

}
 
module.exports = function(app)
{
    app.post('/invoke' ,function(req,res)
    {
    var schema = req.body.schema;
    var command =req.body.command;
    var device = req.body.device;
    var deviceParams = JSON.parse(req.body.deviceParams);
    console.log(deviceParams);
    console.log(schema + ' ' + deviceParams.id);

     executeRequest(req.body).then(result => {
         console.log('this matters' + result)
         res.header("Content-Type",'application/json');
         res.send(result);
    }).catch(error => {
        res.header("Content-Type",'application/json');
         res.send(error);
    });

   
     
    });

}
