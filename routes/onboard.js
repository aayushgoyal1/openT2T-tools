'use strict';
var winkHub = require('./Onboarding/Wink');

module.exports = function(app) {
 
    app.post('/onboard/wink' ,function(req,res){
    var username =req.body.username;
    var password = req.body.password;
    var idkey = req.body.idkey;

    winkHub.onboard(idkey,username,password).then(result => {
         res.header("Content-Type",'application/json');
         res.send(result);
    }).catch(error => {
        res.header("Content-Type",'application/json');
         res.send(error);
    });
    });

}
