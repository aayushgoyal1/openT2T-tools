'use strict';

var https = require('https');
var q = require('q');

    function getDevices(accessToken, idKeyFilter)
     {
          var deferred = q.defer();   // q will help us with returning a promise
            var getOptions = {
                protocol: 'https:',
                host: 'api.wink.com',
                path: '/users/me/wink_devices',
                headers: { 'Authorization': 'Bearer ' + accessToken,
                           'Accept': 'application/json' },
                method: 'GET'
                        };

   
     var req = https.get(getOptions, function(res) {
                var body = '';
                res.setEncoding('utf8');
                
                res.on('data', function(data) 
                {
                    body += data;
                });

                res.on('end', () => {
                 if (res.statusCode != 200)  {
                        
                 } else  {
                    // signed in, take user token
                    var devices = JSON.parse(body).data;
                    var deviceList = []
                    for (var key in devices) 
                    {
                       var deviceID = devices[key][idKeyFilter]; // do stuff here!
                       var deviceName = devices[key]['name']; // do stuff here!
                       if(deviceID != null)
                       {
                            var device = 
                            {
                                "name": deviceName,
                                "deviceID":deviceID
                            }
                            deviceList.push(device);
                            
                       }
                    }

               deferred.resolve(deviceList);

                }});

                res.on('error', (e) => {
                    deferred.reject(e);
                 }); 
                 
     });
               // req.write(postData);
                req.end();   
                //make our Promise and give it back to the caller
               return deferred.promise;
}

module.exports = 
{

   
    onboard: function(idKeyFilter, username, password) 
    {
        var deferred = q.defer();   // q will help us with returning a promise
        console.log(username);
        var postData = JSON.stringify(
            {
                'client_id': "id",
                'client_secret': "password",
                'username': username,
                'password': password,
                'grant_type': "password"
            });

            var postOptions = 
            {
                protocol: 'https:',
                host: 'api.wink.com',
                path: '/oauth2/token',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length
                },
                method: 'POST'
            };
            
             console.log("making request");
             var req = https.request(postOptions, (res) => {
               
              var body = '';
              res.setEncoding('utf8');
              res.on('data', function(data) {
                    body += data;
                }); 

                res.on('end', () => {
                        // signed in, take user token
                         if (res.statusCode != 200) 
                        {
                        console.log(res.statusCode);
                        deferred.reject(body);
                        } else {
                        var user = JSON.parse(body);
                        
                        console.log("token is " + user.access_token);
                        console.log("id key is " + idKeyFilter);
                        
                        getDevices(user.access_token,idKeyFilter).then(result => {
                     
                        var returnBody = {'winkToken':user.access_token, 'Devices':result}
                            deferred.resolve(JSON.stringify(returnBody));
                   	     }).catch(error => {
                            deferred.reject(error);
                         });

                         }

                });

                res.on('error', (e) => {
                    console.log(e.message);
                    deferred.reject(e);
                 }); 
              
         });

    req.write(postData);
    req.end();   
    //make our Promise and give it back to the caller
    return deferred.promise;
}

  
}
